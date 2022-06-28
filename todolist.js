class Todo {
  static DONE_MARKER = "X";
  static UNDONE_MARKER = " ";

  constructor(title) {
    this.title = title;
    this.done = false;
  }

  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }

  getTitle() {
    return this.title;
  }
}

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if(!(todo instanceof Todo)) throw new Error('not a todo, please only add "todos"') ;
    this.todos.push(todo);
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.size() - 1]
  }

  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index]
  }

  _validateIndex(index) {
    if(!(index in this.todos)) {
      throw new ReferenceError(`Invalid Index: ${index}`)
    }
  }

  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  markUndoneAt(index) {
    this.itemAt(index).markUndoneAt()
  }

  isDone() {
    return this.todos.every(todo => todo.isDone())
  }

    shift() {
      return this.todos.shift();
    }
  
    pop() {
      return this.todos.pop();
    }
  

  removeAt(index) {
    this._validateIndex(index);
    this.todos.splice(index, 1);
  }

  toString() {
    console.log(`Today's todos`);
   this.todos.forEach(todo => {
     console.log(todo.toString())
   })
  }

  forEach(callback) {
    this.todos.forEach(callback)
  }

  filter(callback) {
    let newTodoList = new TodoList("newlist");
    this.forEach(todo => {
      if (callback(todo)) {
        newTodoList.add(todo)
      }
    })
    return newTodoList;
  } 

  findByTitle(title) {
    return this.filter(todo => todo.getTitle() === title).first();
  }

  allDone() {
    return this.filter(todo => todo.isDone());
  }

  allNotDone() {
    return this.filter(todo => !(todo.isDone()));
  }

  markDone(title) {
    let todo = this.findByTitle(title);
    if (todo !== undefined) {
      todo.markDone();
    }
  }

  markAllDone() {
    this.forEach(todo => todo.markDone());
  }

  markAllUndone() {
    this.forEach(todo => todo.markUndone());
  }

  toArray() {
    return this.todos.slice()
  }
}


let list = new TodoList("today's todos");
let todo1 = new Todo('Care for Daisy')
let todo2 = new Todo('Study');
let todo3 = new Todo('Clean')
let emptylist = new TodoList('empty')
list.add(todo2)
list.add(todo1);
list.add(todo3)

// console.log(list.first());
// console.log(list.last());



list.markDoneAt(1);
list.markDoneAt(0);

list.markDone('Clean');

// console.log(list);
// console.log(list.allNotDone())
let newArray = list.toArray();
newArray.push('hello');
console.log(list)
console.log(newArray)