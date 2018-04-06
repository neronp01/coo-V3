import { Directive, ElementRef, HostListener, HostBinding } from '@angular/core';


@Directive({
  selector: '[appPostalCode]'
})
export class PostalCodeDirective {

  private regex2: RegExp = new RegExp(/((^[A-z])$|(^[A-z]\d)$|(^[A-z]\d[A-z])$|(^[A-z]\d[A-z]\s)$|(^[A-z]\d[A-z]\s\d)$|(^[A-z]\d[A-z]\s\d[A-z])$|(^[A-z]\d[A-z]\s\d[A-z]\d)$)/g);
  private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowRight', 'ArrowLeft' ];
  constructor(private el: ElementRef) { }
  @HostListener('keydown', [ '$event' ])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    const elementPosition = event.srcElement['selectionStart'];
    if (this.specialKeys.indexOf(event.key) !== -1) {
      const current1: string = this.el.nativeElement.value;
      const next1: string = current1.concat(event.key);
      return;
    }
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
     if (next && !String(next).match(this.regex2)) {
       event.preventDefault();
     }
    if (this.specialKeys.indexOf(event.key) === 0) {
      event.target['value'] = next.substring(0, elementPosition);
    } else {
      if ( String(next).match(this.regex2) ) {
        if ( next.length < 7 ) {
          event.target['value'] = next.toLocaleUpperCase();
          event.preventDefault();
        }
        if (next.length === 3 ) {
          event.target['value'] = next.toLocaleUpperCase() + ' ';
          event.preventDefault();
        }
      }
    }
  }

}
