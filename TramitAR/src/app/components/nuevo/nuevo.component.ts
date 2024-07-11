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
    name: "",
    descripcion: "",
    link: "",
    id_organismo: 1 //por defecto en el select
  };
  id!: string | null;

  constructor(
    private organismoService: OrganismoService,
    private router: Router,
    private route: ActivatedRoute,
    private tramiteService: TramiteService) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.organismoService.getOrganismo().subscribe({
      next: o => {
        this.organismos = o.organismos
      }
    })
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.tramiteService.getTramiteById(parseInt(this.id)).subscribe({
        next: t => {
          this.tramite.name = t.name;
          this.tramite.descripcion = t.descripcion;
          this.tramite.link = t.link;
          this.tramite.id_organismo = t.organismo;
        }
      });
    }
  }
  guardar() {
    if (this.id) {
      this.tramiteService.updateTramite(parseInt(this.id), this.tramite).subscribe(() => {
        this.router.navigate(["../.."], { relativeTo: this.route })
      })
    } else {
      this.tramiteService.createTramite(this.tramite).subscribe(() => {
        this.router.navigate(["../.."], { relativeTo: this.route })
      })
    }
  };
}