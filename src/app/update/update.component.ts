import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  roleLists: any;
  editData: any;
  constructor(
    private builder: FormBuilder,
    private api: ApiService,
    private toast: ToastrService,
    private ref: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  updateForm = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isActive: this.builder.control(false),
    imgurl: this.builder.control(''),
  });
  updateUser() {
    if (this.updateForm.valid) {
      this.api
        .updateUser(this.updateForm.value.id, this.updateForm.value)
        .subscribe((res) => {
          this.toast.success('Successfully Updated', 'Success');
          this.ref.close();
        });
    } else {
      this.toast.warning('Please Select role', 'Warning');
    }
  }
  ngOnInit(): void {
    this.api.getAllRole().subscribe((res) => {
      this.roleLists = res;
    });
    if (this.data.usercode != null && this.data.usercode != '') {
      this.api.getBycode(this.data.usercode).subscribe((res) => {
        this.editData = res;
        this.updateForm.setValue({
          id: this.editData.id,
          name: this.editData.name,
          email: this.editData.email,
          password: this.editData.password,
          role: this.editData.role,
          gender: this.editData.gender,
          isActive: this.editData.isActive,
          imgurl: this.editData.imgurl,
        });
      });
    }
  }
}
