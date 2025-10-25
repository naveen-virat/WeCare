import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import constants from '../../assets/constants';
import { WeCareDotNetService, WeCareService } from '../WeCareServices/we-care-services.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  role!: string;
  signUpTitle!: string;
  signUpImg!: string;
  formDisplay = true;
  errorMessage = '';
  userregisterForm!: FormGroup;
  coachregisterForm!: FormGroup;
  userId!: any;
  coachId!: any;
  c: any = constants;
  userSignupSuccess: boolean = false;
  coachSignupSuccess: boolean = false;

  constructor(private service: WeCareDotNetService, private form: FormBuilder, private router: ActivatedRoute) { }

  ngOnInit() {

    this.role = this.router.snapshot.params['role'];

    this.userregisterForm = this.form.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]{3,50}$')]],
      'password': ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{5,10}$')]],
      'mobileNumber': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'dateOfBirth': ['', ageCalculator],
      'gender': ['', Validators.required],
      'pincode': ['', Validators.required],
      'city': ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]{3,20}$')]],
      'state': ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]{3,20}$')]],
      'country': ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]{3,20}$')]]
    })
    //Validators.pattern('^[\\d]{ 10}$'),
    this.coachregisterForm = this.form.group({
      'name': ['', [Validators.pattern('^[a-zA-Z\\s]{3,50}$'), Validators.required]],
      'password': ['', [Validators.pattern('^[a-zA-Z0-9]{5,10}$'), Validators.required]],
      'mobileNumber': ['', [Validators.required]],
      'dateOfBirth': ['', ageCalculator],
      'gender': ['', Validators.required],
      'speciality': ['', [Validators.pattern('^[a-zA-Z\\s]{3,50}$'), Validators.required]]
    })

    if (this.role == 'coaches') {
      this.formDisplay = false;
    }
  }

  coachRegister() {
    var coachObj = {
      "name": this.coachregisterForm.controls['name'].value,
      "password": this.coachregisterForm.controls['password'].value,
      "gender": this.coachregisterForm.controls['gender'].value,
      "dateOfBirth": this.coachregisterForm.controls['dateOfBirth'].value,
      "mobileNumber": this.coachregisterForm.controls['mobileNumber'].value,
      "speciality": this.coachregisterForm.controls['speciality'].value
    }
    //console.log(coachObj)
    this.service.registerCoach(coachObj.name, coachObj.password,coachObj.gender,coachObj.mobileNumber,coachObj.dateOfBirth,coachObj.speciality).subscribe({
      next: (sucessMessage: any) => {
        this.coachId = sucessMessage;
        this.coachSignupSuccess = true
      },
      error: (error: string) => this.errorMessage = error
    });
  }

  userRegister() {
    var userObj = {

      "name": this.userregisterForm.controls['name'].value,
      "password": this.userregisterForm.controls['password'].value,
      "gender": this.userregisterForm.controls['gender'].value,
      "dateOfBirth": this.userregisterForm.controls['dateOfBirth'].value,
      "email": this.userregisterForm.controls['email'].value,
      "mobileNumber": this.userregisterForm.controls['mobileNumber'].value,
      "pincode": this.userregisterForm.controls['pincode'].value, "city": this.userregisterForm.controls['city'].value,
      "state": this.userregisterForm.controls['state'].value,
      "country": this.userregisterForm.controls['country'].value
    }
    console.log(userObj)
    this.service.registerUser(userObj.name, userObj.password, userObj.gender, userObj.mobileNumber, userObj.dateOfBirth, userObj.email, userObj.pincode, userObj.city, userObj.state ,userObj.country).subscribe({
      next: (successMessage: any) => {
        this.userId = successMessage;
        this.userSignupSuccess = true;
      },
      error: (error: string) => this.errorMessage = error
    });
  }
}

function ageCalculator(fc: FormControl) {

  let currentDate = new Date();
  let dateOfBirth = new Date(fc.value);
  let age = currentDate.getFullYear() - dateOfBirth.getFullYear();
  if (age > 20 && age <= 100) {
    return true;
  }
  else {
    return {
      AgeError: {
        message: "Age should be between 20 and 100 years!!"
      }
    };
  }
}
