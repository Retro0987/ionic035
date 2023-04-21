import { Injectable } from '@angular/core';
import { Usuario } from '../interface/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarios: Usuario[] = [];

  constructor() {
    this.usuarios.push({
      IdUsuarioOK: "1",
      IdUsuarioBK: "Jaime",
      Nombres: "Jaime",
      Apellidos: "Robles",
      Clave: "123",
      CorreoEle: "jaimito@ittepic.edu.mx",
      Celular: "3112345678"
    },{
      IdUsuarioOK: "2",
      IdUsuarioBK: "Hector",
      Nombres: "Hector",
      Apellidos: "Llanos",
      Clave: "456",
      CorreoEle: "Hector@ittepic.edu.mx",
      Celular: "3112345678"
    },{
      IdUsuarioOK: "3",
      IdUsuarioBK: "Jared",
      Nombres: "Jared",
      Apellidos: "Zavala",
      Clave: "789",
      CorreoEle: "Jared@ittepic.edu.mx",
      Celular: "3112345678"
    });

  }
  public getUsuarios(): Usuario[] {
    return this.usuarios;
  }

  public login(usr: string, pwd: string): boolean {
    const logUser = this.usuarios.find( elem => { 
      return elem.IdUsuarioBK == usr 
    });    
    return (logUser?.Clave == pwd);
  }
}
