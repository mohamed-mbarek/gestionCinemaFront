import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Affiche } from '../model/affiche';

@Injectable({
  providedIn: 'root'
})
export class AfficheService {
  private apiServiceUrl=environment.apiBaseUrl;


constructor(private http:HttpClient){}

public getAffiches(): Observable<Affiche[]>{
    return this.http.get<Affiche[]>(`${this.apiServiceUrl}/affiches/all`);
  }
public addAffiche(affiche :Affiche):Observable<Affiche>{
return  this.http.post<Affiche>(`${this.apiServiceUrl}/affiches/add`,affiche);
}
public UpdateAffiche(affiche :Affiche):Observable<Affiche>{
  return  this.http.put<Affiche>(`${this.apiServiceUrl}/affiches/update`,affiche);
}
public deleteAffiche(afficheId:number):Observable<void>{
  return  this.http.delete<void>(`${this.apiServiceUrl}/affiches/delete/${afficheId}`);
  
}

}
