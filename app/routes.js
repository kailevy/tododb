var todoModel = require('./models/todo');
var Todo = todoModel.Todo

// function to get all todos
function getTodos(res){
  Todo.find({})
  .sort({priority: -1, created_at: 1})
  .exec(function(err, todos) {
    if(err) {
      res.send(err);
      }
    res.json(todos);
  });
}

module.exports = function(app) {
  app.get('/api/todos', function(req, res) {
    getTodos(res);
  });

  // create todo and send back all todos after creation
  app.post('/api/todos', function(req, res) {
    console.log(req.body);
    // create a todo, information comes from AJAX request from Angular
    Todo.create({
      text : req.body.text,
      priority: req.body.priority
    }, function(err, todo) {
      if (err)
        res.send(err);
      getTodos(res);
    });

  });

  app.post('/api/todos/:todo_id', function(req, res) {
    Todo.findById(req.params.todo_id, function(err, todo){
      if (!todo)
        return next(new Error('Could not load Document'));
      else {
        todo.text = req.body.text;
        todo.priority = req.body.priority;
        todo.edit = true;
        todo.save(function(err) {
          if (err)
            res.send(err);
        });
      }
      getTodos(res);
    });
  });

  // delete a todo
  app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
      _id : req.params.todo_id
    }, function(err, todo) {
      if (err)
        res.send(err);

      getTodos(res);
    });
  });

  // application -------------------------------------------------------------
  app.get('*', function(req, res) {
    res.send('./public/index.html'); 
  });
};