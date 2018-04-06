import { Directive, ElementRef, HostListener, Renderer, HostBinding } from '@angular/core';
@Directive({
  selector: '[phoneNumberOnly]',

})
export class PhoneNumberDirective {
  // Allow decimal numbers and negative values
  private regex: RegExp = new RegExp(/(^\d$|^\d{1,3}$|^\d{1,3}\-$|^\d{1,3}\-\d{1,3}$|^\d{1,3}\-\d{1,3}\-$|^\d{1,3}\-\d{1,3}\-\d{1,4}$)/g);
  private regexDeuxPouint = new RegExp(/(\.\.)/g);
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
 // private regex1: RegExp = new RegExp(/([0-9]{3})/g);
  private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowRight', 'ArrowLeft' ];

  constructor(private el: ElementRef, private renderer: Renderer) {
  }


  @HostBinding('attr.values') value = '';

  @HostListener('keydown', [ '$event' ])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    this.renderer.setElementAttribute(this.el.nativeElement, 'value', 'asda');
    const elementPosition = event.srcElement['selectionStart'];
    if (this.specialKeys.indexOf(event.key) !== -1) {
      let current1: string = this.el.nativeElement.value;
      let next1: string = current1.concat(event.key);
      console.log('key', this.specialKeys.indexOf(event.key));
      if (this.specialKeys.indexOf(event.key) === 0) {
        event.target['value'] = next1.substring(0, elementPosition);
        console.log('sbsting', elementPosition);
      }
      return;
    }

    let valuePhone: string;
    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(event.key);
    console.log('number', next, !String(next).match(this.regex));
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
    if (this.specialKeys.indexOf(event.key) === 0) {
      event.target['value'] = next.substring(0, elementPosition);
      valuePhone = next.substring(0, elementPosition);
    } else {
    if ( next.length === 3 && String(next).match(this.regex) ) {
      event.target['value'] = next + '-';
      event.preventDefault();
    } else if ( next.length === 7 && String(next).match(this.regex)  ) {
      event.target['value'] = next + '-';
      event.preventDefault();
    } else if ( next.length === 11 && String(next).match(this.regex)  ) {
      valuePhone = next;
      this.value = valuePhone;
    }
    }
  }

}
