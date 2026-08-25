import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { CategoryPage } from './features/category/category-page';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Maaruri Tools — Free Online Utility Tools',
  },
  {
    path: 'recent',
    component: Home,
    title: 'Recent Tools — Maaruri Tools',
  },
  {
    path: ':categorySlug',
    component: CategoryPage,
    title: 'Category — Maaruri Tools',
  },
  { path: '**', redirectTo: '' },
];
