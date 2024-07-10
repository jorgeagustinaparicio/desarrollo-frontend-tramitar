import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { OrganismoService } from '../../services/organismo.service';
import { Organismo } from '../../models/organismo.model';
import { CommonModule, provideNetlifyLoader } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TramiteService } from '../../services/tramite.service';
import { Tramite } from '../../models/tramite.model';

@Component({
  selector: 'app-nuevo',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.css'
})
export class NuevoComponent implements OnInit {
  organismos: Organismo[] = [];
  tramite = {
    nombre: "",
    descripcion: "",
    link: "",
    id_organismo: 1 //por defecto en el select
  };

  constructor(private organismoService: OrganismoService, private router: Router, private route: ActivatedRoute, private tramiteService: TramiteService) { }

  ngOnInit(): void {
    this.organismoService.getOrganismo().subscribe({
      next: o => {
        this.organismos = o.organismos

      }
    })
    let id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.tramiteService.getTramite(parseInt(id)).subscribe({
        next: t => {
          this.tramite.nombre = t.nombre;
          this.tramite.descripcion = t.descripcion;
          this.tramite.link = t.link;
        }
      });
    }
  }

  guardar() {
    this.tramiteService.createTramite(this.tramite).subscribe();
    this.router.navigate([".."], {relativeTo: this.route})
  };


}