import { Component, OnInit } from '@angular/core';
import { OrganismoService } from '../../services/organismo.service';
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


  constructor(private organismoService: OrganismoService, private searchService: SearchService) { }

  ngOnInit(): void {//metodo que llama al servicio getData y se suscribe a la promesa que devuelve

    this.organismoService.getOrganismo().subscribe((data: any) => {
      this.organismos = data.organismos;
      let organismosAux = this.organismos;

      this.searchService.search.subscribe({
        next: v => {
          this.organismos = organismosAux.map(o => ({
            ...o,
            tramites: o.tramites.filter(t => t.nombre.toLowerCase().includes(v.toLowerCase())) // Cambiado aquí
          })).filter(o => o.tramites.length > 0);
        }
      });
            
    });

  }
}