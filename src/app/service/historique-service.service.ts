import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Historique } from '../model/historique';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueServiceService {

  private apiServiceUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public getHistoriques(): Observable<Historique[]> {
    return this.http.get<Historique[]>(`${this.apiServiceUrl}/historiques/all`);
  }
  public addHistorique(Historique: Historique): Observable<Historique> {
    return this.http.post<Historique>(`${this.apiServiceUrl}/historique/add`, Historique);
  }
  public UpdateHistorique(Historique: Historique): Observable<Historique> {
    return this.http.put<Historique>(`${this.apiServiceUrl}/historique/update`, Historique);
  }
  public deleteHistorique(HistoriqueId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServiceUrl}/historique/delete/${HistoriqueId}`);
  }
  
}
