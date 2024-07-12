import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Organismo } from '../../models/organismo.model';
import { OrganismoService } from '../../services/organismo.service';
import { SearchService } from '../../services/search.service';
import { TramiteService } from '../../services/tramite.service';
import { Tramite } from '../../models/tramite.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit {

  organismosList: Organismo[] = [];

  tramite: Tramite = { id: 0, name: 'hola', descripcion: '', link: '', organismo: 1 };

  constructor(
    private organismoService: OrganismoService,
    private searchService: SearchService,
    private tramiteService: TramiteService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tramiteService.getTramiteById(+id).subscribe((data: Tramite) => {
        this.tramite = data;
      })
    }
    this.getOrganismos()
  }

  onSubmit(): void {
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

  async mostrarAlertaModificar(tramite: Tramite) {
    const { value: formValues } = await Swal.fire({
      title: 'Modificar Trámite',
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Nuevo Nombre" value="${tramite.name}">
        <input id="swal-input2" class="swal2-input" placeholder="Nueva Descripción" value="${tramite.descripcion}">
        <input id="swal-input3" class="swal2-input" placeholder="Nuevo Link" value="${tramite.link}">
      `,
      focusConfirm: false,
      showCancelButton: true,  // Añadir botón de cancelar
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return {
          name: (document.getElementById('swal-input1') as HTMLInputElement).value,
          descripcion: (document.getElementById('swal-input2') as HTMLInputElement).value,
          link: (document.getElementById('swal-input3') as HTMLInputElement).value
        };
      }
    });

    if (formValues) {
      const updatedTramite = { ...tramite, ...formValues };
      this.tramiteService.updateTramite(tramite.id, updatedTramite).subscribe(() => {
        Swal.fire('Actualizado', 'El trámite ha sido actualizado.', 'success');
        this.getOrganismos(); // Actualiza la lista de organismos
      });
    }
  }

  // En tu componente, define la función mostrarMensajeConfirmacion
  mostrarMensajeConfirmacion(tramite: Tramite) {
    // Aquí puedes usar una librería como SweetAlert2 para mostrar un mensaje de confirmación
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres borrar este trámite?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, borrarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamar al método deleteTramite si se confirma la eliminación
        this.deleteTramite(tramite.id);
      }
    });
  }

}