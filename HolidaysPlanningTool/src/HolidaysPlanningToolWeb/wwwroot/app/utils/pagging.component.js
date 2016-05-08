"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var PaggingComponent = (function () {
    function PaggingComponent() {
        this.callback = new core_1.EventEmitter();
        this.cellsTemplate = [-2, -1, 0, 1, 2];
    }
    PaggingComponent.prototype.ngOnInit = function () {
    };
    PaggingComponent.prototype.ngOnChanges = function (changes) {
        console.log("changed values");
        if (changes.itemsPerPage && changes.itemsPerPage.currentValue < 1)
            this.currentPage = 1;
        // this.totalPages = parseInt("" + (this.totalItems / this.itemsPerPage));
        console.log(changes);
        this.redraw();
    };
    PaggingComponent.prototype.resetData = function (currentPage, totalItems, itemsPerPage) {
        this.currentPage = currentPage;
        this.totalItems = totalItems;
        this.itemsPerPage = itemsPerPage;
        console.log("reset", this.currentPage, this.totalItems, this.itemsPerPage);
    };
    PaggingComponent.prototype.redraw = function () {
        if (this.totalPages) {
            var cells = [];
            if (this.totalPages > 6) {
                cells.push(1);
                if (this.currentPage < 5) {
                    for (var i = 2; i <= this.cellsTemplate.length + 1; i++) {
                        cells.push(i);
                    }
                    cells.push("...");
                }
                else if (this.currentPage > this.totalPages - 4) {
                    cells.push("...");
                    for (var i = 0; i < this.cellsTemplate.length; i++) {
                        cells.push(i + this.totalPages - this.cellsTemplate.length);
                    }
                }
                else {
                    cells.push("...");
                    for (var i = 0; i < this.cellsTemplate.length; i++) {
                        cells.push(this.currentPage - 2 + i);
                    }
                    cells.push("...");
                }
                cells.push(this.totalPages);
            }
            else {
                for (var i = 1; i <= this.totalPages; i++) {
                    cells.push(i);
                }
            }
            this.cells = cells;
        }
    };
    PaggingComponent.prototype.cl = function (event) {
        if (event == "...")
            return;
        console.log(this.currentPage, this.totalItems, this.itemsPerPage);
        console.log(event);
        if (event < 1) {
            event = 1;
        }
        else if (event > this.totalPages) {
            event = this.totalPages;
        }
        if (event != this.currentPage) {
            this.currentPage = event;
            this.redraw();
            this.callback.emit(event);
        }
    };
    PaggingComponent.prototype.initilize = function () {
    };
    __decorate([
        core_1.Input()
    ], PaggingComponent.prototype, "currentPage", void 0);
    __decorate([
        core_1.Input()
    ], PaggingComponent.prototype, "totalItems", void 0);
    __decorate([
        core_1.Input()
    ], PaggingComponent.prototype, "itemsPerPage", void 0);
    __decorate([
        core_1.Output()
    ], PaggingComponent.prototype, "callback", void 0);
    __decorate([
        core_1.Input()
    ], PaggingComponent.prototype, "totalPages", void 0);
    PaggingComponent = __decorate([
        core_1.Component({
            // Declare the tag name in index.html to where the component attaches
            selector: 'pagging',
            // Location of the template for this component
            //templateUrl: './app/travel/travel-list.component.html',
            template: "<ul *ngIf=\"totalPages > 1\" class=\"paggination\"><li [ngClass]=\"{inactive: currentPage==1}\" (click)=cl(currentPage-1)><</li>\n<li *ngFor=\"#num of cells\" [ngClass]=\"{inactive: currentPage==num||num=='...'}\" (click)=cl(num)>{{num}}</li>\n<li  [ngClass]=\"{inactive: currentPage==totalPages}\" (click)=cl(currentPage+1)>></li></ul>",
        })
    ], PaggingComponent);
    return PaggingComponent;
}());
exports.PaggingComponent = PaggingComponent;
//# sourceMappingURL=pagging.component.js.map