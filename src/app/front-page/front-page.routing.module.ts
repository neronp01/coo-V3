import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {FrontPageComponent} from './front-page.component';

const FrontPageRoutes: Routes = [
//  { path: 'heroes', redirectTo: '/superheroes' },
//  { path: 'hero/:id', redirectTo: '/superhero/:id' },
 // { path: 'coo',  component: FrontPageComponent },
//  { path: 'superhero/:id', component: HeroDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(FrontPageRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class FrontPageRoutingModule { }
