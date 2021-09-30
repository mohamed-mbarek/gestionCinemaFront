    import { ProjectionFilm } from "./projectionFilm";
import { User } from "./user";

export interface Commentaire{
    id?:number;
    date?:Date;
    vu?:boolean;
    commentaire?:string;
    projectionFilm?:ProjectionFilm;
    admin?:User;
}