import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AfficheComponent } from "./menu/affiche/affiche.component";
import { CinemaComponent } from "./cinema/cinema.component";
import { SalleComponent } from "./cinema/salle/salle.component";
import { ErreurComponent } from "./erreuHttp/erreur/erreur.component";
import { LoginComponent } from "./login/login.component";
import { UsersComponent } from "./login/users/users.component";
import { ProjectionFilmComponent } from "./projection-film/projection-film.component";
import { SeanceComponent } from "./seance/seance.component";
import { SecuriteGuard } from "./securite/securite.guard";
import { VilleComponent } from "./ville/ville.component";
import { AcueilComponent } from "./acueil/acueil.component";
import { ContactComponent } from "./contact/contact.component";
import { ReclamationComponent } from "./contact/boite-reclamation/reclamation.component";
import { DetailFilmComponent } from "./acueil/detail-film/detail-film.component";
import { NotificationAdminComponent } from "./listReservation/notification-admin.component";
import { CommentaireComponent } from "./commentaire/commentaire.component";
import { HistoriqueComponent } from "./historique/historique.component";
import { FilmComponent } from "./film/film.component";
import { Erreu500Component } from "./erreuHttp/erreu500/erreu500.component";
import { GestionAfiicheComponent } from "./gestion-afiiche/gestion-afiiche.component";
import { CategoryFilmComponent } from "./category-film/category-film.component";
import { CinemasComponent } from "./acueil/cinemas/cinemas.component";
import { AdminInterfaceGuard } from "./securite/admin-interface.guard";
import { ConecterGuard } from "./securite/conecter.guard";
import { UserCompteComponent } from "./login/user-compte/user-compte.component";

const appRoutes:Routes=[
    {path :'oasisCinema',component:AfficheComponent},
    {path :'',component:AfficheComponent},
    {path :'Films',component:AcueilComponent },
    
    {path :'Films/:id',component:DetailFilmComponent},
    {path :'contact',component:ContactComponent},
    {path :'Blog',component:CinemasComponent},
    {path :'historique',component:HistoriqueComponent ,canActivate:[ConecterGuard] },
    {path :'compte',component:UserCompteComponent ,canActivate:[ConecterGuard] },
    {path :'reclamation',component:ReclamationComponent ,canActivate:[AdminInterfaceGuard]},
    {path :'listReservation',component:NotificationAdminComponent ,canActivate:[AdminInterfaceGuard]},
    { path:'adminVille' ,component :VilleComponent ,canActivate:[AdminInterfaceGuard]},
    { path:'adminAffiche' ,component :GestionAfiicheComponent ,canActivate:[AdminInterfaceGuard]},
    { path:'adminCinema' ,component :CinemaComponent,canActivate:[AdminInterfaceGuard]},
    { path:'commentaires' ,component :CommentaireComponent,canActivate:[AdminInterfaceGuard]},
    {path :'adminCategoryFilm',component:CategoryFilmComponent,canActivate:[AdminInterfaceGuard]},
    {path :'listSalle',component:SalleComponent,canActivate:[AdminInterfaceGuard]},
    {path :'adminFilm',component:FilmComponent,canActivate:[AdminInterfaceGuard]},
    {path :'listSeance',component:SeanceComponent,canActivate:[AdminInterfaceGuard]},
    {path :'adminProjectionFilm',component:ProjectionFilmComponent,canActivate:[AdminInterfaceGuard]},
    {path:'login' ,component :LoginComponent},
    {path : "gestionComptes", component : UsersComponent, canActivate:[SecuriteGuard]},    
    {path:"erreu-404",component:ErreurComponent},
    {path:"erreu-500",component:Erreu500Component},

];

@NgModule({
imports: [RouterModule.forRoot(appRoutes)],
exports :[RouterModule]
})
export class AppRoutingModule{


}