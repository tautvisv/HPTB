"use strict";
var NotificationService2 = (function () {
    function NotificationService2() {
    }
    NotificationService2.prototype.error = function (message) { console.error(message); };
    NotificationService2.prototype.warning = function (message) { console.warn(message); };
    NotificationService2.prototype.success = function (message) { console.log(message); };
    return NotificationService2;
}());
exports.NotificationService2 = NotificationService2;
//# sourceMappingURL=notification2.service.js.map