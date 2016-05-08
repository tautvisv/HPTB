import {EventEmitter } from 'angular2/core';
import { Point } from "../travel/TravelClass";

export class TodoItem {
    constructor(public name: string, public done: boolean) {
    }
}
export class TodoService {
    public itemAdded$: EventEmitter<Point>;
    private todoList: Point[] = [];

    constructor() {
        this.itemAdded$ = new EventEmitter();
    }

    public list(): Point[] {
        return this.todoList;
    }

    public add(item: Point): void {
        this.todoList.push(item);
        this.itemAdded$.emit(item);
    }
}