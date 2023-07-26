import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AddcustComponent } from '../addcust/addcust.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customerLists: any;
  dataSource: any;
  accessData: any;
  haveEdit = false;
  haveAdd = false;
  haveDelete = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.getAccess();
    this.loadCust();
  }
  loadCust() {
    this.api.getAllCust().subscribe((res) => {
      this.customerLists = res;
      this.dataSource = new MatTableDataSource(this.customerLists);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  getAccess() {
    this.api
      .getAccessbyRole(this.api.getUserRole(), 'user')
      .subscribe((res) => {
        this.accessData = res;
        if (this.accessData.length > 0) {
          this.haveAdd = this.accessData[0].haveAdd;
          this.haveEdit = this.accessData[0].haveEdit;
          this.haveDelete = this.accessData[0].haveDelete;
        } else {
          this.toast.warning(
            'You are not Authorised to access',
            'Access Denied'
          );
          this.router.navigate(['']);
        }
      });
  }
  addCust() {
    if (this.haveAdd) {
      const ref = this.dialog.open(AddcustComponent, {
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '500ms',
        width: '50%',
      });
      ref.afterClosed().subscribe((res) => {
        this.loadCust();
      });
    } else {
      this.toast.warning('You dont have access', 'Access Denied');
    }
  }
  deleteCust(id: any) {
    if (this.haveDelete) {
      this.api.deleteCust(id).subscribe({
        next: (res) => {
          this.toast.success('Delete Successfully', 'Success');
          this.loadCust();
        },
      });
    } else {
      this.toast.warning('You don"t have Access', 'Access Denied');
    }
  }
  updateCust(data: any) {
    if (this.haveEdit) {
      const ref = this.dialog.open(AddcustComponent, {
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '500ms',
        width: '50%',
        data: data,
      });
      ref.afterClosed().subscribe((res) => {
        this.loadCust();
      });
    } else {
      this.toast.warning('You don"t have Access', 'Access Denied');
    }
  }
  displayedColumns: string[] = ['createdBy', 'name', 'creditLimit', 'action'];
  ngOnInit(): void {
    this.loadCust();
  }
}
