import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Organismo } from '../models/organismo.model';
import { Tramite } from '../models/tramite.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private organismosUrl = 'https://mocki.io/v1/06147c50-e097-4aa4-87e5-29c13bc39cdf';
  private tramitesUrl = 'https://mocki.io/v1/29687ee7-8efb-440a-aa4c-b8b36b32c283';

  constructor(private http: HttpClient) { }

  getOrganismos(): Observable<Organismo[]> {
    return this.http.get<Organismo[]>(this.organismosUrl);
  }

  getTramites(): Observable<Tramite[]> {
    return this.http.get<Tramite[]>(this.tramitesUrl);
  }
}
