import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Cinema } from 'src/app/model/cinema';
import { CinemaService } from 'src/app/service/cinema.service';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.css']
})
export class CinemasComponent implements OnInit {
  
  public cinemas: Cinema[];
  aletEroor: boolean;
  message: string;

  constructor(private cinemaService:CinemaService) { }

  ngOnInit(): void {
    this.getAllCinemas();
  }

  public getAllCinemas(): void {
    this.cinemaService.getCinemas().subscribe(
      (response: Cinema[]) => {
        this.cinemas = response;
      },
      (error: HttpErrorResponse) => {
        this.aletEroor=true;
        this.message='  Ne peut pas obtenir la liste des cinémas .';  
 });

}

}
