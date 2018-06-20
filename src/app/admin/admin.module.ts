import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule , MatCheckboxModule, MatCardModule, MatGridListModule,
  MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSlideToggleModule,
  MatListModule , MatTabsModule, MatSelectModule, MatTableModule, MatMenuModule,
  MatExpansionModule, MatToolbarModule, MatTooltipModule, MatDialogModule ,
  MatStepperModule, MatProgressSpinnerModule, MatDividerModule, MatAutocompleteModule,
  MatProgressBarModule} from '@angular/material';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { ManageCrisesComponent } from './manage-crises.component';
import { ManageHeroesComponent } from './manage-heroes.component';
import { InscriptionComponent, MyTelInput} from '../inscription/inscription.component';
import { FactureComponent} from './facture/facture.component';
import { ErrorsComponent} from '../inscription/errors/errors.component';
import { DateNaissanceValidationDirective} from '../inscription/directiveValidation/date-naissance-validation.directive';
import { NumberOnlyDirective} from '../inscription/numberOnlyDirective';
import { PaymentModule} from '../payments/payment/payment.module';
import { PaymentService} from '../payments/payment.service';
import { InformationService} from '../services/information.service';
import { MakePaymentComponent} from '../payments/make-payment/make-payment.component';
import { MemberListRoutingModule} from './member-list/member-list.routing.module';
import { ComposeMessageComponent } from './member-list/compose-message.component';
import { AngularFireStorageModule } from 'angularfire2/storage';


import { AdminRoutingModule } from './admin-routing.module';
import { MemberListComponent } from './member-list/member-list.component';
import { EmailIdService } from '../services/email-id.service';
import { InfoPersoComponent } from './info-perso/info-perso.component';
import { PhoneNumberDirective } from './info-perso/phoneNumber';
import { PostalCodeDirective } from './info-perso/postal-code.directive';
import { FocusDirectiveDirective } from '../inscription/focus-directive.directive';
import { NameDirectiveDirective } from '../inscription/directiveValidation/name-directive.directive';
import { BoxComportDirective } from './info-perso/box-comport.directive';
import { OrnithoComponent } from './ornitho/ornitho.component';
import { RedacComponent } from './redac/redac.component';
import { DropZoneDirective } from './drop-zone.directive';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileSizePipe } from './file-size.pipe';
import { OrnitaouaisService } from './ornitaouais.service';
import { OrnitaouaisComponent } from './ornitho/ornitaouais/ornitaouais.component';
import { EvenementComponent } from './redac/evenement/evenement.component';
import { TexteService } from './redac/evenement/texte.service';
import { MessageService } from './redac/evenement/message.service';
import { AccueilComponent } from './accueil/accueil.component';
import { MenuDirective } from './menu.directive';
import { InterfaceService } from './interface.service';
import { ListService } from './member-list/list.service';
import { AjoutMembreComponent } from './redac/ajout-membre/ajout-membre.component';






@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    AdminRoutingModule,
    FormsModule, ReactiveFormsModule,
    MatButtonModule , MatCheckboxModule, MatCardModule, MatGridListModule,
    MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSlideToggleModule,
    MatListModule , MatTabsModule, MatSelectModule, MatTableModule, MatMenuModule,
    MatExpansionModule, MatToolbarModule, MatTooltipModule, MatDialogModule , MatStepperModule, MatProgressSpinnerModule,
    MatDividerModule, MatAutocompleteModule, AngularFireStorageModule, MatProgressBarModule
  //  MemberListRoutingModule
  ],
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ManageCrisesComponent,
    ManageHeroesComponent,
    FocusDirectiveDirective,
    InscriptionComponent,
     ErrorsComponent,
     MyTelInput,
     NumberOnlyDirective,
     DateNaissanceValidationDirective,
    MakePaymentComponent,
     FactureComponent,
     MemberListComponent,
     InfoPersoComponent,
     PhoneNumberDirective,
     PostalCodeDirective,
     NameDirectiveDirective,
     BoxComportDirective,
     OrnithoComponent,
     RedacComponent,
     DropZoneDirective,
     FileUploadComponent,
     FileSizePipe,
     OrnitaouaisComponent,
     EvenementComponent,
     AccueilComponent,
     MenuDirective,
     AjoutMembreComponent


  //  ComposeMessageComponent
    // AccueilComponent,
  ],
  providers: [ListService, PaymentService, InformationService, EmailIdService, OrnitaouaisService,
     TexteService, MessageService, InterfaceService]
})
export class AdminModule {}
