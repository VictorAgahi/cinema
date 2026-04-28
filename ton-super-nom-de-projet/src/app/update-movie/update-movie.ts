import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesApi } from '../services/movies-api';
import { ToastService } from '../services/toast.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-update-movie',
  imports: [FormsModule],
  templateUrl: './update-movie.html',
  styleUrl: './update-movie.scss',
})
export class UpdateMovie implements OnInit {
  private readonly route     = inject(ActivatedRoute);
  private readonly router    = inject(Router);
  private readonly moviesApi = inject(MoviesApi);
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
    this.moviesApi.updateMovie(this.movie).subscribe({
      next: () => {
        this.toast.success('Film modifié avec succès');
        this.router.navigate(['/movies']);
      },
      error: () => this.toast.error('Erreur lors de la modification du film'),
    });
  }
}
