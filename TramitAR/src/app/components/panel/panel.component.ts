import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search.service';
import { Organismo } from '../../models/organismo.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit {
updateTramite(_t26: any) {
throw new Error('Method not implemented.');
}
deleteTramite(_t26: any) {
throw new Error('Method not implemented.');
}
  organismosList: Organismo[] = [];

  constructor(private dataService: DataService, private searchService : SearchService) { }

  ngOnInit(): void {
    this.getOrganismos()
    
  } 
  getOrganismos() {
    this.dataService.getData().subscribe((data: any) => {
      
      console.log('Data received:', data);
      this.organismosList = data.organismos;
      //aqui se asignan los organismos una vez resuelta la promesa
      
      let organismosAux = this.organismosList;
      this.searchService.search.subscribe({
        next: v => {
          this.organismosList = organismosAux.filter((o) => {
            return o.tramites.some(t => {
              return t.nombre.toLowerCase().includes(v.toLowerCase());
            });
          })
        }
      })
      this.organismosList = data.organismos.map((organismo: any) => {
        const tramites = data.tramites.filter((trámite: any) => trámite.id_organismo === organismo.id);
        return { ...organismo, tramites };
      });//.organismo se refiere al array dentro del JSON
    });
  }
  
}