import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addcust',
  templateUrl: './addcust.component.html',
  styleUrls: ['./addcust.component.css'],
})
export class AddcustComponent implements OnInit {
  username = sessionStorage.getItem('username');
  constructor(
    private builder: FormBuilder,
    private api: ApiService,
    private toast: ToastrService,
    private dialogref: MatDialogRef<AddcustComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  custForm = this.builder.group({
    // id: this.builder.control(''),
    createdBy: this.username,
    name: this.builder.control('', Validators.required),
    creditLimit: this.builder.control('', Validators.required),
  });
  addCust() {
    if (this.custForm.valid) {
      if (this.data) {
        this.api.updateCust(this.data.id, this.custForm.value).subscribe({
          next: (res: any) => {
            this.toast.success('Updated Successfully', 'Success');
            this.dialogref.close(true);
          },
        });
      } else {
        this.api.addCust(this.custForm.value).subscribe({
          next: (val: any) => {
            this.toast.success('Added Successfully', 'Success');
            this.dialogref.close(true);
          },
          error: (err: any) => {
            this.toast.error(err, 'Error');
          },
        });
      }
    }
  }
  ngOnInit(): void {
    this.custForm.patchValue(this.data);
  }
}
