import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://mocki.io/v1/25802c44-8a67-4c55-acba-3265c500d690'; // reemplaza con tu URL de API

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.get(this.apiUrl, httpOptions).pipe(
      tap(response => {
        console.log('Response from API:', response);
      }),
      catchError(error => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }

  getDataFilter(search: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(this.apiUrl, { search }, httpOptions).pipe(
      tap(response => {
        console.log('Response from API:', response);
      }),
      catchError(error => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }
}