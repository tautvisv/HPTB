import {USERITEM} from "./user-items-mock";
import {UserOptionsItem} from './user-options-item';
import {UserOptions} from './user-options';
import {Injectable} from 'angular2/core';

@Injectable()
export class UserOptionService {
    GetAllUserOptions(): UserOptions{
        return USERITEM;
    }
    testOptions() {
        for (var i = 0; i < USERITEM.items.length; i++) {
            console.log("testing users:", USERITEM.items[i].title);
        }
    }
}