import { Component, inject, signal, computed } from '@angular/core';
import { MoviesApi } from '../services/movies-api';
import { toSignal } from '@angular/core/rxjs-interop';
import { Movie } from '../models/movie';
import { MovieCard } from './movie-card/movie-card';
import { FormsModule } from '@angular/forms';

export type SortType = 'title' | 'date' | 'rate';

@Component({
  selector: 'app-home',
  imports: [MovieCard, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly moviesApi = inject(MoviesApi);
  private readonly movies$ = this.moviesApi.getMovies();
  
  movies = toSignal(this.movies$, { initialValue: [] as Movie[] });
  sortType = signal<SortType>('title');

  sortedMovies = computed(() => {
    const moviesList = [...this.movies()];
    const type = this.sortType();

    return moviesList.sort((a, b) => {
      if (type === 'title') {
        return a.title.localeCompare(b.title);
      } else if (type === 'date') {
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      } else if (type === 'rate') {
        return (b.rate || 0) - (a.rate || 0);
      }
      return 0;
    });
  });
}
