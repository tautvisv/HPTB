"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var ProgressBar = (function () {
    function ProgressBar() {
        this.active = true;
        this.callback = new core_1.EventEmitter();
        this.width = 100;
        this.timePassed = 0;
    }
    ProgressBar.prototype.consume = function () {
        if (!this.active) {
            return;
        }
        if (this.timePassed < this.duration) {
            this.timePassed += ProgressBar.refreshTime;
            this.width = parseInt(((this.timePassed + ProgressBar.refreshTime) * 100 / this.duration).toFixed(0));
            setTimeout(this.consume.bind(this), ProgressBar.refreshTime);
        }
        else {
        }
    };
    ProgressBar.prototype.ngOnInit = function () {
        this.duration = parseInt(this.duration);
        this.consume();
    };
    ProgressBar.prototype.ngOnDestroy = function () {
        this.active = false;
    };
    ProgressBar.refreshTime = 100;
    __decorate([
        core_1.Input()
    ], ProgressBar.prototype, "duration", void 0);
    ProgressBar = __decorate([
        core_1.Component({
            selector: 'progress-bar',
            template: "\n        <div class=\"progress my-progress-bar\" style=\"margin-bottom:0\">\n            <div class=\"progress-bar right\" [style.width]=\"width+'%'\"></div>\n        </div>",
            outputs: ["callback: callback"]
        })
    ], ProgressBar);
    return ProgressBar;
}());
exports.ProgressBar = ProgressBar;
//# sourceMappingURL=progress-bar.component.js.map