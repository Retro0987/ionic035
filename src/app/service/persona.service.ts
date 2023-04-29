import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../interface/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {


  personas: Persona[] = [];
  constructor() {
    this.personas.push(
      {
        hotel: 'San Jose',
        IdPersonaOK: 'valera5868',
        Nombres: 'Jose Gerardo',
        Apellidos: 'Valera Gomez',
        CorreoEle: 'llanos.wick.7@gmail.com',
        Celular: '3322685868'
      },
      {
        hotel: 'San Jose',
        IdPersonaOK: 'llanos6094',
        Nombres: 'Hector Izcoatl',
        Apellidos: 'Llanos Goody',
        CorreoEle: 'llanos.wick.7@gmail.com',
        Celular: '3112356094'
      }

    );
  }

  public getPersonaByHotel(hotel: string): Persona[] {
    return this.personas.filter( p => p.hotel == hotel);
  }
}
