import { Film } from "./film";
import { ProjectionFilm } from "./projectionFilm";
import { User } from "./user";

export interface Ticket {
    id?:number ;
    nombre?:number ;
    codePayement?:number;
    date?:Date;
    admin?:User;
    projection?:ProjectionFilm;
    vu?:boolean;
}