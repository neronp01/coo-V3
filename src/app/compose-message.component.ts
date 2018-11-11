import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { slideInDownAnimation } from './animations';
import { EmailService } from './services/email.service';
import { AuthService, User} from './auth.service';

@Component({
  templateUrl: './compose-message.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ slideInDownAnimation ]
})
export class ComposeMessageComponent {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  details: string;
  sending = false;
  message: string;

  constructor(private router: Router, private email: EmailService,  private auth: AuthService) {}

  send(e: string) {
    this.sending = true;
    this.details = 'Sending Message...';
    this.email.getEmailNumber.take(1).subscribe( x => {
      const temp = x['noEmail'] + 1;
      this.email.UpdateEmailNumber(temp);
      const emailObject = {from: this.auth.userToken['displayName'], to: this.email.email, type: 'communication' , texte: e};
      console.log('email:', temp, this.auth.userToken['displayName'], emailObject);
      this.email.setSendEmail(temp, this.auth.userToken['email'], emailObject);
      this.router.navigate(['/accueil']);
    });

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
