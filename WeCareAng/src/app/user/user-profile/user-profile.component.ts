/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import constants from '../../../assets/constants';
import { UserDotNetService, UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  c = constants;
  userId: string = '';
  img: string = '';
  allUsers: any = []
  myUser: any = {}

  constructor(private service: UserDotNetService) {

  }

  ngOnInit() {
    this.userId = sessionStorage.getItem('id') || '';
    this.viewDetails();
  }

  viewDetails() {
    this.service.viewDetails(parseInt(this.userId)).subscribe({
      next: (successMessage: any) => {
            this.myUser = successMessage;
            if (this.myUser.gender == 'M') {
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
