import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit {
  organismosList: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getOrganismos()
  }
  getOrganismos() {
    this.dataService.getData().subscribe((data: any) => {
      console.log('Data received:', data);
      this.organismosList = data.organismos;//aqui se asignan los organismos una vez resuelta la promesa
      this.organismosList = data.organismos.map((organismo: any) => {
        const tramites = data.tramites.filter((trámite: any) => trámite.id_organismo === organismo.id);
        return { ...organismo, tramites };
      });//.organismo se refiere al array dentro del JSON
    });
  }
  // getOrganismos() {
  //   this.dataService.getOrganismo().subscribe({
  //     next: (data) => {
  //       this.organismosList = data.organismo;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   })
  // }
  async mostrarAlertaModificar(organismo: any) {
    const { value: formValues } = await Swal.fire({
      title: 'Modificar Organismo',
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Nuevo Nombre" value="${organismo.nombre}">
        <input id="swal-input2" class="swal2-input" placeholder="Nueva Imagen URL" value="${organismo.imagen}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
          (document.getElementById('swal-input2') as HTMLInputElement).value
        ];
      }
    });

    if (formValues) {
      Swal.fire(`Nuevos valores ingresados: ${JSON.stringify(formValues)}`);
      // Aquí puedes realizar la actualización del organismo con los nuevos valores.
      // Por ejemplo, podrías llamar a un método en tu servicio para actualizar los datos.
    }
  }
}
