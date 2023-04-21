import { Injectable } from '@angular/core';
import { Usuario } from '../interface/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarios: Usuario[] = [];
  private gerentes: Usuario[] = [];

  constructor() {
    this.usuarios.push({
      IdUsuarioOK: "1",
      IdUsuarioBK: "Jaimito",
      Nombres: "Jaime",
      Apellidos: "Robles",
      Hotel: "San Jose",
      Rol: "1",
      Clave: "123",
      CorreoEle: "jaimito@ittepic.edu.mx",
      Celular: "3112345678"
    },{
      IdUsuarioOK: "2",
      IdUsuarioBK: "Llanitos",
      Nombres: "Hector",
      Apellidos: "Llanos",
      Clave: "456",
      Hotel: "La Higuera",
      Rol: "2",
      CorreoEle: "Hector@ittepic.edu.mx",
      Celular: "3112345678"
    },{
      IdUsuarioOK: "3",
      IdUsuarioBK: "Jaredcito",
      Nombres: "Jared",
      Apellidos: "Zavala",
      Clave: "789",
      Hotel: "Los Arroyos",
      Rol: "2",
      CorreoEle: "Jared@ittepic.edu.mx",
      Celular: "3112345678"
    });

    this.gerentes = this.usuarios.filter(usuario => usuario.Rol == '2');
  }
  
  public getUsuarios(): Usuario[] {
    return this.usuarios;
  }

  public newUsuario(usr: Usuario) {
    this.usuarios.push(usr);
  }

  public getGerentes(): Usuario[] {
    return this.gerentes;
  }

  public login(usr: string, pwd: string): Usuario|undefined {
    const logUser = this.usuarios.find( elem => { 
      return elem.IdUsuarioBK == usr 
    });    
    return logUser;
  }
}
