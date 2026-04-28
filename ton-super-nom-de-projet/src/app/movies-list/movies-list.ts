import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MoviesApi } from '../services/movies-api';
import { ToastService } from '../services/toast.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movies-list',
  imports: [DatePipe, RouterLink],
  templateUrl: './movies-list.html',
  styleUrl: './movies-list.scss',
})
export class MoviesList implements OnInit {
  private readonly moviesApi  = inject(MoviesApi);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toast      = inject(ToastService);

  movies: Movie[] = [];

  ngOnInit(): void {
    this.moviesApi.getMovies().subscribe(movies => this.movies = movies);
  }

  deleteMovie(id: number | undefined): void {
    if (id === undefined) return;
    this.moviesApi.deleteMovie(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.movies = this.movies.filter(film => film.id !== id);
        this.toast.success('Film supprimé');
      },
      error: () => this.toast.error('Erreur lors de la suppression'),
    });
  }
}
