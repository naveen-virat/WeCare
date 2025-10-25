import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { CoachProfileComponent } from './coach-profile/coach-profile.component';
import { CoachhomeComponent } from './coachhome/coachhome.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: CoachhomeComponent },
  { path: 'profile', component: CoachProfileComponent },
  { path: 'appointments', component: CoachhomeComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachRoutingModule { }
