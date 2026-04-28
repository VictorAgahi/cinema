import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MoviesApi } from '../services/movies-api';
import { ToastService } from '../services/toast.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-add-movie',
  imports: [FormsModule],
  templateUrl: './add-movie.html',
  styleUrl: './add-movie.scss',
})
export class AddMovie {
  private readonly moviesApi = inject(MoviesApi);
  private readonly router    = inject(Router);
  private readonly toast     = inject(ToastService);

  movie: Movie = {
    title: '',
    director: '',
    releaseDate: new Date(),
    synopsis: '',
    id: undefined,
    rate: undefined,
    image: undefined,
  };

  addMovie(): void {
    this.moviesApi.addMovie(this.movie).subscribe({
      next: () => {
        this.toast.success('Film ajouté avec succès');
        this.router.navigate(['/movies']);
      },
      error: () => this.toast.error('Erreur lors de l\'ajout du film'),
    });
  }
}
