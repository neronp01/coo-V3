import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';


import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HeroesModule } from './heroes/heroes.module';
import { ComposeMessageComponent } from './compose-message.component';
import { LoginRoutingModule } from './login/login-routing.module';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthService} from './auth.service';
import { CoreModule} from './core/core.module';
import {  MatToolbarModule, MatCardModule,  MatMenuModule, MatButtonModule, MatListModule, MatGridListModule  } from '@angular/material';

import { DialogService } from './dialog.service';
import {FrontPageModule} from './front-page/front-page.module';
import { EmailService} from './services/email.service';


@NgModule({
  imports: [
 //   CoreModule,
    NoopAnimationsModule,
    BrowserModule,
    FormsModule,
    FrontPageModule,
    LoginRoutingModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase, 'COO'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    MatToolbarModule, MatCardModule,  MatMenuModule, MatButtonModule, MatListModule, MatGridListModule
  ],
  declarations: [
    AppComponent,
    ComposeMessageComponent,
    LoginComponent,
    PageNotFoundComponent,
  ],
  providers: [
    DialogService, EmailService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {

  }
}
