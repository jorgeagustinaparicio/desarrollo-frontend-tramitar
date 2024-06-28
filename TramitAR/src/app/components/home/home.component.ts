import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CardComponent, CommonModule]
})
export class HomeComponent implements OnInit {
  organisms: any[] = [];//arreglo con datos obtenidos de la api

  constructor(private dataService: DataService) { }

  ngOnInit(): void {//metodo que llama al servicio getData y se suscribe a la promesa que devuelve
    this.dataService.getData().subscribe((data: any) => {
      console.log('Data received:', data);
      this.organisms = data.organismos;//aqui se asignan los organismos una vez resuelta la promesa
    });//.organismo se refiere al array dentro del JSON
  }
}




// import { Component, OnInit } from '@angular/core';
// import { CardComponent } from "../card/card.component";
// import { CommonModule } from '@angular/common';
// import { Organismo } from '../../models/organismo.model';
// import { DataService } from '../../services/data.service';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.css',
//   imports: [CardComponent, CommonModule]
// })
// export class HomeComponent implements OnInit {
//   // organismos: Organismo[] = [];

//   // constructor(private dataService: DataService) { }

//   // ngOnInit(): void {
//   //   this.dataService.getOrganismos().subscribe(organismos => {
//   //     this.organismos = organismos;
//   //   });
//   // }

//   organismosList: Organismo[] = [];
//   constructor(private dataService: DataService) {

//   }
//   ngOnInit(): void {
//     throw new Error('Method not implemented.');
//   }
//   getOrganismos() {
//     this.dataService.getOrganismo().subscribe({
//       next: (data) => {

//       },
//       error: (err) => {
//         console.log(err);
//       }
//     })
//   }
// }
