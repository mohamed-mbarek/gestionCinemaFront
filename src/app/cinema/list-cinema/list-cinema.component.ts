import { HttpErrorResponse } from '@angular/common/http';
import { Component, ContentChild, ElementRef, Input, OnInit, Output } from '@angular/core';
import { Cinema } from 'src/app/model/cinema';
import { CinemaService } from 'src/app/service/cinema.service';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-list-cinema',
  templateUrl: './list-cinema.component.html',
  styleUrls: ['./list-cinema.component.css']
})
export class ListCinemaComponent implements OnInit {
  @Input() cinema:Cinema;
  @Output() cinemaSelected= new  EventEmitter<void>();
  constructor( private cinemaService:CinemaService) { }

  ngOnInit(): void {
  }

  onselected(){
    this.cinemaSelected.emit();    
  }

  
}
