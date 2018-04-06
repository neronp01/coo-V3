import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator, ValidationErrors } from '@angular/forms';
import { ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[dateNaissanceValidation]',
  providers: [{provide: NG_VALIDATORS, useExisting: DateNaissanceValidationDirective, multi: true}]

})
export class DateNaissanceValidationDirective implements Validator {
  private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowRight', 'ArrowLeft' ];
  private regex1: RegExp = new RegExp(/^[0-3]$/g);
  private regex2: RegExp = new RegExp(/^[0-2]{1}[0-9]$|^[3][0]$|^[3][1]$/g);
  private regex3: RegExp = new RegExp(/^[0-2]{1}[0-9]\/[0-1]$|^[3][0]\/[0-1]$|^[3][1]\/[0-1]$/g);
  private regex4: RegExp = new RegExp(/...0[1-9]$|...1[1-2]$/g);
  private regex5: RegExp = new RegExp(/......[1-2]$/g);
  private regex6: RegExp = new RegExp(/......19$|......20$/g);
  private regex7: RegExp = new RegExp(/......19[2-9]$|......20[0-1]$/g);
  private regex8: RegExp = new RegExp(/......19[2-9][0-9]$|......20[0-1][0-7]$/g);
  constructor(private el: ElementRef) {
  }
  @HostListener('keydown', [ '$event' ])
  onKeyDown(event: KeyboardEvent) {
    const elementPosition = event.srcElement['selectionStart'];
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    switch (current.length) {
      case 0:
      if (next && !String(next).match(this.regex1)) {
        event.preventDefault();
      }
      break;
      case 1:
      if (next && !String(next).match(this.regex2)) {
        event.preventDefault();
      }
      event.target['value'] = next + '\/';
      event.preventDefault();
      break;
      case 3:
      console.log('3' , next);
      if (next && !String(next).match(this.regex3)) {
        event.preventDefault();
      }
      break;
      case 4:
      console.log('4' , next);
      if (next && !String(next).match(this.regex4)) {
        event.preventDefault();
      } else {
        event.preventDefault();
        event.target['value'] = next + '\/';
      }
      break;
      case 6:
      console.log('6' , next);
      if (next && !String(next).match(this.regex5)) {
        event.preventDefault();
      }
      break;
      case 7:
      console.log('7' , next);
      if (next && !String(next).match(this.regex6)) {
        event.preventDefault();
      }
      break;
      case 8:
      console.log('8' , next);
      if (next && !String(next).match(this.regex7)) {
        event.preventDefault();
      }
      break;
      case 9:
      console.log('8' , next);
      if (next && !String(next).match(this.regex8)) {
        event.preventDefault();
      }
      break;
    }
  }
    validate(c: FormControl): ValidationErrors {
      let isValidDate = false;

      if (c.value !== '') {
        console.log(c.value);
      //  ([0-3][0-9])[/]([0-1][0-2])[/](\d{4,4})
        isValidDate = /(^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$)/.test(c.value);
      } else {
        isValidDate = true;
      }
        const message = {
          'dateNaissanceValidation': {
            'message': 'Le format est JJ/MM/AAAA'
          }
        };
    console.log('isValidate',  isValidDate );
      return  isValidDate ? null : message;
    }
}
