import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[filterSelect]'
})
export class FilterSelect {

    @Input() options: any[];
    @Input() filteredOptions : any[];
    @Input() valueField: string;
    @Input() idField: string;

    constructor(private el: ElementRef) {
    }

    @HostListener('keydown', [ '$event' ])
    onKeyDown(event: KeyboardEvent) {

        // Do not use event.keycode this is deprecated.
        // See: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
        let current: string = this.el.nativeElement.value;
        // We need this because the current value on the DOM element
        // is not yet updated with the value from this event
        let next: string = current.concat(event.key);
        this.filteredOptions = this.options.filter(o => o[this.valueField] == next)
    }
}