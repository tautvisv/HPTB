import {UserOptionsItem} from './user-options-item';

export class UserOptions{
    constructor(public isPositionLeft: boolean, public items: UserOptionsItem[]) {

    }
    public addItem(item: UserOptionsItem) {
        this.items.push(item);
    }
}