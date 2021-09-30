import { HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cinema } from 'src/app/model/cinema';
import { Salle } from 'src/app/model/salle';
import { CinemaService } from 'src/app/service/cinema.service';
import { SalleService } from 'src/app/service/salle.service';

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.css']
})
export class SalleComponent implements OnInit {
  nbSalle:number=0;
  res:number=-1;
  select:boolean=false;
  listSalleByCinema:Salle[];
  salles:Salle[];
  idCinema:number;
  cinema:Cinema;
  @Output() cinemaWasSelected =new EventEmitter<Cinema>();
  public cinemas:Cinema[];
  editSalle: Salle;
  deleteSalle:Salle;

  
  constructor( private cinemaService:CinemaService,private salleService:SalleService) { }

    ngOnInit(): void {
    this.getAllCinemas();
    this.getAllSalles();
    console.log(this.compare(this.res,this.nbSalle))
    }

  public  onCinemaSelected(cinema:Cinema):void{
    this.nbSalle=cinema.nombreSalles;
    this.idCinema=cinema.id;
    this.select=true;
    this.cinema=cinema;
    this.salleService.getSalleByCinema(cinema.id).subscribe(
    (responce:Salle[])=>{
     this.res=responce.length;
      this.listSalleByCinema=responce;
      this.ngOnInit();
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
    },
  );
}


  public getAllCinemas():void{
    this.cinemaService.getCinemas().subscribe(
      (response:Cinema[])=>{
        this.cinemas=response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      });

    }
    
  public  getAllSalles():void {
    this.salleService.getSalles().subscribe(
      (response:Salle[])=>{
      this.salles=response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      });
  
  }

  public onAddSalle(addForm:NgForm):void{
    document.getElementById('add-salle-form').click();
    const values = addForm.value;
    let salle: Salle = {
      nom: values.nom,
      nombrePlace: values.nombrePlace,
      cinema: {
        id: this.idCinema
      }
    };
    console.log(salle);
    this.salleService.addSalle(salle).subscribe(
      (responce:Salle)=>{
        console.log(responce);
        addForm.reset();
        this.onCinemaSelected(this.cinema);
      },
      (error:HttpErrorResponse)=>{  
        alert(error.message);
        addForm.reset();
      },
  
    );
    this.onCinemaSelected(this.cinema);
  }


  public onUpdateSalle(editForm:NgForm):void{
    const values = editForm.value;
    let editSalle: Salle = {
      id:values.id,
      nom: values.nom,
      nombrePlace: values.nombrePlace,
      cinema: {
        id: this.idCinema
      }
    };
    document.getElementById('edit-salle-form').click();
    this.salleService.UpdateSalle(editSalle).subscribe(
      (responce:Salle)=>{
        console.log(responce);
        this.onCinemaSelected(this.cinema);
        },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      },
  
    );
  }
  public onDeleteSalle(idSalle :number){
    document.getElementById('delete-form').click();
    this.salleService.deleteSalle(idSalle).subscribe(
      (responce:void)=>{
        console.log(responce);
        this.onCinemaSelected(this.cinema);
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      },
    
    );
    }





  public onOpenModal(salle: Salle, mode: string): void {
    
    const container = document.getElementById('a55');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addSalleModel');
    }
    if (mode === 'edit') {
      this.editSalle=salle;
      button.setAttribute('data-target', '#updateSalleModel');
    }
    if (mode === 'delete') {
      this.deleteSalle=salle;
      button.setAttribute('data-target', '#deleteSalleModal');
    }
    container.appendChild(button);
    button.click();
  } 


  public searchSalle(key:string):void{
    const resultat:Salle[]=[];
    for(const v of this.salles){
      if(v.nom.toLocaleLowerCase().indexOf(key.toLowerCase())!==-1)
        resultat.push(v);
      }
    this.salles=resultat ;
  }
     compare(x:number,y:number ): boolean{
      if(x>y)
      return false
      else
      return true;
}
  }





