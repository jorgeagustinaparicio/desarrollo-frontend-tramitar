import { Component, OnInit } from '@angular/core';
import { OrganismoService } from '../../services/organismo.service';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search.service';
import { Organismo } from '../../models/organismo.model';
import { RouterLink } from '@angular/router';
import { TramiteService } from '../../services/tramite.service';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit {

  organismosList: Organismo[] = [];

  constructor(
    private organismoService: OrganismoService,
    private searchService: SearchService,
    private tramiteService: TramiteService) { }

  ngOnInit(): void {
    this.getOrganismos()
  }
  getOrganismos() {
    this.organismoService.getOrganismo().subscribe((data: any) => {

      console.log('Data received:', data);
      this.organismosList = data.organismos;
      //aqui se asignan los organismos una vez resuelta la promesa
      let organismosAux = this.organismosList;
      this.searchService.search.subscribe({
        next: v => {
          this.organismosList = organismosAux.map(o => ({
            ...o,
            tramites: o.tramites.filter(t => t.nombre.toLowerCase().includes(v.toLowerCase())) // Cambiado aquí
          })).filter(o => o.tramites.length > 0);
        }
      });
    });
  }

  deleteTramite(id: number) {
    this.tramiteService.deleteTramite(id).subscribe();
    location.reload();
  }

  updateTramite(id: number) {

  }

}