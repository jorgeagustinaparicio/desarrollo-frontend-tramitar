import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Organismo } from '../../models/organismo.model';
import { OrganismoService } from '../../services/organismo.service';
import { SearchService } from '../../services/search.service';
import { TramiteService } from '../../services/tramite.service';
import { Tramite } from '../../models/tramite.model';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit {

  organismosList: Organismo[] = [];

  tramite: Tramite = { id: 0, name: 'hola', descripcion: '', link : '', organismo : 1 };

  constructor(
    private organismoService: OrganismoService,
    private searchService: SearchService,
    private tramiteService: TramiteService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tramiteService.getTramiteById(+id).subscribe((data : Tramite) =>{
        this.tramite = data;
      })
    }    
    this.getOrganismos()
  }

  onSubmit() : void {
    this.tramiteService.getTramiteById(this.tramite.id).subscribe(() => {
      this.router.navigate(["/tramites"])
    })
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
            tramites: o.tramites.filter(t => t.name.toLowerCase().includes(v.toLowerCase())) // Cambiado aquí
          })).filter(o => o.tramites.length > 0);
        }
      });
    });
  }

  deleteTramite(id: number) {
    this.tramiteService.deleteTramite(id).subscribe();
    location.reload();
  } 
}