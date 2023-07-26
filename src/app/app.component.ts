import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'authtestapp';
  username = sessionStorage.getItem('username');
  loggedInUser: any;
  darkMode = false;
  constructor(private service: ApiService) {}
  isLoggedIn() {
    if (this.service.isLoggedIn()) {
      return true;
    } else {
      return false;
    }
  }
  isAdmin() {
    if (this.service.getUserRole() === 'admin') {
      return true;
    } else {
      return false;
    }
  }
  userData() {
    this.service.getBycode(this.username).subscribe((res) => {
      this.loggedInUser = res;
    });
  }
  toggle() {
    this.darkMode = !this.darkMode;
    document.documentElement.setAttribute(
      'data-theme',
      this.darkMode ? 'dark' : 'light'
    );
  }
  ngOnInit() {
    this.userData();
  }
}
