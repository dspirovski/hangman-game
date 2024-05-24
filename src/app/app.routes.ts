import { Routes } from '@angular/router';
import { CategoryComponent } from './src/components/category/category.component';
import { MainComponent } from './src/components/main/main.component';
import { HomeComponent } from './src/components/home/home.component';
import { HowToPlay } from './src/components/how-to-play/how-to-play.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'category',
    component: CategoryComponent,
  },
  {
    path: 'how-to-play',
    component: HowToPlay,
  },
  {
    path: 'main',
    component: MainComponent,
  },
];
