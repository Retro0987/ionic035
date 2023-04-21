import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {AlertController,IonSearchbar,IonSelect,ModalController,ToastController,} from '@ionic/angular';

import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../interface/usuario';

import{
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
}from '@angular/forms';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.page.html',
  styleUrls: ['./login-admin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class LoginAdminPage implements OnInit {

  formularioLogin: FormGroup;
  public usuarios: Usuario[] = [];

  constructor(
    public fb: FormBuilder,
    private usrService: UsuarioService,
    private alertController: AlertController,
    private toastController: ToastController,
    ) {
      this.usuarios = usrService.getUsuarios();
    this.formularioLogin=this.fb.group({
      'usr': new FormControl("",Validators.required),
      'pwd': new FormControl("",Validators.required)
    })

   }

  ngOnInit() {
  }

  public logIn() {
    
    const usr = this.formularioLogin.controls['usr'].value;
    const pwd = this.formularioLogin.controls['pwd'].value;
   if(!this.usrService.login(usr, pwd)) this.presentToast('Contraseña o usuario incorrecto', 'warning');
   else this.presentToast('Bienvenido', 'success'); 
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
