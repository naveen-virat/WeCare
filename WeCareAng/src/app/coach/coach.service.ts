import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  constructor(private http: HttpClient) { }

  schedules(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/bookings').pipe(
      catchError(this.handleError));
  }

  viewDetails(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/coaches').pipe(
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
export class CoachDotNetService {

  constructor(private http: HttpClient) { }

  schedules(): Observable<any> {
    return this.http.get<any>('https://localhost:3000/api/WeCare/GetAllBookings').pipe(
      catchError(this.handleError));
  }

  viewDetails(coachId:number): Observable<any> {
    return this.http.get<any>('https://localhost:3000/api/WeCare/GetCoach?coachId=' + coachId).pipe(
      catchError(this.handleError));
  }


  private handleError(err: HttpErrorResponse) {
    console.error(err)
    return throwError(() => err.error() || "Server Error");
  }
}
