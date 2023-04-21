import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'homeDirector',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login-admin',
    pathMatch: 'full',
  },
  {
    path: 'login-admin',
    loadComponent: () => import('./login-admin/login-admin.page').then( m => m.LoginAdminPage)
  },  {
    path: 'home-gerente',
    loadComponent: () => import('./home-gerente/home-gerente.page').then( m => m.HomeGerentePage)
  },

];

