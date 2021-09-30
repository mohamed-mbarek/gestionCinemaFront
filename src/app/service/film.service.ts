import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Film } from '../model/film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private apiServiceUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient){}
  
  public getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.apiServiceUrl}/films/all`);
  }
  public addFilm(film: Film): Observable<Film> {
    return this.http.post<Film>(`${this.apiServiceUrl}/films/add`, film);
  }
  public UpdateFilm(film: Film): Observable<Film> {
    return this.http.put<Film>(`${this.apiServiceUrl}/films/update`, film);
  }
  public deleteFilm(filmId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServiceUrl}/films/delete/${filmId}`);
  }
  
  public getFilmDetails(filmId: number): Observable<Film> {
    return this.http.get<Film>(`${this.apiServiceUrl}/films/find/${filmId}`);
  }
}
