import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeCareService {

  constructor(private http: HttpClient) { }

  register(role: string, body: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/' + role, body).pipe(
      catchError(this.handleError));
  }

  isUserLoggedIn(): boolean {
    if (sessionStorage.getItem('islogged') == 'true') {
      return true
    }
    else {
      return false
    }
  }

  login(role: string, id: any): Observable<any> {
    return this.http.get<any>('http://localhost:3000/' + role + '/' + id).pipe(
      catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    console.error(err)
    return throwError(() => err.error() || "Server Error");
  }
}

@Injectable({
  providedIn: 'root'
})
export class WeCareDotNetService {

  constructor(private http: HttpClient) { }

  registerUser(name: string, password: string, gender: any, mobileNumber: any, dateOfBirth: any, emailId: any, pincode: any, city: any, state: any, country: any): Observable<any> {
    return this.http.post<any>('https://localhost:3000/api/WeCare/AddUser?name=' + name + '&password=' + password + '&gender=' + gender + '&mobileNumber=' + mobileNumber + '&dateOfBirth=' + dateOfBirth + '&emailId=' + emailId + '&pincode=' + pincode + '&city=' + city + '&state=' + state + '&country=' + country, {} ).pipe(
      catchError(this.handleError));
  }

  registerCoach(name: string, password: string, gender: any, mobileNumber: any, dateOfBirth: any, speciality: any): Observable<any> {
    return this.http.post<any>('https://localhost:3000/api/WeCare/AddCoach?name=' + name + '&password=' + password + '&gender=' + gender + '&mobileNumber=' + mobileNumber + '&dateOfBirth=' + dateOfBirth + '&speciality='+speciality, {}).pipe(
      catchError(this.handleError));
  }

  isUserLoggedIn(): boolean {
    if (sessionStorage.getItem('islogged') == 'true') {
      return true
    }
    else {
      return false
    }
  }

  login(role:any,id: any, password: string): Observable<any> {
    if (role =='coaches') {
      return this.http.post<any>('https://localhost:3000/api/WeCare/CoachLogin?coachId=' + id + '&password=' + password, {}).pipe(catchError(this.handleError));
    }
    else{
      return this.http.post<any>('https://localhost:3000/api/WeCare/UserLogin?userId=' + id + '&password=' + password, {}).pipe(catchError(this.handleError));
    }
  }

  private handleError(err: HttpErrorResponse) {
    console.error(err)
    return throwError(() => err.error() || "Server Error");
  }

}
