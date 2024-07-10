import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Organismo } from '../models/organismo.model';

@Injectable({
  providedIn: 'root'
})
export class OrganismoService {

  private apiUrl = 'http://localhost:3000/api/organismo'; // reemplaza con tu URL de API

  constructor(private http: HttpClient) { }

  //
  getOrganismo(): Observable<{ organismos: Organismo[] }> {
    return this.http.get<{ organismos: Organismo[] }>(this.apiUrl)
  }

  createOrganismo(item: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, item);
  }

  updateOrganismo(id: number, item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, item);
  }

  deleteOrganismo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}