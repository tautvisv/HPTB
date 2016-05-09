import {Component, Input } from 'angular2/core';

@Component({
    selector: 'facebook-share',
    template: `<div class="facebook-share"><a href="https://www.facebook.com/sharer/sharer.php?u={{link}}" target="_blank"><img src="/images/facebook-share-button.png"></a></div>`,
    directives: []
})
export class FacebookShareComponent {
    @Input() link: string;
    constructor() {
    }
}