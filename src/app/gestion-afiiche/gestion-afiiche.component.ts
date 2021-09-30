import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Affiche } from '../model/affiche';
import { Film } from '../model/film';
import { AfficheService } from '../service/affiche.service';
import { FilmService } from '../service/film.service';

@Component({
  selector: 'app-gestion-afiiche',
  templateUrl: './gestion-afiiche.component.html',
  styleUrls: ['./gestion-afiiche.component.css']
})
export class GestionAfiicheComponent implements OnInit {
  
  ListFilm:Film[];
  affiches:Affiche[];
  deleteAffiche:Affiche;
  editAffiche:Affiche;
  aletSuccess: boolean;
  aletEroor: boolean;
  message: string;

  constructor( private afficheService:AfficheService ,private filmService:FilmService) { }

  ngOnInit(): void {
    this.getAllFilms();
    this.getAllAffiches();
    setTimeout(() => {                           //<<<---using ()=> syntax
      this.aletSuccess = false;
    }, 10000);
    setTimeout(() => {                           //<<<---using ()=> syntax
      this.aletEroor = false;
    }, 10000);
  }


  public  getAllAffiches():void {
    this.afficheService.getAffiches().subscribe(
      (response:Affiche[])=>{
      this.affiches=response;
      },
      (error:HttpErrorResponse)=>{
        this.aletEroor=true;
        this.message='  Ne peut pas obtenir la liste des Affiches.';  

      });
  
  }

  
  
 
   public onAddAffiche(addForm:NgForm):void{
   
    document.getElementById('add-Affiche-form').click();
    const values = addForm.value;
    let affiche: Affiche = {
      image: values.image,
      film: {
        id: values.film
      }
    };
    this.afficheService.addAffiche(affiche).subscribe(
      (responce:Affiche)=>{
        addForm.reset();
        this.aletSuccess=true;
        this.message='Affiche ajouter avec succès ';  
        this.ngOnInit();
      },
      (error:HttpErrorResponse)=>{
        this.aletEroor=true;
        this.message=' aucun affiche ajouter réessayer une autre fois';  
        addForm.reset();
      },
  
    );
  
  }


  public onUpdateAffiche(editForm:NgForm):void{
    document.getElementById('fermer-Affiche').click();
    const values = editForm.value;
    let editAffiche: Affiche = {
      id:values.id,
      image: values.image,
      film: {
        id: values.film
      }
    };
    this.afficheService.UpdateAffiche(editAffiche).subscribe(
      (responce:Affiche)=>{
        editForm.reset();
        this.aletSuccess=true;
        this.message='Affiche modifier avec succès';
        this.ngOnInit();
      },
      (error:HttpErrorResponse)=>{
        editForm.reset();
        this.aletEroor=true;
        this.message=' Aucune modification effectuée ';
      },
  
    );
  }
  public onDeleteAffiche(idAffiche :number){
    document.getElementById('delete-form').click();
    this.afficheService.deleteAffiche(idAffiche).subscribe(
      (responce:void)=>{
        this.aletSuccess=true;
        this.message='Affiche supprimer avec succès ';
        this.ngOnInit();
    },
      (error:HttpErrorResponse)=>{
        this.aletEroor=true;
        this.message=' Aucune suppression effectuée '; 

      },
    
    );
  }

  public searchAffiche(key:string):void{
      const resultat:Affiche[]=[];
      for(const v of this.affiches){
        if(v.film.titre.toLocaleLowerCase().indexOf(key.toLowerCase())!==-1)
          resultat.push(v);
        }
      this.affiches=resultat ;
    }



  public onOpenModal(Affiche: Affiche, mode: string): void {
    
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addAfficheModel');
      
    }
    if (mode === 'edit') {
      this.editAffiche=Affiche;
      button.setAttribute('data-target', '#updateAfficheModal');
    }
    if (mode === 'delete') {
      this.deleteAffiche=Affiche;
      button.setAttribute('data-target', '#deleteAfficheModal');
    }
    container.appendChild(button);
    button.click();
  } 

  public getAllFilms():void{
    this.filmService.getFilms().subscribe(
      (response:Film[])=>{
        this.ListFilm=response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      });
    }
}
