import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Organismo } from '../models/organismo.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3000/api/organismo'; // reemplaza con tu URL de API

  constructor(private http: HttpClient) { }

  //
  getData(): Observable<{ organismos: Organismo[] }> {
    return this.http.get<{ organismos: Organismo[] }>(this.apiUrl)
  }

  getOrganismo(): Observable<{ organismos: Organismo[] }> {

    return this.http.get<{ organismos: Organismo[] }>(this.apiUrl)
  }

}