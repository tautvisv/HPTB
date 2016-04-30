"use strict";
var app_config_1 = require("../config/app-config");
var Auth = (function () {
    function Auth() {
    }
    Auth.isAuth = function () {
        var token = localStorage.getItem(app_config_1.CONFIG.token);
        return !!token;
    };
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=is-auth.js.map