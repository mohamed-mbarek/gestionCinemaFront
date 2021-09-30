import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Categorie } from '../model/categorie';
import { Cinema } from '../model/cinema';
import { Film } from '../model/film';
import { CategorieService } from '../service/cetegory.service';
import { FilmService } from '../service/film.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  films: Film[];
  editFilm: Film;
  deleteFilm: Film;
  categories: Categorie[];
  aletSuccess: boolean;
  aletEroor: boolean;
  message: string;

  constructor(private filmService: FilmService, private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllFilms();
    setTimeout(() => {                           //<<<---using ()=> syntax
      this.aletSuccess = false;
    }, 10000);
    setTimeout(() => {                           //<<<---using ()=> syntax
      this.aletEroor = false;
    }, 10000);
  }
 
 
  public onAddFilm(addForm: NgForm): void {
    document.getElementById('add-film-form').click();
    const values = addForm.value;
    let filmAdd: Film = {
      titre: values.titre,
      description: values.description,
      photo: values.photo,
      annonce: values.annonce,
      realisateur: values.realisateur,
      duree: values.duree,
      dateSortie: values.dateSortie,
      categorie: {
        id: values.categorie
      }
    };
    this.filmService.addFilm(filmAdd).subscribe(
      (responce: Film) => {
        addForm.reset();
        this.aletSuccess=true;
        this.message='Film ajouter avec succès ';  
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        this.aletEroor=true;
        this.message=' aucun film ajouter réessayer une autre fois';  
        addForm.reset();
      },

    );

  }


  public onUpdateFilm(editForm: NgForm): void {
    document.getElementById('update-form').click();
    const values = editForm.value;
    let filmedit: Film = {
      id: values.id,
      titre: values.titre,
      description: values.description,
      photo: values.photo,
      annonce: values.annonce,
      realisateur: values.realisateur,
      duree: values.duree,
      dateSortie: values.dateSortie,
      categorie: {
        id: values.categorie
      }
    };

    console.log(filmedit);
    this.filmService.UpdateFilm(filmedit).subscribe(
      (responce: Film) => {
        this.aletSuccess=true;
        this.message='Film modifier avec succès ';
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        this.aletEroor=true;
        this.message=' Aucune modification effectuée ';
      },

    );
    editForm.reset();
    }
  public onDeleteFilm(idFilm: number) {
    document.getElementById('delete-form').click();
    this.filmService.deleteFilm(idFilm).subscribe(
      (responce: void) => {
        this.aletSuccess=true;
        this.message='Film supprimer avec succès ';
        this.ngOnInit();

      },
      (error: HttpErrorResponse) => {
        this.aletEroor=true;
        this.message=' Aucune suppression effectuée '; 
      });
  }

  public searchFilm(key: string): void {
    const resultat: Film[] = [];
    for (const v of this.films) {
      if (v.titre.toLocaleLowerCase().indexOf(key.toLowerCase()) !== -1)
        resultat.push(v);
    }
    this.films = resultat;
  }

  public getAllFilms(): void {
    this.filmService.getFilms().subscribe(
      (response: Film[]) => {
        this.films = response;
      },
      (error: HttpErrorResponse) => {
        this.aletEroor=true;
        this.message='  Ne peut pas obtenir la liste des films .';  
  });

  }

  public onOpenModal(film: Film, mode: string): void {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addFilmModel');

    }
    if (mode === 'edit') {
      this.editFilm = film;
      console.log(this.editFilm.dateSortie);
      button.setAttribute('data-target', '#updateFilmModal');

    }
    if (mode === 'delete') {
      this.deleteFilm = film;
      button.setAttribute('data-target', '#deleteFilmModal');
    }
    container.appendChild(button);
    button.click();
  }


  public getAllCategories(): void {
    this.categorieService.getCategories().subscribe(
      (response: Categorie[]) => {
        this.categories = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });

  }
}