import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeCareDotNetService, WeCareService } from '../WeCareServices/we-care-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import constants from '../../assets/constants';
import { VERSION } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  role!: string;
  loginTitle!: string;
  loginImg!: string;
  loginForm!: FormGroup;
  placeholder!: string;
  errorMessage!: string;
  path!: string;
  user: boolean = false;
  coach: boolean = false;
  loginFailed: boolean = false;
  c: any = constants;

  constructor(private service: WeCareDotNetService, private form: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.role = this.route.snapshot.params['role'];
    
    if (this.role == 'coaches') {

      this.loginTitle = constants.coachLogin;
      this.placeholder = 'Coach Id';
      this.loginImg = constants.coachImg;
      this.path = 'coach';
      this.coach = true;
    } else if (this.role == 'users') {
      this.loginTitle = constants.userLogin;
      this.placeholder = 'User Id';
      this.loginImg = constants.userImg;
      this.path = 'user';
      this.user = true;
    }

    this.loginForm = this.form.group({
      id: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{5,10}$')]]

    })

  }

  //login() {

  //  this.service.login(this.role,parseInt(this.loginForm.controls['id'].value)).subscribe({
  //    next: (successMessage: any) => {
  //      if ((<string>successMessage.id == this.loginForm.controls['id'].value) &&
  //        (successMessage.password == this.loginForm.controls['password'].value)) {
  //        sessionStorage.setItem('islogged', 'true');
  //        sessionStorage.setItem('id', this.loginForm.controls['id'].value);
  //        this.router.navigate([this.path]);
  //      } else {
  //        this.loginFailed = true;
  //      }
  //    },

  //    error: (error: string) => this.errorMessage = error
  //  });
  //}

  //DotNet
  login() {

    this.service.login(this.role,parseInt(this.loginForm.controls['id'].value),this.loginForm.controls['password'].value).subscribe({
      next: (successMessage: any) => {
        if (successMessage == true){
          sessionStorage.setItem('islogged', 'true');
          sessionStorage.setItem('id', this.loginForm.controls['id'].value);
          this.router.navigate([this.path]);
        } else {
          this.loginFailed = true;
        }
      },
      error: (error: string) => this.errorMessage = error
    });
  }
}
