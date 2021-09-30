import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {

  constructor() { }

  public getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      
        case 404: {
            return `Not Found: ${error.message}`;
        }
        case 403: {
            return `Access Denied: ${error.message}`;
        }
        case 500: {
            return `Internal Server Error: ${error.message}`;
        }
        default: {
            return `Connexion serveur fermée. Verifier votre serveur !`;
        }

    }
}
}
