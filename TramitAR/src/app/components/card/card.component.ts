import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Organismo } from '../../models/organismo.model';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {

  @Input() organism!: Organismo;//Habilita la puerta de entrada


  constructor(private dataService: DataService) { }

  ngOnInit(): void { 

  }
}