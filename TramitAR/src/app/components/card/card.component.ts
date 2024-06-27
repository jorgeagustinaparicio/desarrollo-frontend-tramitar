import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Organismo } from '../../models/organismo.model';
import { Tramite } from '../../models/tramite.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {

  @Input() organismo!: Organismo;
  tramites: Tramite[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getTramites().subscribe(tramites => {
      this.tramites = tramites.filter(t => t.id_organismo === this.organismo.id);
    });
  }

  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

}
