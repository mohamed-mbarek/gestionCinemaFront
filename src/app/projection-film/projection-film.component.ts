import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Film } from '../model/film';
import { ProjectionFilm } from '../model/projectionFilm';
import { Salle } from '../model/salle';
import { Seance } from '../model/seance';
import { FilmService } from '../service/film.service';
import { ProjectionFilmService } from '../service/projection-film-service.service';
import { SalleService } from '../service/salle.service';
import { SeanceService } from '../service/seance.service';

@Component({
  selector: 'app-projection-film',
  templateUrl: './projection-film.component.html',
  styleUrls: ['./projection-film.component.css']
})
export class ProjectionFilmComponent implements OnInit {
  ListFilm: Film[];
  projections: ProjectionFilm[];
  deleteProjectionFilm: ProjectionFilm;
  editProjectionFilm: ProjectionFilm;
  listSeances: Seance[];
  listSalles: Salle[];
  aletSuccess: boolean;
  aletEroor: boolean;
  message: string;

  constructor(private projectionFilmService: ProjectionFilmService, public filmService: FilmService, private seanceService: SeanceService,
    private salleService: SalleService) { }


  ngOnInit(): void {
    this.getAllSeances();
    this.getAllFilms();
    this.getAllProjection();
    this.getAllSalles();
    setTimeout(() => {                           //<<<---using ()=> syntax
      this.aletSuccess = false;
    }, 10000);
    setTimeout(() => {                           //<<<---using ()=> syntax
      this.aletEroor = false;
    }, 10000);
  }

  public getAllSalles(): void {
    this.salleService.getSalles().subscribe(
      (response: Salle[]) => {
        this.listSalles = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });

  }

  public getAllFilms(): void {
    this.filmService.getFilms().subscribe(
      (response: Film[]) => {
        this.ListFilm = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }
  public getAllSeances(): void {

    this.seanceService.getSeances().subscribe(
      (response: Seance[]) => {
        this.listSeances = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });

  }



  public getAllProjection(): void {
    this.projectionFilmService.getProjectionFilm().subscribe(
      (response: ProjectionFilm[]) => {
        this.projections = response;
      },
      (error: HttpErrorResponse) => {
        this.aletEroor=true;
        this.message='  Ne peut pas obtenir la liste des projections .';  
      });

  }




  public onAddProjection(addForm: NgForm): void {

    document.getElementById('add-projection-form').click();
    const values = addForm.value;
    let add: ProjectionFilm = {
      dateProjection: values.dateProjection,
      prix: values.prix,
      salle: {
        id: values.salle
      },
      film: {
        id: values.film
      },
      seance: {
        id: values.seance
      }
    }
    console.log(add);
    this.projectionFilmService.addProjectionFilm(add).subscribe(
      (responce: ProjectionFilm) => {
        console.log(responce);
        addForm.reset();
        this.aletSuccess=true;
        this.message='Projection ajouter avec succès ';  

        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        this.aletEroor=true;
        this.message=' aucun projection ajouter réessayer une autre fois';
        addForm.reset();
      },

    );

  }


  public onUpdateProjection(editForm: NgForm): void {
    const values = editForm.value;
    let edit: ProjectionFilm = {
      id: values.id,
      dateProjection: values.dateProjection,
      prix: values.prix,
      salle: {
        id: values.salle
      },
      film: {
        id: values.film
      },
      seance: {
        id: values.seance
      }
    }
    console.log(edit);
    document.getElementById('editForm').click();
    this.projectionFilmService.UpdateProjectionFilm(edit).subscribe(
      (responce: ProjectionFilm) => {
        this.aletSuccess=true;
        this.message='Projection modifier avec succès ';  
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        this.aletEroor=true;
        this.message=' Aucune modification effectuée ';  
      },

    );
  }
  public onDeleteProjection(idProjectionFilm: number) {
    document.getElementById('delete-form').click();
    this.projectionFilmService.deleteProjectionFilm(idProjectionFilm).subscribe(
      (responce: void) => {
        this.aletSuccess=true;
        this.message='Projecction supprimer avec succès '; 
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        this.aletEroor=true;
        this.message=' Aucune suppression effectuée ';
      },
    );
  }

  public searchProjection(key: string): void {
    const resultat: ProjectionFilm[] = [];
    for (const v of this.projections) {
      if (v.film.titre.toLocaleLowerCase().indexOf(key.toLowerCase()) !== -1 || v.salle.nom.toLocaleLowerCase().indexOf(key.toLowerCase()) !== -1)
        resultat.push(v);
    }
    this.projections = resultat;
  }



  public onOpenModal(projection: ProjectionFilm, mode: string): void {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProjectionModel');

    }
    if (mode === 'edit') {

      this.editProjectionFilm = projection;
      button.setAttribute('data-target', '#updateProjectionModal');
    }
    if (mode === 'delete') {
      this.deleteProjectionFilm = projection;
      button.setAttribute('data-target', '#deleteProjectionModal');
    }
    container.appendChild(button);
    button.click();
  }

}
