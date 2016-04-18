"use strict";
var Constants = (function () {
    function Constants() {
    }
    Object.defineProperty(Constants, "WebUrl", {
        get: function () { return "http://localhost:37096/"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "WebAPIUrl", {
        get: function () { return "http://localhost:37096/api/"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "WebAPI", {
        get: function () { return "http://localhost:37096"; },
        enumerable: true,
        configurable: true
    });
    return Constants;
}());
exports.Constants = Constants;
//# sourceMappingURL=Constants.js.map