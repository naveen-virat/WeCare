import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import constants from '../../../assets/constants';
import { UserDotNetService, UserService } from '../user.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  c: any = constants;
  rescheduleForm!: FormGroup;
  userId!: string
  imgUrl!: string;
  allAppointments: any = [];
  myScheduleDetails: any = [];
  msg!: string;
  rescheduleSuccess = false;
  showRescheduleForm = false;
  bookingId: any;
  showAppointements = false;
  cancelledSuccess = false;

  constructor(private service: UserDotNetService, private form: FormBuilder) { }

  ngOnInit() {
    this.rescheduleForm = this.form.group({
      appointmentDate: ['', [Validators.required, dateCalculator]],
      slot: ['', Validators.required]
    })
    this.imgUrl = this.c.notepadImg;
    this.userId = sessionStorage.getItem('id') || '';
    this.appointment();
  }
  appointment() {
    this.service.appointment().subscribe({
      next: (successMessage: any) => {
        this.allAppointments = successMessage;
        this.showRescheduleForm = false;
        this.rescheduleSuccess = false;
        this.cancelledSuccess = false;
        this.showAppointements = true;
        for (let index = 0, j = 0; index < this.allAppointments.length; index++) {
          if (this.userId != '' && this.allAppointments[index].userId == parseInt(this.userId)) {
            this.myScheduleDetails[j++] = this.allAppointments[index];
          }
        }
        if (this.myScheduleDetails.length == 0) {
          this.msg = this.c.noAppointments;
        }
      },
      error: (error: string) => console.log(error)
    });
  }

  showForm(bookingId: number) {
    this.bookingId = bookingId
    this.showRescheduleForm = true;
  }

  rescheduleAppointment() {
    this.service.rescheduleAppointment(this.bookingId, this.rescheduleForm.controls['appointmentDate'].value,
      this.rescheduleForm.controls['slot'].value).subscribe({
        next: (successMessage: any) => {
          console.log(successMessage);
          this.showRescheduleForm = false;
          this.rescheduleSuccess = true;
        },
        error: (err: string) => console.log(err)
      });
  }

  showModal(bookingId: number) {
    console.log(bookingId)
    this.bookingId = bookingId;
  }

  cancel() {
    this.service.cancel(this.bookingId).subscribe({
      next: (successMessage: any) => {
        console.log(successMessage);
        this.cancelledSuccess = true;
      },
      error: (err: string) => console.log(err)
    })
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
