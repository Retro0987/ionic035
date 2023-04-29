import { CommonModule } from '@angular/common';
import { Injectable,Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interface/usuario';

import base from './api';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  url = base+/Usuario/;

  private usuarios: Usuario[] = [];

  constructor() {
    this.usuarios.push({
      IdUsuarioOK: "sanjose_5678",
      IdUsuarioBK: "jaime",
      Nombres: "Jaime",
      Apellidos: "Robles",
      Hotel: "San Jose",
      Rol: "2",
      Clave: "123",
      CorreoEle: "jaimito@ittepic.edu.mx",
      Celular: "3112345678",
      Generated: false,
      Activo: true
    },{
      IdUsuarioOK: "lahiguera_5678",
      IdUsuarioBK: "llanos",
      Nombres: "Hector",
      Apellidos: "Llanos",
      Clave: "123",
      Hotel: "La Higuera",
      Rol: "1",
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
  
  public updateUsuario(usr: Usuario) {
    this.usuarios[this.findUsrIndex(usr)] = usr;
  }

  public deleteUsr(usr: Usuario) {
    this.usuarios.splice(this.findUsrIndex(usr),1);
  }

  public updateUsrActivo(usr: Usuario, valor: boolean) {
    this.usuarios[this.findUsrIndex(usr)].Activo = valor;
  }

  private findUsrIndex(usr: Usuario): number {
    return this.usuarios.findIndex( u => u.IdUsuarioOK == usr.IdUsuarioOK );
  }

  public findUsrByIdBK(IdUsuarioOK: string): Usuario|undefined {
    return this.usuarios.find( usr => usr.IdUsuarioBK == IdUsuarioOK);
  }

  public findUsrByIndexBK(IdUsuarioOK: string): Usuario {
    return this.usuarios[this.usuarios.findIndex( u => u.IdUsuarioOK == IdUsuarioOK )];
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
