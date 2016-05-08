"use strict";
var core_1 = require('angular2/core');
var TodoItem = (function () {
    function TodoItem(name, done) {
        this.name = name;
        this.done = done;
    }
    return TodoItem;
}());
exports.TodoItem = TodoItem;
var TodoService = (function () {
    function TodoService() {
        this.todoList = [];
        this.itemAdded$ = new core_1.EventEmitter();
    }
    TodoService.prototype.list = function () {
        return this.todoList;
    };
    TodoService.prototype.add = function (item) {
        this.todoList.push(item);
        this.itemAdded$.emit(item);
    };
    return TodoService;
}());
exports.TodoService = TodoService;
//# sourceMappingURL=global-emmiter.js.map