import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonicModule, RefresherCustomEvent } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{ FormGroup, FormControl, Validators, FormBuilder }from '@angular/forms';
import { Usuario } from '../interface/usuario';
import { UsuarioService } from '../service/usuario.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class HomePage {
  formUsuario: FormGroup;
  isModalOpen = false;
  public gerentes: Usuario[] = [];
  public fGerentes: Usuario[] = [];

  constructor(
    private usrService: UsuarioService,
    public fb: FormBuilder,
  ) {
    this.gerentes = usrService.getGerentes();
    this.fGerentes = this.gerentes;
    //this.formularioLogin=this.fb.group({
    this.formUsuario = this.fb.group({});
  }

  public newUsuario() {
    alert('Entre');
    const hotel = this.formUsuario.controls['hotel'].value;
    const celular = this.formUsuario.controls['celular'].value;

    const defaultUsr = (hotel.replace(/\s/g, "")+'_'+celular.substring(5,9)); 
    this.usrService.newUsuario({
      IdUsuarioOK: defaultUsr,
      IdUsuarioBK: defaultUsr,
      Nombres: this.formUsuario.controls['usr'].value,
      Apellidos: this.formUsuario.controls['usr'].value,
      Hotel: hotel,
      Rol: '2',
      Clave: '',
      CorreoEle: defaultUsr,
      Celular: celular
    });
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }


}
