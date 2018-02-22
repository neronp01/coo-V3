import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator, ValidationErrors } from '@angular/forms';


@Directive({
  selector: '[dateNaissanceValidation]',
  providers: [{provide: NG_VALIDATORS, useExisting: DateNaissanceValidationDirective, multi: true}]

})
export class DateNaissanceValidationDirective implements Validator {
    validate(c: FormControl): ValidationErrors {
      let isValidDate = false;
      if (c.value !== '') {
      //  ([0-3][0-9])[/]([0-1][0-2])[/](\d{4,4})
        isValidDate = /^[0-3][0-9][/][0-1][0-2][/]19|20[0-1][0-9]$/.test(c.value);
      } else {
        isValidDate = true;
      }
        const message = {
          'dateNaissanceValidation': {
            'message': 'Le format est JJ/MM/AAAA'
          }
        };
      return  isValidDate ? null : message;
    }
}
