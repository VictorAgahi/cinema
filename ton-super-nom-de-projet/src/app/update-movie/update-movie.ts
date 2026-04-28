import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesApi } from '../services/movies-api';
import { Movie } from '../models/movie';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-movie',
  imports: [FormsModule],
  templateUrl: './update-movie.html',
  styleUrl: './update-movie.scss',
})
export class UpdateMovie implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly moviesApi = inject(MoviesApi);

  movie: Movie = {
    title: '',
    director: '',
    releaseDate: new Date(),
    synopsis: '',
    id: undefined,
    rate: undefined,
    image: undefined
  };

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.moviesApi.getMovie(id).subscribe(movie => {
        this.movie = movie;
        if (this.movie.releaseDate) {
          this.movie.releaseDate = new Date(this.movie.releaseDate);
        }
      });
    }
  }

  updateMovie(): void {
    this.moviesApi.updateMovie(this.movie).subscribe(() => {
      this.router.navigate(['/movies']);
    });
  }
}
