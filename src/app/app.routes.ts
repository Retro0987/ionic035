import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'message/:id',
    loadComponent: () =>
      import('./view-message/view-message.page').then((m) => m.ViewMessagePage),
  },
  {
    path: '',
    redirectTo: 'login-admin',
    pathMatch: 'full',
  },
  {
    path: 'login-admin',
    loadComponent: () => import('./login-admin/login-admin.page').then( m => m.LoginAdminPage)
  },
];

