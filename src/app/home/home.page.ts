import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonicModule, RefresherCustomEvent } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{ FormGroup, FormControl, Validators, FormBuilder }from '@angular/forms';

import { IconColor } from '../interface/icon-color';
import { Usuario } from '../interface/usuario';
import { UsuarioService } from '../service/usuario.service';

import {AlertController,IonSearchbar,IonSelect,ModalController,ToastController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class HomePage {

  usrToUpdate: number = 0; //Toma el valor del indice cuando isModalUpdate es verdadero
  validationMessages;
  formUsuario: FormGroup;
  isModalOpen = false;
  isModalUpdate = false;
  public gerentes: Usuario[] = [];
  //public fGerentes: Usuario[] = [];

  constructor(
    private usrService: UsuarioService,
    private fb: FormBuilder,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController,
  ) {
    this.gerentes = this.usrService.getGerentes();

    //HILG: En esta parte definimos los campos de nuestro formulario
    this.formUsuario = this.fb.group({
      'IdUsuarioOK':[],
      'IdUsuarioBK':[],
      'Nombres':["", Validators.required],
      'Apellidos':["",Validators.required],
      'Hotel':["",Validators.required],
      'Rol':[],
      'Clave':[],
      'CorreoEle':["",Validators.compose([
        Validators.required,
        Validators.email
      ])],
      'Celular':["",Validators.compose([
        Validators.required,
        Validators.maxLength(11),
        Validators.minLength(10),
        Validators.pattern('[0-9]*')
      ])],
      'Generated':[],
      'Activo':[]
    });

    //HILG: Aqui definimos los mensajes de error que puedan surgir
      //      al llenar el formulario
    this.validationMessages = {
      'Nombres': [
        {type: 'required', message: 'NOMBRE requerido!'}
      ],
      'Apellidos': [
        {type: 'required', message: 'APELLIDO requerido!'}
      ],
      'Hotel': [
        {type: 'required', message: 'HOTEL requerido!'}
      ],
      'CorreoEle': [
        {type: 'required', message: 'CORREO requerido!'},
        {type: 'email', message: 'FORMATO incorrecto!'}
      ],
      'Celular': [
        {type: 'required', message: 'CELULAR requerido!'},
        {type: 'pattern', message: 'FORMATO incorrecto!'},
        {type: 'maxLength', message: 'LONGITUD invalida!'},
        {type: 'minLength', message: 'LONGITUD invalida!'}
      ]
    }
  }

  //HILG: createUser nos da una contraseña e Id's por default el cual es el hotel mas los ultimos cuatro digitos
    // del celular

  
  private createUser(): Usuario{
    const defaultUsr = (
      this.formUsuario.controls['Hotel'].value.replace(/\s/g, "")+'_'+
      this.formUsuario.controls['Celular'].value.substring(5,9)
    ).toLowerCase(); 
    let userToAdd: Usuario = this.formUsuario.getRawValue();
    userToAdd.IdUsuarioOK = defaultUsr;
    userToAdd.IdUsuarioBK = defaultUsr;
    userToAdd.Rol = '2';
    userToAdd.Clave = defaultUsr;
    userToAdd.Generated = true;
    userToAdd.Activo = true;
    return userToAdd;
  }//HILG

  public addUser() {
    const newUser = this.createUser();
    this.usrService.addUsuario(newUser);
    this.gerentes.push(newUser);
    this.presentToast('Usuario creado exitosamente', 'success');
    this.setOpen(false);
  }

  public updateUsrActivo(i: number, activo: boolean) {
    
    this.gerentes[i].Activo = activo;
    this.usrService.updateUsrActivo(i,activo);
    
    this.presentToast('Estatus modificado exitosamente', 'success');
  }

  public updateUsr() {
    const updatedUsr = this.formUsuario.getRawValue()
    this.usrService.updateUsuario(updatedUsr,this.usrToUpdate);
    this.gerentes[this.usrToUpdate] = updatedUsr;
    this.setOpen(false);
    this.presentToast('Usuario modificado exitosamente', 'success');
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    if (!isOpen && this.isModalUpdate) {
      this.setCloseUpdateModal();
    }
  }

  setCloseUpdateModal(){
    this.usrToUpdate = 0;
    this.isModalUpdate = false;
    this.formUsuario.reset();
  }

  setUpdateOpen(usr: Usuario, i: number) {
    this.isModalUpdate = true;
    this.usrToUpdate = i;
    this.formUsuario.patchValue(usr);
    this.setOpen(true);
  }

  getIconActivo(estatus: boolean): IconColor {
    if(!estatus) return {iconName: 'close-circle', iconColor: 'danger', msj:'INACTIVO'};
    else return {iconName: 'checkmark-circle', iconColor: 'success', msj:'ACTIVO'};
  }

  //PresentToast/ConfirmationDialog


  private async confirmationDialog(
    header: string,
    handler?: Function,
    dismissFunction?: Function
  ) {
    const alert = await this.alertController.create({
      header,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.presentToast('Operación cancelada', 'warning');
          },
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          cssClass: 'primary',
          handler: () => {
            if (handler) handler();
            this.presentToast('Operación realizada', 'success');
          },
        },
      ],
    });
    alert.present();
    alert.onDidDismiss().then((respuesta) => {
      if (dismissFunction) dismissFunction(respuesta);
    });
  }

  private async presentToast(
    message: string,
    color: 'success' | 'danger' | 'warning'
  ) {
    const toast = await this.toastController.create({
      message,
      duration: 500,
      color,
    });
    toast.present();
  }


}
