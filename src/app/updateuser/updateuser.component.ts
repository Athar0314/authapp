import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css'],
})
export class UpdatecustComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private dialogref: MatDialogRef<UpdatecustComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService,
    private toast: ToastrService
  ) {}
  signupForm = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]),
    password: this.data.password,
    gender: this.builder.control('male'),
    role: this.builder.control(''),
    isActive: this.builder.control(false),
    imgurl: this.builder.control('', Validators.required),
  });
  update() {
    this.api.updateUser(this.data.id, this.signupForm.value).subscribe({
      next: (res: any) => {
        this.toast.success('Updated Successfully', 'Success');
        this.dialogref.close(true);
      },
    });
  }
  ngOnInit(): void {
    this.signupForm.patchValue(this.data);
  }
}
