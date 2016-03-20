"use strict";
var UserOptions = (function () {
    function UserOptions(isPositionLeft, items) {
        this.isPositionLeft = isPositionLeft;
        this.items = items;
    }
    UserOptions.prototype.addItem = function (item) {
        this.items.push(item);
    };
    return UserOptions;
}());
exports.UserOptions = UserOptions;
//# sourceMappingURL=user-options.js.map