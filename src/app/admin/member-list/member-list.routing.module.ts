import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard} from '../../auth-guard.service';
import { MemberListComponent } from './member-list.component';
import { ComposeMessageComponent } from './compose-message.component';

const member_listRoutes: Routes = [
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'
  },
  {
    path: '',
    component: MemberListComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(member_listRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MemberListRoutingModule {}
