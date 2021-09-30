import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from '../model/ticket';
import { TicketService } from '../service/ticket.service';

@Component({
  selector: 'app-notification-admin',
  templateUrl: './notification-admin.component.html',
  styleUrls: ['./notification-admin.component.css']
})
export class NotificationAdminComponent implements OnInit {

  tickets: Ticket[];
  deleteReservation: Ticket;
  aletSuccess: boolean;
  aletEroor: boolean;
  message: string;

  constructor(private ticketService: TicketService ) { }

  ngOnInit(): void {
    this.getAllTicket();
    setTimeout(() => {                           //<<<---using ()=> syntax
      this.aletSuccess = false;
    }, 10000);
    setTimeout(() => {                           //<<<---using ()=> syntax
      this.aletEroor = false;
    }, 10000);

  }


  public getAllTicket(): void {
    this.ticketService.gettickets().subscribe(
      (Response: Ticket[]) => {
        this.tickets = Response;
      },
      (error: HttpErrorResponse) => {
        // this.aletEroor=true;
        // this.message=' Ne peut pas obtenir la liste des reservations.';  
      }
    );
  }
  public searchTicket(key: string): void {
    const resultat: Ticket[] = [];
    for (const v of this.tickets) {
      if (v.admin.nom.toLocaleLowerCase().indexOf(key.toLowerCase()) !== -1 || v.admin.prenom.toLocaleLowerCase().indexOf(key.toLowerCase()) !== -1 || v.projection.film.titre.toLocaleLowerCase().indexOf(key.toLowerCase()) !== -1)
        resultat.push(v);
    }
    this.tickets = resultat;
  }

  public onVuRecReservation(ticket: Ticket) {
    this.ticketService.UpdateVu(ticket).subscribe(
      (response: Ticket) => {
        //console.log(ticket);
        this.ngOnInit();
      }
    ),
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
  }


  public onDeleteReservation(idReservation: number) {
    document.getElementById('delete-form').click();
    this.ticketService.deleteticket(idReservation).subscribe(
      (responce: void) => {
        this.aletSuccess=true;
        this.message='Projecction supprimer avec succès '; 
        this.ngOnInit();
      },

      (error: HttpErrorResponse) => { 
        this.aletEroor=true;
        this.message=' Aucune suppression effectuée ';      },

    );
  }

  public onOpenModal(res: Ticket, mode: string): void {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'delete') {
      this.deleteReservation = res;
      button.setAttribute('data-target', '#deleteResModal');
    }
    container.appendChild(button);
    button.click();
  }

}
