import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import constants from '../../../assets/constants';
import { UserDotNetService, UserService } from '../user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  c: any = constants;
  coachArray: any;
  userDetails!: string;
  coachid: any;
  appointmentDetails: any;
  appointmentForm!: FormGroup;
  maleImg: string = this.c.maleImg;
  femaleImg: string = this.c.femaleImg;
  showAppointmentForm: boolean = false;
  appointmentSuccess: boolean = false;

  constructor(private service: UserDotNetService, private form: FormBuilder) { }

  ngOnInit() {
    this.userDetails = sessionStorage.getItem('id') || "";
    this.appointmentForm = this.form.group({
      appointmentDate: ["", [Validators.required, dateCalculator]],
      slot: ["", Validators.required]
    });
    this.allcoaches();
  }
  allcoaches() {
    this.service.allCoaches().subscribe({
      next: (successMessage: string) => {
        this.coachArray = successMessage;
        this.showAppointmentForm = false;
        this.appointmentSuccess = false;
      },
      error: (error: string) => console.log(error)
    });
  }

  bookAppointment(coachId: number) {
    this.coachid = coachId;
    this.showAppointmentForm = true;
  }

  //confirmAppointment() {
  //  this.appointmentDetails = {
  //    appointmentDate: this.appointmentForm.controls['appointmentDate'].value,
  //    slot: this.appointmentForm.controls['slot'].value,
  //    userId: parseInt(this.userDetails),
  //    coachId: this.coachid
  //  }

  //  this.service.confirmAppointment(this.appointmentDetails).subscribe({
  //    next: (successMessage: string) => {
  //      console.log(successMessage);
  //      this.appointmentSuccess = true
  //      this.showAppointmentForm = false;
  //    },
  //    error: (error: string) => console.log(error)
  //  });
  //}


  //DotNet
  confirmAppointment() {
    this.appointmentDetails = {
      appointmentDate: this.appointmentForm.controls['appointmentDate'].value,
      slot: this.appointmentForm.controls['slot'].value,
      userId: parseInt(this.userDetails),
      coachId: this.coachid
    }

    this.service.confirmAppointment(this.appointmentDetails).subscribe({
      next: (successMessage: string) => {
        if (successMessage != '' + 99) {
          this.appointmentSuccess = true
          this.showAppointmentForm = false;
        }
        
      },
      error: (error: string) => console.log(error)
    });
  }
}

function dateCalculator(fc: FormControl) {
  var dateSelected = new Date(fc.value);
  var validatedDate = new Date();
  validatedDate.setDate(validatedDate.getDate() + 7);
  if (dateSelected < validatedDate && dateSelected > new Date()) {
    return true;
  }
  else {
    return {
      dateError: {
        message: constants.appointmentDateError
      }
    };
  }
}
