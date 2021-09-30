import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reclamation } from '../model/reclamation';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiServiceUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  public getReclamations(): Observable<Reclamation[]>{
    return this.http.get<Reclamation[]>(`${this.apiServiceUrl}/reclamations/all`);
  }
public addReclamation(Reclamation :Reclamation):Observable<Reclamation>{
return  this.http.post<Reclamation>(`${this.apiServiceUrl}/reclamations/add`,Reclamation);
}

public deleteReclamation(ReclamationId:number):Observable<void>{
  return  this.http.delete<void>(`${this.apiServiceUrl}/reclamations/delete/${ReclamationId}`);
}

public UpdateVuReclamation(reclamation :Reclamation):Observable<Reclamation>{
  return  this.http.put<Reclamation>(`${this.apiServiceUrl}/reclamations/updateVu`,reclamation);
}
public countNonVu():Observable<number>{
  return  this.http.get<number>(`${this.apiServiceUrl}/reclamations/nbRecNonVu`);
}
}
