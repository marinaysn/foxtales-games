import { Routes } from '@angular/router';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'bingo',
    loadComponent: () => import('./games/bingo/ui/bingo-page/bingo-page').then((module) => module.BingoPage),
  },
  {
    path: 'bingo/levels',
    loadComponent: () => import('./games/bingo/ui/bingo-levels/bingo-levels').then((module) => module.BingoLevels),
  },
];
