var mongoose = require('mongoose');

var TodoSchema = mongoose.Schema({
  text : {type : String, default: ''},
  created_at: {type: Date},
  updated_at: {type: Date},
  priority: {type : Number, default: 0},
  edit: {type : Boolean, default: false}
});

TodoSchema.pre('save', function(next){
  now = new Date();
  if ( !this.created_at ) {
    this.created_at = now;
  }
  else {
    this.updated_at = now;
  }
  next();
});

var Todo = mongoose.model('Todo', TodoSchema);

module.exports.Todo = Todo;