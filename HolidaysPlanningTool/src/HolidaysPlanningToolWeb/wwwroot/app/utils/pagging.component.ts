import {Component, OnInit, Input, Output, OnChanges, EventEmitter } from 'angular2/core';

@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'pagging',
    // Location of the template for this component
    //templateUrl: './app/travel/travel-list.component.html',
    template: `<ul *ngIf="totalPages > 1" class="paggination"><li [ngClass]="{inactive: currentPage==1}" (click)=cl(currentPage-1)><</li>
<li *ngFor="#num of cells" [ngClass]="{inactive: currentPage==num||num=='...'}" (click)=cl(num)>{{num}}</li>
<li  [ngClass]="{inactive: currentPage==totalPages}" (click)=cl(currentPage+1)>></li></ul>`,
})
export class PaggingComponent implements OnInit {
    @Input() currentPage: number;
    @Input() totalItems: number;
    @Input() itemsPerPage: number;
    @Output() callback = new EventEmitter();
    @Input() totalPages: number;

    private cellsTemplate = [-2, -1, 0, 1, 2];
    private cells: any[];
    constructor() {

    }

    ngOnInit() {

    }
    ngOnChanges(changes) {
        console.log("changed values")
        if (changes.itemsPerPage && changes.itemsPerPage.currentValue < 1) this.currentPage = 1;
        // this.totalPages = parseInt("" + (this.totalItems / this.itemsPerPage));

        console.log(changes);
        this.redraw();
    }
    public resetData(currentPage, totalItems, itemsPerPage) {
        this.currentPage = currentPage;
        this.totalItems = totalItems;
        this.itemsPerPage = itemsPerPage;
        console.log("reset", this.currentPage, this.totalItems, this.itemsPerPage);
    }
    private redraw() {
        if (this.totalPages) {
            var cells = [];

            if (this.totalPages > 6) {
                cells.push(1);
                if (this.currentPage < 5) {
                    for (let i = 2; i <= this.cellsTemplate.length + 1; i++) {
                        cells.push(i);
                    }
                    cells.push("...");
                } else if (this.currentPage > this.totalPages - 4) {
                    cells.push("...");
                    for (let i = 0; i < this.cellsTemplate.length; i++) {
                        cells.push(i + this.totalPages - this.cellsTemplate.length);
                    }
                } else {
                    cells.push("...");
                    for (let i = 0; i < this.cellsTemplate.length; i++) {
                        cells.push(this.currentPage - 2 + i);
                    }
                    cells.push("...");
                }
                cells.push(this.totalPages);
            } else {
                for (let i = 1; i <= this.totalPages; i++) {
                    cells.push(i);
                }
            }
            this.cells = cells;
        }
    }
    cl(event) {
        if (event == "...") return;
        console.log(this.currentPage, this.totalItems, this.itemsPerPage);
        console.log(event);
        if (event < 1) {
            event = 1;
        } else if (event > this.totalPages) {
            event = this.totalPages;
        }
        if (event != this.currentPage) {
            this.currentPage = event;
            this.redraw();
            this.callback.emit(event);
        }
    }
    private initilize() {

    }
}
