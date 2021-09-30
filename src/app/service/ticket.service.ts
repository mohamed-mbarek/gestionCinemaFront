import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ticket } from '../model/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiServiceUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }


  

public gettickets(): Observable<Ticket[]>{
  return this.http.get<Ticket[]>(`${this.apiServiceUrl}/ticket/all`);
}

public addticket(ticket :Ticket):Observable<Ticket>{
return  this.http.post<Ticket>(`${this.apiServiceUrl}/ticket/add`,ticket);
}

public deleteticket(ticketId:number):Observable<void>{
return  this.http.delete<void>(`${this.apiServiceUrl}/ticket/delete/${ticketId}`);
}

public getNombreResByFilm(projectionId:number):Observable<number>{
  return  this.http.get<number>(`${this.apiServiceUrl}/ticket/verification/${projectionId}`);
}

public UpdateVu(ticket :Ticket):Observable<Ticket>{
  return  this.http.put<Ticket>(`${this.apiServiceUrl}/ticket/updateVu`,ticket);
}

public countNonVu():Observable<number>{
  return  this.http.get<number>(`${this.apiServiceUrl}/ticket/nbRecNonVu`);
}

public getHistorique(idAdmin:number): Observable<Ticket[]>{
  return this.http.get<Ticket[]>(`${this.apiServiceUrl}/ticket/historique/${idAdmin}`);
}

}

