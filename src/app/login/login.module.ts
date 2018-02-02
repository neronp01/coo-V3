import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MatToolbarModule, MatCardModule,  MatMenuModule, MatButtonModule, MatListModule, MatGridListModule  } from '@angular/material';

import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';

@NgModule({
  imports: [
    CommonModule,

   MatCardModule,  MatMenuModule, MatButtonModule, MatListModule, MatGridListModule
  ],
  declarations: [],
  providers: []
})
export class LoginModule { }
