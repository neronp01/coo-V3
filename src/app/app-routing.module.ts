import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComposeMessageComponent } from './compose-message.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { AuthGuard } from './auth-guard.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import { AdminComponent } from './admin/admin.component';

const appRoutes: Routes = [
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'
  },
  {
    path: 'accueil/informations_presonnelles',
    loadChildren: 'app/admin/admin.module#AdminModule',
    data: { preload: true },
    canLoad: [AuthGuard]
  },
  {
    path: 'accueil/inscription',
    loadChildren: 'app/admin/admin.module#AdminModule',
    data: { preload: true },
    canLoad: [AuthGuard]
  },
  {
    path: 'accueil/liste_de_membres',
    loadChildren: 'app/admin/admin.module#AdminModule',
    data: { preload: true },
    canLoad: [AuthGuard]
  },
  {
    path: 'accueil',
    loadChildren: 'app/admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
  },
  {
    path: '404',
    component: PageNotFoundComponent,
  },
  { path: '',   redirectTo: '/accueil', pathMatch: 'full' },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true, // <-- debugging purposes only
        preloadingStrategy: SelectivePreloadingStrategy,

      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard,
    SelectivePreloadingStrategy
  ]
})
export class AppRoutingModule { }
