import { Component, OnInit } from '@angular/core';
import constants from '../../../assets/constants';
import { CoachDotNetService, CoachService } from '../coach.service';

@Component({
  selector: 'app-coachhome',
  templateUrl: './coachhome.component.html',
  styleUrls: ['./coachhome.component.css']
})
export class CoachhomeComponent implements OnInit {

  c = constants;
  coachId!: string;
  imgUrl!: string;
  allSchedules: any = []
  scheduleDetails: any = []
  msg!: string

  constructor(private service: CoachDotNetService) { }

  ngOnInit() {

    this.imgUrl = this.c.notepadImg;
    this.coachId = sessionStorage.getItem('id') || '';
    this.schedules();
  }

  schedules() {
    this.service.schedules().subscribe({
      next: (successMessage: any) => {
        this.allSchedules = successMessage;
        for (let index = 0, j = 0; index < this.allSchedules.length; index++) {
          if (this.coachId != "" && this.allSchedules[index].coachId == parseInt(this.coachId)) {
            this.scheduleDetails[j++] = this.allSchedules[index];
          }
        }
        if (this.scheduleDetails.length == 0) {
          this.msg = this.c.noSchedules;
        }
      },
      error: (error: string) => console.log(error)
    });
  }
}
