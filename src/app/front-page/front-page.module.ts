import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipsModule} from '@angular/material';

// import { HeroListComponent } from './hero-list.component';
// import { HeroDetailComponent } from './hero-detail.component';

import { FrontPageRoutingModule } from './front-page.routing.module';
import {FrontPageComponent} from './front-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FrontPageRoutingModule, MatChipsModule
  ],
  declarations: [
    FrontPageComponent
  ],
  providers: [ ]
})
export class FrontPageModule {}
