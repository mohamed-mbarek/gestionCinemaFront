import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, Params } from '@angular/router';
import { Commentaire } from 'src/app/model/commentaire';
import { Film } from 'src/app/model/film';
import { ProjectionFilm } from 'src/app/model/projectionFilm';
import { CommentaireService } from 'src/app/service/commentaire.service';
import { FilmService } from 'src/app/service/film.service';
import { ProjectionFilmService } from 'src/app/service/projection-film-service.service';
import { TicketService } from 'src/app/service/ticket.service';

@Component({
  selector: 'app-detail-film',
  templateUrl: './detail-film.component.html',
  styleUrls: ['./detail-film.component.css']
})
export class DetailFilmComponent implements OnInit {
  commentaires:Commentaire[];
  userId=parseInt(localStorage.getItem('idUser'));
  currentFilm:Film;
  id:number
  adminImage=localStorage.getItem('image');
  idProjecction=parseInt(localStorage.getItem('projecton'));
  currentProjection:ProjectionFilm;
  place:number;
  deleteCommentaires: Commentaire;
  editCommentaires: Commentaire;
  aletSuccess: boolean;
  aletEroor: boolean;
  message: string;

  constructor( private activatedRoute:ActivatedRoute ,private filmService:FilmService , private ticketService:TicketService ,
             private projectionService:ProjectionFilmService , private commentaireService:CommentaireService)  { }


  ngOnInit(): void {
    this.getCommentaire(this.idProjecction);
    this.getProjectionCurrent(this.idProjecction);
    this.activatedRoute.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        //console.log(this.id);
      this.getFimlCurrent(this.id);
    }
    );
    this.getNombreResByFilm(this.idProjecction);
    setTimeout(() => {                           //<<<---using ()=> syntax
      this.aletSuccess = false;
    }, 10000);
    setTimeout(() => {                           //<<<---using ()=> syntax
      this.aletEroor = false;
    }, 10000);
  }

  public getFimlCurrent(idFilm:number):Film{
    this.filmService.getFilmDetails(idFilm).subscribe(
      (response:Film)=>{
           this.currentFilm=response;
       //   console.log(this.currentFilm);
        
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
      return this.currentFilm;
  }

  public getProjectionCurrent(idProj:number):void{
    this.projectionService.getProjectionById(idProj).subscribe(
      (response:ProjectionFilm)=>{
           this.currentProjection=response;
        },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }


  public addCommentaire(form:NgForm):void{

  const values = form.value;
  let commentaireAdd: Commentaire = {
      commentaire: values.commentaire,
      admin: {
        id: this.userId
            },
        projectionFilm:{
          id:this.idProjecction
        }   
          };
         console.log(commentaireAdd);
          this.commentaireService.onAddCommentaires(commentaireAdd).subscribe(
         (responce:Commentaire)=>{
           form.reset();
           this.aletSuccess=true;
           this.message='Votre commentaire ajout avec succès ';    
           this.ngOnInit();
         },
         (error:HttpErrorResponse)=>{
          this.aletEroor=true;
          this.message=' aucun commentaire  réessayer une autre fois';   
           form.reset();
       },
    
       );
    
      }


      public getNombreResByFilm(id:number){
        this.ticketService.getNombreResByFilm(id).subscribe(
       (response)=>{
        this.place=response;
        console.log('aaa'+response);
      }
        );   
        }
      

      public getCommentaire(idProjecction:number):void{
     this.commentaireService.findCommentairesByIdProjecction(idProjecction).subscribe(
          (response:Commentaire[])=>{
            this.commentaires=response;            
          },
          (error:HttpErrorResponse)=>{
            alert(error.message);
          }
        );
      }

      public onDeleteComentaire(idCmnt :number){
        document.getElementById('delete-form').click();
        this.commentaireService.deleteCommentaire(idCmnt).subscribe(
          (responce:void)=>{
            this.aletSuccess=true;
            this.message='Votre commentaire supprimer avec succès';      
            this.ngOnInit();
         },
        (error:HttpErrorResponse)=>{
          this.aletEroor=true;
          this.message=' Aucune suppression effectuée ';   
          },
        
        );
      }      


      public editCommentaire(form:NgForm):void{
        document.getElementById('fermer-seance').click();

        const values = form.value;
      let commentaireEdit: Commentaire = {
          id:values.id,
          commentaire: values.commentaire,
          admin: {
            id: this.userId
                },
            projectionFilm:{
              id:this.idProjecction
            }   
              };
              console.log(commentaireEdit);
              this.commentaireService.onUpdateCommentaires(commentaireEdit).subscribe(
             (responce:Commentaire)=>{
               form.reset();
               this.aletSuccess=true;
               this.message='Votre commentaire modifier avec succès ';         
               this.ngOnInit();
             },
             (error:HttpErrorResponse)=>{
              this.aletEroor=true;
              this.message=' Aucune modification effectuée ';  
              form.reset();
           },
        
           );
        
          }
    
    

      
  public onOpenModal(res: Commentaire, mode: string): void {
    
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'delete') {
      this.deleteCommentaires=res;
      button.setAttribute('data-target', '#deleteCmntModal');
    }else
    if (mode === 'edit') {
      this.editCommentaires=res;
      button.setAttribute('data-target', '#updateCmntModal');
    }
    container.appendChild(button);
    button.click();
  } 

    }
