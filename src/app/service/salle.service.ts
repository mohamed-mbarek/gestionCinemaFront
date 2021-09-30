import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Salle } from '../model/salle';

@Injectable({
  providedIn: 'root'
})
export class SalleService {
  
  private apiServiceUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }
  
  public getSalleByCinema(cinemaId:number): Observable<Salle[]>{
    return this.http.get<Salle[]>(`${this.apiServiceUrl}/salles/getSalle/${cinemaId}`);
  }

  public getSalles(): Observable<Salle[]>{
    return this.http.get<Salle[]>(`${this.apiServiceUrl}/salles/all`);
  }
public addSalle(salle :Salle):Observable<Salle>{
return  this.http.post<Salle>(`${this.apiServiceUrl}/salles/add`,salle);
}
public UpdateSalle(salle :Salle):Observable<Salle>{
  return  this.http.put<Salle>(`${this.apiServiceUrl}/salles/update`,salle);
}
public deleteSalle(salleId:number):Observable<void>{
  return  this.http.delete<void>(`${this.apiServiceUrl}/salles/delete/${salleId}`);  
}


}
