import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Organism } from '../../models/organismo.model';
import { CommonModule } from '@angular/common';

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
    });//.organismo se refiere al array dentro del JSON
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

}
