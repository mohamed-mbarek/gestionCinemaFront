import { Time } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Seance } from '../model/seance';
import { SeanceService } from '../service/seance.service';

@Component({
  selector: 'app-seance',
  templateUrl: './seance.component.html',
  styleUrls: ['./seance.component.css']
})
export class SeanceComponent implements OnInit {

  seances: Seance[];
  editSeance: Seance;
  deleteSeance: Seance;
  aletSuccess: boolean;
  aletEroor: boolean;
  message: string;

  constructor(private seanceService: SeanceService) { }

  ngOnInit(): void {
    this.getAllSeances();
    setTimeout(() => {                           //<<<---using ()=> syntax
      this.aletSuccess = false;
    }, 70000);
    setTimeout(() => {                           //<<<---using ()=> syntax
      this.aletEroor = false;
    }, 70000);
  }

  public getAllSeances(): void {
    this.seanceService.getSeances().subscribe(
      (response: Seance[]) => {
        this.seances = response;
      },
      (error: HttpErrorResponse) => {
        this.aletEroor = true;
        this.message = '  ne peut pas obtenir toutes les séances';
      });

  }




  public onAddSeance(addForm: NgForm): void {

    document.getElementById('add-seance-form').click();
    console.log(addForm.value);
    this.seanceService.addSeance(addForm.value).subscribe(
      (responce: Seance) => {
        console.log(responce);
        addForm.reset();
        this.ngOnInit();
        this.aletSuccess = true;
        this.message = 'Séance ajouter avec succès ';

      },
      (error: HttpErrorResponse) => {
        this.aletEroor = true;
        this.message = ' aucune séance ajouter réessayer une autre fois';
        addForm.reset();
      },

    );

  }


  public onUpdateSeance(seance: Seance): void {
    document.getElementById('fermer-seance').click();
    this.seanceService.UpdateSeance(seance).subscribe(
      (responce: Seance) => {
        console.log(responce);
        this.ngOnInit();
        this.aletSuccess = true;
        this.message = 'Ville modifier avec succès ';
      },
      (error: HttpErrorResponse) => {
        this.aletEroor = true;
        this.message = ' Aucune modification effectuée ';
      },

    );
  }
  public onDeleteSeance(idSeance: number) {
    document.getElementById('delete-form').click();
    this.seanceService.deleteSeance(idSeance).subscribe(
      (responce: void) => {
        console.log(responce);
        this.ngOnInit();
        this.aletSuccess = true;
        this.message = 'Ville supprimer avec succès ';
      },
      (error: HttpErrorResponse) => {
        this.aletEroor = true;
        this.message = ' Aucune suppression effectuée ';
      },

    );
  }

  public searchSeance(key: number): void {
    const resultat: Seance[] = [];
    for (const v of this.seances) {
      if (v.id == key)
        resultat.push(v);
    }
    this.seances = resultat;
  }



  public onOpenModal(seance: Seance, mode: string): void {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addSeanceModel');

    }
    if (mode === 'edit') {
      this.editSeance = seance;
      button.setAttribute('data-target', '#updateSeanceModal');
    }
    if (mode === 'delete') {
      this.deleteSeance = seance;
      button.setAttribute('data-target', '#deleteSeanceModal');
    }
    container.appendChild(button);
    button.click();
  }


}
