import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tramite } from '../models/tramite.model';

@Injectable({
  providedIn: 'root'
})
export class TramiteService {

  private apiUrl = 'http://localhost:3000/api/tramite'
  constructor(private http: HttpClient) { }

 

  createTramite(tramite: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/create", tramite);
  }

  updateTramite(id: number, tramite: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl + "/update"}/${id}`, tramite);
  }

  deleteTramite(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl + "/delete"}/${id}`);
  }

  getTramiteById(id : number): Observable<Tramite>{
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }


}
