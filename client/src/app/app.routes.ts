import { Routes } from '@angular/router';
import { Home } from './features/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Maaruri Tools — Free Online Utility Tools',
  },
  { path: '**', redirectTo: '' },
];
