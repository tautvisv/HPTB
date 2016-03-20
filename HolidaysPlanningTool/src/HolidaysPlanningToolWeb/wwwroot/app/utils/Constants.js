"use strict";
var Constants = (function () {
    function Constants() {
    }
    Object.defineProperty(Constants, "WebUrl", {
        get: function () { return "http://localhost:2922/"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "WebAPIUrl", {
        get: function () { return "http://localhost:2922/api/"; },
        enumerable: true,
        configurable: true
    });
    return Constants;
}());
exports.Constants = Constants;
//# sourceMappingURL=Constants.js.map