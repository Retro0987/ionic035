import { Injectable } from '@angular/core';
import { Usuario } from '../interface/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarios: Usuario[] = [];

  constructor() {
    this.usuarios.push({
      IdUsuarioOK: "sanjose_5678",
      IdUsuarioBK: "sanjose_5678",
      Nombres: "Jaime",
      Apellidos: "Robles",
      Hotel: "San Jose",
      Rol: "1",
      Clave: "123",
      CorreoEle: "jaimito@ittepic.edu.mx",
      Celular: "3112345678",
      Generated: false,
      Activo: true
    },{
      IdUsuarioOK: "lahiguera_5678",
      IdUsuarioBK: "lahiguera_5678",
      Nombres: "Hector",
      Apellidos: "Llanos",
      Clave: "456",
      Hotel: "La Higuera",
      Rol: "2",
      CorreoEle: "Hector@ittepic.edu.mx",
      Celular: "3112345678",
      Generated: false,
      Activo: true
    },{
      IdUsuarioOK: "losarroyos_5678",
      IdUsuarioBK: "losarroyos_5678",
      Nombres: "Jared",
      Apellidos: "Zavala",
      Clave: "789",
      Hotel: "Los Arroyos",
      Rol: "2",
      CorreoEle: "Jared@ittepic.edu.mx",
      Celular: "3112345678",
      Generated: false,
      Activo: false
    });

    
  }
  
  public getUsuarios(): Usuario[] {
    return this.usuarios;
  }

  public addUsuario(usr: Usuario) {
    this.usuarios.push(usr);
  }
  
  public updateUsuario(usr: Usuario, i: number) {
    this.usuarios[i] = usr;
  }

  public updateUsrActivo(i: number, valor: boolean) {
    
    this.usuarios[i].Activo = valor;
  }

  public getGerentes(): Usuario[] {
    return this.usuarios.filter(usuario => usuario.Rol == '2');
  }

  public login(usr: string, pwd: string): Usuario|undefined {
    const logUser = this.usuarios.find( elem => { 
      return elem.IdUsuarioBK == usr 
    });    
    return logUser;
  }
}
