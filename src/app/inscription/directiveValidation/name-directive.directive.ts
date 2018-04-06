import { Directive, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appNameDirective]'
})
export class NameDirectiveDirective {
  private regex2: RegExp = new RegExp(/(^[A-z]+$)|(^[A-z]+)\s$|(^[A-z]+)\s([A-z]+$)|(^[A-z]+)-$|(^[A-z]+)-([A-z]+$)/g);
  private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowRight', 'ArrowLeft' ];
  constructor(private el: ElementRef) {
  }
  @HostListener('keydown', [ '$event' ])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    const elementPosition = event.srcElement['selectionStart'];
    if (this.specialKeys.indexOf(event.key) !== -1) {
      const current1: string = this.el.nativeElement.value;
      const next1: string = current1.concat(event.key);
      return;
    }
    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(event.key);
    if (this.el.nativeElement.value.length === 1) {
      current = this.el.nativeElement.value;
      next = current.concat(event.key);
      event.target['value'] = current.toLocaleUpperCase();
    }
     if (next && !String(next).match(this.regex2)) {
       event.preventDefault();
     }
    if (this.specialKeys.indexOf(event.key) === 0) {
      event.target['value'] = next.substring(0, elementPosition);
    } else {
      const lastCharact = current.charAt(current.length - 1);
      if ( String(next).match(this.regex2) ) {
        if ( next.length === 1 ) {
          event.target['value'] = next.toLocaleUpperCase();
          console.log('Upercase', next, current);
          event.preventDefault();
        }
        if (lastCharact === '-' || lastCharact === ' ') {
          event.target['value'] = current + next.charAt(next.length - 1).toLocaleUpperCase();
          event.preventDefault();
        }
      }
      console.log('prenom', next, next.length, current, current.length);
    }
  }

}
