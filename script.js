(function(){
  var todos = [
    { id: 0, name: "take out trash", completed: false },
    { id: 1, name: "mow lawn", completed: false },
    { id: 2, name: "pick up laundry", completed: true }
  ];
  var id = 3;

  can.fixture({
    "GET /services/todos":  function(){
      return todos;
    },
    "POST /services/todos": function(request, response){
      console.log("creating a todo", request.data);
      var todo = $.extend({},request.data);
      todo.id = ++id;
      response({
        id: todo.id,
        createdAt: +new Date()
      });
      todos.push(todo);
    },
    "PUT /services/todos/{id}": function(request){
      todos.forEach(function(todo){
        if(todo.id == request.data.id) {
          $.extend(todo, request.data);
        }
      });
      return  {
        updateAt: +new Date()
      };
    },
    "DELETE /services/todos/{id}": function(request){
      for(var i =0 ; i < todos.length; i++){
        if(todos[i].id == request.data.id) {
          todos.splice(i, 1);
          break;
        }
      }
      return {};
    }
  });


  can.fixture.delay = 1000;

  var Todo = can.Model.extend({
    findAll: "GET /services/todos",
    findOne: "GET /services/todos/{id}",
    create: "POST /services/todos",
    update: "PUT /services/todos/{id}",
    destroy: "DELETE /services/todos/{id}"
  },{});

  Todo.List = Todo.List.extend({
    completeAll: function(){
      this.each(function(todo){
        todo.attr("completed", true);
      });
    },
    active: function(){
      return this.filter(function(todo){
        return !todo.attr("completed");
      });
    },
    complete: function(){
      return this.filter(function(todo){
        return todo.attr("completed");
      });
    }
  });

  can.Component.extend({
    tag: "todos-create",
    template: can.stache('<input id="new-todo" '+
              'can-enter="{createTodo}" '+
              'placeholder="What needs to be done?" '+
              'autofocus="">'),
    scope: {
      createTodo: function(context, el, ev){
        new Todo({
          name: el.val()
        }).save().then(function(){
          el.val("");
        });
      }
    }
  });

  can.Component.extend({
    tag: "todos-list",
    template: can.view("todos-list-template"),
    scope: {
      editTodo: function(todo){
        todo.attr("editing", true);
      },
      updateTodo: function(todo, el){
        todo.removeAttr("editing");
        todo.attr("name", el.val()).save();
      }
    }
  });


  can.Component.extend({
    tag: "todos-app",
    scope: {
      todosList: new Todo.List({}),
      todosToShow: function(){
        var filter = can.route.attr("filter"),
          todos = this.attr("todosList");
        if(filter === "active") {
          return todos.active();
        } else if(filter === "complete") {
          return todos.complete();
        } else {
          return todos;
        }

      }
    },
    events: {
      "{Todo} created":  function(Todo, ev, newTodo){
        console.log("foo");
        this.scope.attr("todosList").unshift(newTodo);
      }
    },
    helpers: {
      filterLink: function(title, filter){
        var attrs = {};

        if(filter){
          attrs.filter = filter;
        }
        return can.stache.safeString(can.route.link(title,attrs,{
          className: can.route.attr("filter") == filter ?
            "selected" : ""
        }));

      }
    }
  });



  can.route(":filter")
  can.route.ready();

  var frag = can.view('app-template',{
    todosList: window.todosList
  });

  $("#app").append(frag);
});
