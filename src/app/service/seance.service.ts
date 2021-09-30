import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Seance } from '../model/seance';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {
  private apiServiceUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }
  
  public getSeanceByCinema(seanceId:number): Observable<Seance[]>{
    return this.http.get<Seance[]>(`${this.apiServiceUrl}/seances/getSeance/${seanceId}`);
  }

  public getSeances(): Observable<Seance[]>{
    return this.http.get<Seance[]>(`${this.apiServiceUrl}/seances/all`);
  }
public addSeance(seance :Seance):Observable<Seance>{
return  this.http.post<Seance>(`${this.apiServiceUrl}/seances/add`,seance);
}
public UpdateSeance(Seance :Seance):Observable<Seance>{
  return  this.http.put<Seance>(`${this.apiServiceUrl}/seances/update`,Seance);
}
public deleteSeance(SeanceId:number):Observable<void>{
  return  this.http.delete<void>(`${this.apiServiceUrl}/seances/delete/${SeanceId}`);  
}


}
