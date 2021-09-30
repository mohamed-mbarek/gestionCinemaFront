import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Commentaire } from '../model/commentaire';
import { CommentaireService } from '../service/commentaire.service';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.css']
})
export class CommentaireComponent implements OnInit {

  commentaires:Commentaire[];
  deleteCommentaires:Commentaire;
  constructor(private commentaireService:CommentaireService) { }

  ngOnInit(): void {
    this.getAllCommentaires();
  }

  public getAllCommentaires():void{
    this.commentaireService.getCommentaires().subscribe(
      (Response:Commentaire[])=>{
        this.commentaires=Response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }
  public searchCommentaire(key:string):void{
    const resultat:Commentaire[]=[];
    for(const v of this.commentaires){
      if(v.admin.nom.toLocaleLowerCase().indexOf(key.toLowerCase())!==-1 ||v.admin.prenom.toLocaleLowerCase().indexOf(key.toLowerCase())!==-1 )
        resultat.push(v);
      }
    this.commentaires=resultat ;
  }

  public onDeleteComentaire(idCmnt :number){
    document.getElementById('delete-form').click();
    this.commentaireService.deleteCommentaire(idCmnt).subscribe(
      (responce:void)=>{
        this.ngOnInit();
      },
    (error:HttpErrorResponse)=>{
        alert(error.message);
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
    }
    container.appendChild(button);
    button.click();
  } 
  public save(id:number,commentaire:Commentaire){
    localStorage.setItem('projecton',id.toString() );
    this.commentaireService.UpdateVuReclamation(commentaire).subscribe(
      (response:Commentaire)=>{
        console.log(response);
        this.ngOnInit();
      }
    ),
    (error:HttpErrorResponse)=>{
      alert(error.message);
    }
    
  }

}
