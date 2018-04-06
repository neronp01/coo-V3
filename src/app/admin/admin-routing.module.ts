import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { ManageCrisesComponent } from './manage-crises.component';
import { ManageHeroesComponent } from './manage-heroes.component';

import { AuthGuard } from '../auth-guard.service';
import {InscriptionComponent} from '../inscription/inscription.component';
import {MemberListComponent} from './member-list/member-list.component';
import { InfoPersoComponent } from './info-perso/info-perso.component';
import { OrnithoComponent } from './ornitho/ornitho.component';
import { RedacComponent } from './redac/redac.component';



const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'crises', component: ManageCrisesComponent },
          { path: 'heroes', component: ManageHeroesComponent },
          { path: 'inscription', component: InscriptionComponent },
          { path: 'liste_de_membres', component: MemberListComponent },
          { path: 'informations_presonnelles', component: InfoPersoComponent },
          { path: 'ornithologie', component: OrnithoComponent },
          { path: 'redaction', component: RedacComponent },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}
