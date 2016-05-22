"use strict";
var Constants = (function () {
    function Constants() {
    }
    Object.defineProperty(Constants, "WebUrl", {
        get: function () { return Server.Address.value + "/"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "WebAPIUrl", {
        get: function () { return Server.Address.value + "/api/"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "WebAPI", {
        get: function () { return Server.Address.value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "TokenName", {
        get: function () { return "auth-token"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "TokenHeaderName", {
        get: function () { return "Authorization"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "TokenType", {
        get: function () { return "Bearer "; },
        enumerable: true,
        configurable: true
    });
    return Constants;
}());
exports.Constants = Constants;
//# sourceMappingURL=Constants.js.map