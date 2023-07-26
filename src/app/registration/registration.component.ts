import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: ApiService,
    private router: Router
  ) {}
  ngOnInit(): void {}
  hide = true;
  signupForm = this.builder.group({
    id: this.builder.control('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', [
      Validators.required,
      Validators.pattern(
        '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}'
      ),
    ]),
    email: this.builder.control('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]),
    gender: this.builder.control('male'),
    role: this.builder.control(''),
    isActive: this.builder.control(false),
    imgurl: this.builder.control('', Validators.required),
  });
  proceedsignUp() {
    if (this.signupForm.valid) {
      this.service
        .proceedRegistration(this.signupForm.value)
        .subscribe((res) => {
          this.toastr.success(
            'Please Contact admin for enable access',
            'Register Successfully'
          );
          this.router.navigate(['login']);
        });
    } else {
      this.toastr.warning('Please Enter valid Data', 'Warning');
    }
  }
}
