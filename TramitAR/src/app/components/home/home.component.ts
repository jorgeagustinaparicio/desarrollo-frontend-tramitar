import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { Organismo } from '../../models/organismo.model';
import { SearchService } from '../../services/search.service';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CardComponent, CommonModule]
})
export class HomeComponent implements OnInit {
  organismos: Organismo[] = [];//arreglo con datos obtenidos de la api


  constructor(private dataService: DataService, private searchService: SearchService) { }

  ngOnInit(): void {//metodo que llama al servicio getData y se suscribe a la promesa que devuelve

    this.dataService.getData().subscribe((data: any) => {
      this.organismos = data.organismos;
      let organismosAux = this.organismos;
      this.searchService.search.subscribe({
        next: v => {
          this.organismos = organismosAux.filter((o) => {
            return o.tramites.some(t => {
              return t.nombre.toLowerCase().includes(v.toLowerCase());
            });
          })
        }
      })
    });

  }
}