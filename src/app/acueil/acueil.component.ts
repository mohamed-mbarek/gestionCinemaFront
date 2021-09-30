import { HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { error } from 'protractor';
import { Cinema } from '../model/cinema';
import { ProjectionFilm } from '../model/projectionFilm';
import { Ticket } from '../model/ticket';
import { Ville } from '../model/ville';
import { AcueilService } from '../service/acueil.service';
import { HttpErrorService } from '../service/http-error.service';
import { ProjectionFilmService } from '../service/projection-film-service.service';
import { TicketService } from '../service/ticket.service';
import { VilleService } from '../service/ville.service';

@Component({
  selector: 'app-acueil',
  templateUrl: './acueil.component.html',
  styleUrls: ['./acueil.component.css']
})
export class AcueilComponent implements OnInit {
  villes:Ville[];
  currentVille:Ville;
  currentCinema:Cinema
  cinemas;
  projections:ProjectionFilm[];
  getAllProjections:ProjectionFilm[];
  isloggedIn=localStorage.getItem('isloggedIn');
  userId:number;
  xx :number;
  projectionReserve:ProjectionFilm;
  nombreReservation:number;
  nbFilm:number;
  messageErreur: String;
  constructor(private villeService:VilleService ,private aceuilServices:AcueilService ,
              private ticketService:TicketService ,private projectionService:ProjectionFilmService ,
              private errorService:HttpErrorService       )           { }

  ngOnInit(): void {
    this.userId=parseInt(localStorage.getItem('idUser'));
    this.getAllVilles();
    this.getAllProjection();
    this.getNombreResByFilm(this.projectionReserve);
  }

  
  public  getAllProjection():void {
    this.projectionService.getProjectionFilm().subscribe(
      (response:ProjectionFilm[])=>{
      this.projections=response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      });
  }
  
  public searchProjection(key: string): void {
    const resultat: ProjectionFilm[] = [];
    for (const v of this.projections) {
      if (v.film.titre.toLocaleLowerCase().indexOf(key.toLowerCase()) !== -1 )
        resultat.push(v);
    }
    this.projections = resultat;
  }

  public getAllVilles():void{
    this.villeService.getVilles().subscribe(
      (Response:Ville[])=>{
        this.villes=Response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }
  public onGetCinemas(v:Ville):void{
    this.currentVille=v;
    this.aceuilServices.getCinemas(v.id).subscribe(
      (Data)=>{
        this.cinemas=Data;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }
public onGetFilms(c:Cinema){
  this.currentCinema=c;
  this.aceuilServices.getFilmsByCinema(c.id).subscribe(
    (Response:ProjectionFilm[])=>{
      console.log(Response);
      this.projections=Response;
      this.nbFilm=Response.length;
    },
    (error:HttpErrorResponse)=>{
      alert(error.statusText);
    }
  );
}

public onAddTicket(form:NgForm){
  document.getElementById('add-film-form').click();

  const values = form.value;
  let reservation: Ticket = {
    nombre: values.nombre,
    codePayement: values.codePayement,
    admin:{
      id:this.userId
    } ,
    projection: {
      id: values.projection
    }
  };
  if(this.projectionReserve.salle.nombrePlace<parseInt(localStorage.getItem('nombrePlaceRes'))+reservation.nombre){
  //alert("Désoler il reste "+(this.projectionReserve.salle.nombrePlace - parseInt(localStorage.getItem('nombrePlaceRes')))+"place");
  this.onOpenModal(this.projectionReserve,'alert');
  }else{
   console.log(reservation); 
  this.ticketService.addticket(reservation).subscribe(
    (response:Ticket)=>{
      this.onOpenModal(null,"succes");
      this.ngOnInit();
      form.reset();
    },
    (error:any)=>{
      // alert(error.error.message)
      // console.log(error)
      // console.warn(this.errorService.getServerErrorMessage(error));
      this.onOpenModelError(error.error.message,'erreur');
      // alert(error.error.message);
      // console.log(error.error.message);
      // console.log(error);
    });
  }
}

public getNombreResByFilm(projection:ProjectionFilm){
 
  this.ticketService.getNombreResByFilm(projection.id).subscribe(
 (response)=>{
  this.nombreReservation=response;
  localStorage.setItem('nombrePlaceRes',this.nombreReservation.toString());
  console.log(this.nombreReservation);  
},
    (error:HttpErrorResponse)=>{
      alert(error.message);
    }
    ); 
    
  }

  public getNombreplaceReserverByFilm(projection:ProjectionFilm){
 
    this.ticketService.getNombreResByFilm(projection.id).subscribe(
   (response)=>{
    const nb=response;
    localStorage.setItem('nombrePlaceReserver',nb.toString());
    console.log(this.nombreReservation);  
  },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
      ); 
      
    }








public onOpenModal(projection: ProjectionFilm ,string:String): void {
    
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if(string=="succes")
  button.setAttribute('data-target','#myModalSuccess');
  else if(string=='alert'){
    this.xx=parseInt(localStorage.getItem('nombrePlaceRes'));
    this.projectionReserve=projection;
    button.setAttribute('data-target', '#myModalAlertPlace');   
  }
  else{
    if(string==="aaa"){
      this.getNombreplaceReserverByFilm(projection);
      localStorage.setItem('projecton',projection.id.toString() );
  } else if (!this.isloggedIn) {
    button.setAttribute('data-target', '#myModalLogin');   
    }else{
    this.projectionReserve=projection;
    button.setAttribute('data-target','#addReservation');
    this.getNombreResByFilm(this.projectionReserve);
  }
   }
  container.appendChild(button);
  button.click();
} 



public onOpenModelError(erreur: String ,string:String): void {
    
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if(string=="erreur"){
  this.messageErreur=erreur;
  button.setAttribute('data-target','#httpErreur');
  }
  container.appendChild(button);
  button.click();
} 

}

