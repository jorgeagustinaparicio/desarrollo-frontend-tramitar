import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Procedure } from '../../models/tramite.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {

  @Input() organism: any;//abilita la puerta de entrada
  procedures: Procedure[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    console.log('Organism received:', this.organism);
    this.dataService.getData().subscribe((data: any) => {
      console.log('Trámites received:', data.tramites);
      this.procedures = data.tramites.filter((procedure: any) => procedure.id_organismo === this.organism.id);
    });
  }

  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

}
