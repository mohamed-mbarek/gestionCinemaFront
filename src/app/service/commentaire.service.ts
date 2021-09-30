import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from '../header/header.component';
import { Commentaire } from '../model/commentaire';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService{
  private apiServiceUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient ) { }
  nbCmntNonvu:number

  public getCommentaires():Observable<Commentaire[]>{  
    return this.http.get<Commentaire[]>(`${this.apiServiceUrl}/commentaire/all`);
  }

  public onAddCommentaires(commentaire:Commentaire):Observable<Commentaire>{  
    return this.http.post<Commentaire>(`${this.apiServiceUrl}/commentaire/add`,commentaire);
  }
  
  public onUpdateCommentaires(commentaire:Commentaire):Observable<Commentaire>{  
    return this.http.put<Commentaire>(`${this.apiServiceUrl}/commentaire/update`,commentaire);
  }

  public deleteCommentaire(commentaireId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServiceUrl}/commentaire/delete/${commentaireId}`);
  }

  public findCommentairesById(idCommentaire:number):Observable<Commentaire>{  
    return this.http.get<Commentaire>(`${this.apiServiceUrl}/commentaire/all`);
  }
  public findCommentairesByIdProjecction(idProj:number):Observable<Commentaire[]>{  
    return this.http.get<Commentaire[]>(`${this.apiServiceUrl}/commentaire/findCommentaire/${idProj}`);
  }
  public countComntNonVu():Observable<number>{  
    return  this.http.get<number>(`${this.apiServiceUrl}/commentaire/nbRecNonVu`);
  }

  public UpdateVuReclamation(commentaire :Commentaire):Observable<Commentaire>{
    const xx=  this.http.put<Commentaire>(`${this.apiServiceUrl}/commentaire/updateVu`,commentaire);
      this.countComntNonVu();
    return xx;
  }

}
