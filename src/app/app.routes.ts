import { Routes } from '@angular/router';
import { CategoryComponent } from './src/components/category/category.component';
import { PlayerNameComponent } from './src/components/player-name/player-name.component';
import { MainComponent } from './src/components/main/main.component';
import { HomeComponent } from './src/components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'category',
    component: CategoryComponent,
  },
  {
    path: 'player-name',
    component: PlayerNameComponent,
  },
  {
    path: 'main',
    component: MainComponent,
  },
];
