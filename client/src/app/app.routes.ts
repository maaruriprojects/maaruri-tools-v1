import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { CategoryPage } from './features/category/category-page';
import { ToolShell } from './features/tools/tool-shell/tool-shell';
import { AboutPage } from './features/pages/about-page';
import { ContactPage } from './features/pages/contact-page';
import { OpportunitiesPage } from './features/pages/opportunities-page';

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
    path: 'about',
    component: AboutPage,
    title: 'About Us — Maaruri Tools',
  },
  {
    path: 'contact',
    component: ContactPage,
    title: 'Contact Us — Maaruri Tools',
  },
  {
    path: 'opportunities',
    component: OpportunitiesPage,
    title: 'Opportunities — Maaruri Tools',
  },
  {
    path: ':categorySlug/:toolSlug',
    component: ToolShell,
    title: 'Tool — Maaruri Tools',
  },
  {
    path: ':categorySlug',
    component: CategoryPage,
    title: 'Category — Maaruri Tools',
  },
  { path: '**', redirectTo: '' },
];
