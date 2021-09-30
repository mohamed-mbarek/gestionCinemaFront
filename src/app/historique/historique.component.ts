import { NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Ticket } from '../model/ticket';
import { TicketService } from '../service/ticket.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  dateProjection:Date;
  dateReservaton:Date;
  historiques:Ticket[];
  deleteReservation: any;
  constructor(private ticketService:TicketService) { }
  
  userId:number;
  ngOnInit(): void {
  this.userId=parseInt(localStorage.getItem('idUser'));
  this.getAllHistorique(this.userId);
 
}

  public getAllHistorique(id:number){
    this.ticketService.getHistorique(id).subscribe(
      (Response:Ticket[])=>{
          this.historiques=Response;
      }
    );
  }


  public onDeleteTicket(idTicket :number){
    if( this.compareDate(this.dateProjection,this.dateReservaton)){
     document.getElementById('delete-form').click();
      this.ticketService.deleteticket(idTicket).subscribe(
      (responce:void)=>{
        console.log(responce);
        this.ngOnInit();
  
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      },
    
    );
  }else{
    this.onOpenModal(null,'imposible');
  }
}

  public searchTicket(key:string):void{
      const resultat:Ticket[]=[];
      for(const v of this.historiques){
        if(v.projection.film.titre.toLocaleLowerCase().indexOf(key.toLowerCase())!==-1 ||v.codePayement==(parseInt(key)) )
          resultat.push(v);
        }
      this.historiques=resultat ;
    }


  public onOpenModal(ticket: Ticket, mode: string): void {
    
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'delete') {
      this.deleteReservation=ticket;
       this.dateReservaton=ticket.date;
        this.dateProjection=ticket.projection.dateProjection;
       button.setAttribute('data-target', '#deleteTicketModal');
    }
    else if (mode === 'imposible') {
       button.setAttribute('data-target', '#impoTicketModal');
  } 
  container.appendChild(button);
    button.click();
}
 
public  compareDate(date1:Date,date2:Date):boolean{
    if(date1>=date2)
    return true;
    else if (date1<date2)
      return false;
    }

}
