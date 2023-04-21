import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

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

  constructor(public fb: FormBuilder) {

    this.formularioLogin=this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    })

   }

  ngOnInit() {
  }

}
