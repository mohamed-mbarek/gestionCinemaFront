import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cinema } from '../model/cinema';
import { ProjectionFilm } from '../model/projectionFilm';

@Injectable({
  providedIn: 'root'
})
export class AcueilService {
  private apiServiceUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) {}

  getCinemas(id:number):Observable<Cinema>{
    return  this.http.get<Cinema>(`${this.apiServiceUrl}/cinemas/getCinemas/${id}`);
  }
  getFilmsByCinema(id:number):Observable<ProjectionFilm[]>{
    return  this.http.get<ProjectionFilm[]>(`${this.apiServiceUrl}/projectionFilm/ListFilm//${id}`);
  }
    
}
