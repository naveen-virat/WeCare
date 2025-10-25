import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  allCoaches(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/coaches').pipe(
      catchError(this.handleError));
  }

  confirmAppointment(body: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/bookings',body).pipe(
      catchError(this.handleError));
  }

  viewDetails(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/users').pipe(
      catchError(this.handleError));
  }

  appointment(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/bookings').pipe(
      catchError(this.handleError));
  }

  rescheduleAppointment(bookingId: any, date: any, slot: any): Observable<any> {
    return this.http.patch<any>('http://localhost:3000/bookings/' + bookingId, { appointmentDate: date,slot:slot }).pipe(
      catchError(this.handleError));
  }

  cancel(id: any): Observable<any> {
    return this.http.delete<any>('http://localhost:3000/bookings/'+id).pipe(
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
export class UserDotNetService {

  constructor(private http: HttpClient) { }

  allCoaches(): Observable<any> {
    return this.http.get<any>('https://localhost:3000/api/WeCare/GetAllCoaches').pipe(
      catchError(this.handleError));
  }

  confirmAppointment(body: any): Observable<any> {
    console.log(body)
    return this.http.post<any>('https://localhost:3000/api/WeCare/AddBooking?appointmentDate=' + body.appointmentDate + '&slot=' + body.slot + '&userId=' + body.userId + '&coachId=' + body.coachId, body).pipe(
      catchError(this.handleError));
  }

  viewDetails(userId:any): Observable<any> {
    return this.http.get<any>('https://localhost:3000/api/WeCare/GetUser?userId='+userId).pipe(
      catchError(this.handleError));
  }

  appointment(): Observable<any> {
    return this.http.get<any>('https://localhost:3000/api/WeCare/GetAllBookings').pipe(
      catchError(this.handleError));
  }

  rescheduleAppointment(bookingId: any, date: any, slot: any): Observable<any> {
    return this.http.put<any>('https://localhost:3000/api/WeCare/UpdateBooking?bookingId=' + bookingId + '&newAppointmentDate=' + date + '&newSlot=' + slot, {}).pipe(
      catchError(this.handleError));
  }

  cancel(id: any): Observable<any> {
    return this.http.delete<any>('https://localhost:3000/api/WeCare/DeleteBooking?bookingId=' + id).pipe(
      catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    console.error(err)
    return throwError(() => err.error() || "Server Error");
  }
}
