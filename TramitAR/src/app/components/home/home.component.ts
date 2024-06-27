import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { CommonModule } from '@angular/common';
import { Organismo } from '../../models/organismo.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CardComponent, CommonModule]
})
export class HomeComponent implements OnInit {
  organismos: Organismo[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getOrganismos().subscribe(organismos => {
      this.organismos = organismos;
    });
  }
}
