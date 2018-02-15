import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipsModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule , MatCheckboxModule, MatCardModule, MatGridListModule,
  MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSlideToggleModule,
  MatListModule , MatTabsModule, MatSelectModule, MatTableModule, MatMenuModule,
  MatExpansionModule, MatToolbarModule, MatTooltipModule, MatDialogModule ,
  MatStepperModule, MatProgressSpinnerModule, MatDividerModule} from '@angular/material';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { HeroListComponent } from './hero-list.component';
// import { HeroDetailComponent } from './hero-detail.component';

import { FrontPageRoutingModule } from './front-page.routing.module';
import {FrontPageComponent} from './front-page.component';

@NgModule({
  imports: [
    NoopAnimationsModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    FrontPageRoutingModule, MatChipsModule, MatButtonModule
  ],
  declarations: [
    FrontPageComponent
  ],
  providers: [ ]
})
export class FrontPageModule {}
