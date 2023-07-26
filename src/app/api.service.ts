import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  apiurl = 'https://authapi-5ylc.onrender.com';
  // apiurl = ' this.apiurl +  /users';
  username = sessionStorage.getItem('username');

  getAll() {
    return this.http.get(this.apiurl + '/users');
  }
  getBycode(code: any) {
    return this.http.get(this.apiurl + '/users' + '/' + code);
  }
  proceedRegistration(data: any) {
    return this.http.post(this.apiurl + '/users', data);
  }
  updateUser(code: any, data: any) {
    return this.http.put(this.apiurl + '/users' + '/' + code, data);
  }
  isLoggedIn() {
    return sessionStorage.getItem('username') != null;
  }
  getUserRole() {
    return sessionStorage.getItem('userrole') != null
      ? sessionStorage.getItem('userrole')?.toString()
      : '';
  }
  getAllRole() {
    return this.http.get(this.apiurl + '/role');
  }
  getAllCust() {
    return this.http.get(this.apiurl + '/customer');
  }
  getAccessbyRole(role: any, menu: any) {
    return this.http.get(
      this.apiurl + `/roleAccess?role=` + role + '&menu=' + menu
    );
  }
  addCust(data: any): Observable<any> {
    return this.http.post(this.apiurl + '/customer', data);
  }
  updateCust(id: any, data: any): Observable<any> {
    return this.http.put(this.apiurl + `/customer/${id}`, data);
  }
  deleteCust(id: any): Observable<any> {
    return this.http.delete(this.apiurl + `/customer/${id}`);
  }
}
