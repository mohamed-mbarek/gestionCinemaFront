import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { CinemaComponent } from './cinema/cinema.component';
import { VilleComponent } from './ville/ville.component';
import { VilleService } from './service/ville.service';
import { AppRoutingModule } from './app-routing.module';
import { CinemaService } from './service/cinema.service';
import { CategoryFilmComponent } from './category-film/category-film.component';
import { CategorieService } from './service/cetegory.service';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './login/users/users.component';
import { ErreurComponent } from './erreuHttp/erreur/erreur.component';
import { SalleComponent } from './cinema/salle/salle.component';
import { ListCinemaComponent } from './cinema/list-cinema/list-cinema.component';
import { ProjectionFilmComponent } from './projection-film/projection-film.component';
import { SeanceComponent } from './seance/seance.component';
import { MenuComponent } from './menu/menu.component';
import { AfficheComponent } from './menu/affiche/affiche.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AcueilComponent } from './acueil/acueil.component';
import { ContactComponent } from './contact/contact.component';
import { ReclamationComponent } from './contact/boite-reclamation/reclamation.component';
import { DetailFilmComponent } from './acueil/detail-film/detail-film.component';
import { NotificationAdminComponent } from './listReservation/notification-admin.component';
import { CommentaireService } from './service/commentaire.service';
import { CommentaireComponent } from './commentaire/commentaire.component';
import { HistoriqueComponent } from './historique/historique.component';
import { Erreu500Component } from './erreuHttp/erreu500/erreu500.component';
import { FilmComponent } from './film/film.component';
import { GestionAfiicheComponent } from './gestion-afiiche/gestion-afiiche.component';
import { CinemasComponent } from './acueil/cinemas/cinemas.component';
import { UserCompteComponent } from './login/user-compte/user-compte.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CinemaComponent,
    VilleComponent,
    CategoryFilmComponent,
    LoginComponent,
    UsersComponent,
    ErreurComponent,
    SalleComponent,
    ListCinemaComponent,
    FilmComponent,
    ProjectionFilmComponent,
    SeanceComponent,
    AfficheComponent,
    MenuComponent,
    GestionAfiicheComponent,
    AcueilComponent,
    ContactComponent,
    ReclamationComponent,
    DetailFilmComponent,
    NotificationAdminComponent,
    CommentaireComponent,
    HistoriqueComponent,
    Erreu500Component,
    CinemasComponent,
    UserCompteComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [VilleService,CinemaService ,CategorieService,CommentaireService
],
  bootstrap: [AppComponent,FilmComponent]
})
export class AppModule { }
