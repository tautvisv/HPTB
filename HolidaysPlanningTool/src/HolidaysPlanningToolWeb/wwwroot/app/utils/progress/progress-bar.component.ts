import {Component, Input, Output, OnInit, EventEmitter, OnDestroy } from 'angular2/core'
@Component({
    selector: 'progress-bar',
    template: `
        <div class="progress my-progress-bar" style="margin-bottom:0">
            <div class="progress-bar right" [style.width]="width+'%'"></div>
        </div>`,
    outputs: ["callback: callback"]
})
export class ProgressBar implements OnInit, OnDestroy {
    private static refreshTime: number = 100;
    private width: number;
    private timePassed: number;
    private active: boolean = true;
    @Input() duration;
    callback: EventEmitter<any> = new EventEmitter();

    constructor() {
        this.width = 100;
        this.timePassed = 0;
    }
    consume(): void {
        if (!this.active) {
            return;
        }
        if (this.timePassed < this.duration) {
            this.timePassed += ProgressBar.refreshTime;
            this.width = parseInt(((this.timePassed + ProgressBar.refreshTime) * 100 / this.duration).toFixed(0));
            setTimeout(this.consume.bind(this), ProgressBar.refreshTime);
        } else {
            //setTimeout(this.callback.next.apply(this, null), ProgressBar.refreshTime);
            //this.callback.emit(null);
        }
    }
    ngOnInit() {
        this.duration = parseInt(this.duration);
        this.consume();
    }
    ngOnDestroy() {
        this.active = false;
    }
}

