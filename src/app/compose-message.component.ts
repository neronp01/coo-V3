import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { slideInDownAnimation } from './animations';
import { EmailService } from './services/email.service';

@Component({
  templateUrl: './compose-message.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ slideInDownAnimation ]
})
export class ComposeMessageComponent {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  details: string;
  sending = false;

  constructor(private router: Router, private email: EmailService) {}

  send() {
    this.sending = true;
    this.details = 'Sending Message...';

    setTimeout(() => {
      this.sending = false;
      this.closePopup();
    }, 1000);
  }

  cancel() {
    this.closePopup();
  }

  closePopup() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.router.navigate([{ outlets: { popup: null }}]);
  }
}
