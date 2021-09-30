import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Categorie } from "../model/categorie";

@Injectable()
export class CategorieService {
    private apiServiceUrl=environment.apiBaseUrl;


constructor(private http:HttpClient){}




public getCategories(): Observable<Categorie[]>{
    return this.http.get<Categorie[]>(`${this.apiServiceUrl}/categories/all`);
  }
public addCategorie(categorie :Categorie):Observable<Categorie>{
return  this.http.post<Categorie>(`${this.apiServiceUrl}/categories/add`,categorie);
}
public UpdateCategorie(categorie :Categorie):Observable<Categorie>{
  return  this.http.put<Categorie>(`${this.apiServiceUrl}/categories/update`,categorie);
}
public deleteCategorie(categorieId:number):Observable<void>{
  return  this.http.delete<void>(`${this.apiServiceUrl}/categories/delete/${categorieId}`);
  
}

}
