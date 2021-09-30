import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Reclamation } from 'src/app/model/reclamation';
import { ReclamationService } from 'src/app/service/reclamation.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  reclamations:Reclamation[];
  nb: number;
  deleteReclamation: Reclamation;
  vueReclamation: Reclamation;

  constructor( private reclamationService :ReclamationService) { }

  ngOnInit(): void {
    this.getAllReclamations();
  }

  public  getAllReclamations():void {
    this.reclamationService.getReclamations().subscribe(
      (response:Reclamation[])=>{
        this.nb=response.length;
        this.reclamations=response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      });
  
  }

public onVuReclamation(reclamation:Reclamation){
 this.reclamationService.UpdateVuReclamation(reclamation).subscribe(
  (response:Reclamation)=>{
    console.log(response);
   
    this.ngOnInit();
  }
),
(error:HttpErrorResponse)=>{
  alert(error.message);
}
  }
  

  public onDeleteReclamation(idRec :number){
    document.getElementById('delete-form').click();
    this.reclamationService.deleteReclamation(idRec).subscribe(
      (responce:void)=>{
        console.log(responce);
        this.ngOnInit();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      },
    );
  }


  
  public searchReq(key:string):void{
    const resultat:Reclamation[]=[];
    for(const v of this.reclamations){
      if(v.nom.toLocaleLowerCase().indexOf(key.toLowerCase())!==-1 || v.prenom.toLocaleLowerCase().indexOf(key.toLowerCase())!==-1)
        resultat.push(v);
      }
    this.reclamations=resultat ;
  }


  
  public onOpenModal(reclamation: Reclamation, mode: string): void {
    
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'vue') {
      this.vueReclamation=reclamation;
      button.setAttribute('data-target', '#vueReclamation');
    }
    if (mode === 'delete') {
      this.deleteReclamation=reclamation;
      button.setAttribute('data-target', '#deleteRecModal');
    }
    container.appendChild(button);
    button.click();
  } 



}
