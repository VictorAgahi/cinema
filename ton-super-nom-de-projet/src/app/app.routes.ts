import { Routes } from '@angular/router';
import { Home } from './home/home';
import { MoviesList } from './movies-list/movies-list';
import { AddMovie } from './add-movie/add-movie';
import { UpdateMovie } from './update-movie/update-movie';
import { SwipeComponent } from './swipe/swipe';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'movies', component: MoviesList },
  { path: 'add-movie', component: AddMovie },
  { path: 'update-movie/:id', component: UpdateMovie },
  { path: 'swipe', component: SwipeComponent }
];
