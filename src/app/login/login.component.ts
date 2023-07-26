import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide: any = true;
  userData: any;
  constructor(
    private toast: ToastrService,
    private builder: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
    sessionStorage.clear();
  }

  loginForm = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });
  proceedLogin() {
    if (this.loginForm.valid) {
      this.api.getBycode(this.loginForm.value.username).subscribe({
        next: (res) => {
          this.userData = res;
          if (this.userData.password === this.loginForm.value.password) {
            if (this.userData.isActive) {
              sessionStorage.setItem('username', this.userData.id);
              sessionStorage.setItem('userrole', this.userData.role);
              this.router.navigate(['']);
            } else {
              this.toast.error('Contact Admin', 'InActive User');
              this.router.navigate(['login']);
            }
          } else {
            this.toast.error('invalid Credential', 'Error');
          }
        },
        error: (err: any) => {
          this.toast.error(`User ${err.statusText}`, 'Error');
        },
      });
    }
  }
  ngOnInit(): void {
    this.proceedLogin();
  }
}
