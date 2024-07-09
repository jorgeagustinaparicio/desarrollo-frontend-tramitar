import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public search: BehaviorSubject<string> = new BehaviorSubject("");

  constructor() { }

  setSearch(search: string) {
    this.search.next(search)
  }


}
