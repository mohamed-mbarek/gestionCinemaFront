import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectionFilm } from '../model/projectionFilm';

@Injectable({
  providedIn: 'root'
})
export class ProjectionFilmService{

  private apiServiceUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient){}
  
  public getProjectionFilm(): Observable<ProjectionFilm[]> {
    return this.http.get<ProjectionFilm[]>(`${this.apiServiceUrl}/projectionFilm/all`);
  }
  public addProjectionFilm(projection: ProjectionFilm): Observable<ProjectionFilm> {
    return this.http.post<ProjectionFilm>(`${this.apiServiceUrl}/projectionFilm/add`, projection);
  }
  public UpdateProjectionFilm(projection: ProjectionFilm): Observable<ProjectionFilm> {
    return this.http.put<ProjectionFilm>(`${this.apiServiceUrl}/projectionFilm/update`, projection);
  }
  public deleteProjectionFilm(projectionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServiceUrl}/projectionFilm/delete/${projectionId}`);
  }
  
  public getProjectionById(pId: number): Observable<ProjectionFilm> {
    return this.http.get<ProjectionFilm>(`${this.apiServiceUrl}/projectionFilm/find/${pId}`);
  }
}
