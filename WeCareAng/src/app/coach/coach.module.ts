import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachRoutingModule } from './coach-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoachComponent } from './coach.component';
import { CoachhomeComponent } from './coachhome/coachhome.component';
import { CoachProfileComponent } from './coach-profile/coach-profile.component';
import { CoachDotNetService, CoachService } from './coach.service';



@NgModule({
  declarations: [
    CoachComponent,
    CoachhomeComponent,
    CoachProfileComponent
  ],
  imports: [
    CommonModule,
    CoachRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [CoachService, CoachDotNetService]
})
export class CoachModule { }
