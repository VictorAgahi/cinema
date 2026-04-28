import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { MoviesApi } from '../services/movies-api';
import { Movie } from '../models/movie';
import { DatePipe } from '@angular/common'
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-movies-list',
  imports: [DatePipe, RouterLink],
  templateUrl: './movies-list.html',
  styleUrl: './movies-list.scss',
})
export class MoviesList implements OnInit {
  private readonly moviesApi = inject(MoviesApi)
  private readonly destroyRef = inject(DestroyRef)
  
  movies: Movie[] = [];

  ngOnInit(): void {
    this.moviesApi.getMovies().subscribe(movies => this.movies = movies);
  }

  deleteMovie(id: number | undefined): void {
    if (id === undefined) return;
    this.moviesApi.deleteMovie(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => 
        this.movies = this.movies.filter(film => film.id !== id)
    );
  }
}
