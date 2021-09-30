import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Categorie } from '../model/categorie';
import { CategorieService } from '../service/cetegory.service';

@Component({
  selector: 'app-category-film',
  templateUrl: './category-film.component.html',
  styleUrls: ['./category-film.component.css']
})
export class CategoryFilmComponent implements OnInit {
  public categories:Categorie[];
  public editCategorie:Categorie;
  public deleteCategorie:Categorie;
  aletSuccess:boolean;
  aletEroor:boolean;
  message:string;

  constructor( private categorieService:CategorieService) { }
  
  ngOnInit(): void {
    this.getAllCategories();
    setTimeout(()=>{                           //<<<---using ()=> syntax
      this.aletSuccess = false;
 }, 5000);
 setTimeout(()=>{                           //<<<---using ()=> syntax
  this.aletEroor = false;
}, 8000);
  }
  
  public  getAllCategories():void {
    this.categorieService.getCategories().subscribe(
      (response:Categorie[])=>{
      this.categories=response;
      },
      (error:HttpErrorResponse)=>{
        this.aletEroor=true;
        this.message='  Ne peut pas obtenir la liste des categories .';  
     });
  
  }
 

  public onAddCategorie(addForm:NgForm):void{
   
    document.getElementById('add-ville-form').click();
    this.categorieService.addCategorie(addForm.value).subscribe(
      (responce:Categorie)=>{
        console.log(responce);
        addForm.reset();
        this.aletSuccess=true;
        this.message='Catgorie ajouter avec succès ';  
        this.ngOnInit();
   
      },
      (error:HttpErrorResponse)=>{
        this.aletEroor=true;
        this.message=' aucun categorie ajouter réessayer une autre fois';  
        addForm.reset();
      },
  
    );
  
  }


  public onUpdateCategorie(categorie:Categorie):void{
    document.getElementById('aaaa').click();
    this.categorieService.UpdateCategorie(categorie).subscribe(
      (responce:Categorie)=>{
        console.log(responce);
        this.aletSuccess=true;
        this.message='Categorie modifier avec succès ';  
        this.ngOnInit();
      },
      (error:HttpErrorResponse)=>{
        this.aletEroor=true;
        this.message=' Aucune modification effectuée ';  
      },
  
    );
  }
  public onDeleteCategorie(idCategorie :number){
    document.getElementById('add-ville-form').click();
    this.categorieService.deleteCategorie(idCategorie).subscribe(
      (responce:void)=>{
        this.aletSuccess=true;
        this.message='Categorie supprimer avec succès ';  
        this.ngOnInit();
      },
      (error:HttpErrorResponse)=>{
        this.aletEroor=true;
        this.message=' Aucune suppression effectuée '; 
      },
    
    );
  }

  public searchCategorie(key:string):void{
    console.log(key);
      const resultat:Categorie[]=[];
      for(const v of this.categories){
        if(v.nom.toLocaleLowerCase().indexOf(key.toLowerCase())!==-1)
          resultat.push(v);
        }
      this.categories=resultat ;
    }













  public onOpenModal(categorie: Categorie, mode: string): void {
    
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCatModel');
      
    }
    if (mode === 'edit') {
      this.editCategorie=categorie;
      button.setAttribute('data-target', '#updateCatModal');
    }
    if (mode === 'delete') {
      this.deleteCategorie=categorie;
      button.setAttribute('data-target', '#deleteCatModal');
    }
    container.appendChild(button);
    button.click();
  } 

}
