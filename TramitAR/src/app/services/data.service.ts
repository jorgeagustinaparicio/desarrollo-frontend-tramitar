import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://mocki.io/v1/6ddc8c79-6f32-4a49-8b1f-34b42bb44a11'; // reemplaza con tu URL de API

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
}
