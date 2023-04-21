import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home-gerente',
  templateUrl: './home-gerente.page.html',
  styleUrls: ['./home-gerente.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomeGerentePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
