import { CommonModule } from '@angular/common';
import { OnInit, Component, inject, ViewChild, NgModule } from '@angular/core';
import { IonicModule, RefresherCustomEvent } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{ FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl }from '@angular/forms';
import { Router, ActivatedRoute, Routes } from '@angular/router';

import { IconColor } from '../interface/icon-color';
import { Usuario } from '../interface/usuario';
import { UsuarioService } from '../service/usuario.service';
import { Persona } from '../interface/persona';
import { PersonaService } from '../service/persona.service';

import {AlertController,IonSearchbar,IonSelect,ModalController,ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home-gerente',
  templateUrl: './home-gerente.page.html',
  styleUrls: ['./home-gerente.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class HomeGerentePage implements OnInit {
  validationMessages;
  formUno: FormGroup;
  enabled: boolean = false;
  admin?: Usuario;

  empleados: Persona[] = [];

  constructor(
    private usrService: UsuarioService,
    private prsService: PersonaService,
    private fb: FormBuilder,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    this.formUno = fb.group({
      'uno': ["",Validators.compose([Validators.required,Validators.minLength(8)])],
      'dos': ["",Validators.compose([Validators.required,Validators.minLength(8)])]
    });

    this.validationMessages = {
      'uno': [
        {type: 'minLength', message: 'Contraseña insegura!'},
        {type: 'required', message: 'Contraseña requerida!'}
        
      ],
      'dos': [
        {type: 'required', message: 'Contraseña requerida!'},
        {type: 'minLength', message: 'Contraseña insegura!'}
      ]
    }
      

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
       this.admin = this.usrService.findUsrByIdBK(params.get('id')+'');
       if(this.admin?.Rol=='1') {
        this.enabled = true;
        this.empleados = this.prsService.getPersonaByHotel(this.admin.Hotel);
      }
      }else this.enabled = false;
    });
  }

  changePwd() {
    if (this.formUno.controls['uno'].value != this.formUno.controls['dos'].value) alert('No coinciden las contraseñas');
    else {
      if(this.admin?.Clave){
        this.admin.Clave = this.formUno.controls['uno'].value;
        this.admin.Generated = false;
      } 
    }
  }

}
