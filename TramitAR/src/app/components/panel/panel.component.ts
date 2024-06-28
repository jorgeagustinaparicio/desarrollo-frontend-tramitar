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

  organismosList: Organism[] = [];
  constructor(private dataService: DataService) {

  }
  ngOnInit(): void {
    this.getOrganismos()
  }
  getOrganismos() {
    throw new Error('Method not implemented.');
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
