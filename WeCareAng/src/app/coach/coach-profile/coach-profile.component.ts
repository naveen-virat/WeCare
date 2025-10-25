import { Component, OnInit } from '@angular/core';
import constants from '../../../assets/constants';
import { CoachDotNetService, CoachService } from '../coach.service';

@Component({
  selector: 'app-coach-profile',
  templateUrl: './coach-profile.component.html',
  styleUrls: ['./coach-profile.component.css']
})

export class CoachProfileComponent implements OnInit {

  c = constants;
  coachId: string = '';
  img: string = '';
  allCoaches: any = []
  myCoach: any = {};

  constructor(private service: CoachDotNetService) { }

  ngOnInit() {

    this.coachId = sessionStorage.getItem('id') || '';
    this.viewDetails();

  }

  viewDetails() {
    this.service.viewDetails(parseInt(this.coachId)).subscribe({
      next: (successMessage: any) => {
        this.myCoach = successMessage;
        if (this.myCoach.gender == 'M') {
          this.img = this.c.maleImg;
        }
        else {
          this.img = this.c.femaleImg;
        }
          },
      error: (error: any) => console.log(error)
    });
   }
}
