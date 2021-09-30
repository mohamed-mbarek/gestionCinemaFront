import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Ville } from "../model/ville";

@Injectable()
export class VilleService {
    private apiServiceUrl=environment.apiBaseUrl;
  //  public villes:Observable<Ville[]>;

constructor(private http:HttpClient){}
  

public getVilles(): Observable<Ville[]>{
    return this.http.get<Ville[]>(`${this.apiServiceUrl}/villes/all`);
  }
public addVille(ville :Ville):Observable<Ville>{
return  this.http.post<Ville>(`${this.apiServiceUrl}/villes/add`,ville);
}
public UpdateVille(ville :Ville):Observable<Ville>{
  return  this.http.put<Ville>(`${this.apiServiceUrl}/villes/update`,ville);
}
public deleteVille(villeId:number):Observable<void>{
  return  this.http.delete<void>(`${this.apiServiceUrl}/villes/delete/${villeId}`);
  
}
}