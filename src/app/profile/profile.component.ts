import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { UpdatecustComponent } from '../updateuser/updateuser.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  loggedInUser: any;
  userName = sessionStorage.getItem('username');
  constructor(private api: ApiService, private dialog: MatDialog) {
    this.userData();
  }
  userData() {
    this.api.getBycode(this.userName).subscribe((res) => {
      this.loggedInUser = res;
    });
  }
  updateUser(data: any) {
    const ref = this.dialog.open(UpdatecustComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data,
    });
    ref.afterClosed().subscribe((res) => {
      this.userData();
    });
  }
  ngOnInit(): void {
    this.userData();
  }
}
