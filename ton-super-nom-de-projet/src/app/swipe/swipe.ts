import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../models/movie';
import { CartService } from '../services/cart.service';
import { MoviesApi } from '../services/movies-api';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-swipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './swipe.html',
  styleUrls: ['./swipe.scss'],
  animations: [
    trigger('swipe', [
      state('left', style({
        transform: 'translateX(-200%) rotate(-30deg)',
        opacity: 0
      })),
      state('right', style({
        transform: 'translateX(200%) rotate(30deg)',
        opacity: 0
      })),
      transition('* => left', [
        animate('0.5s ease-out')
      ]),
      transition('* => right', [
        animate('0.5s ease-out')
      ])
    ])
  ]
})
export class SwipeComponent implements OnInit {
  private cartService = inject(CartService);
  private moviesApi = inject(MoviesApi);

  movies = signal<Movie[]>([]);
  currentIndex = signal(0);
  swipeState = signal<'left' | 'right' | null>(null);

  ngOnInit() {
    this.moviesApi.getMovies().subscribe(backendMovies => {
      this.movies.set(backendMovies);
    });
  }

  get currentMovie() {
    return this.movies()[this.currentIndex()];
  }

  get currentMovieImageUrl() {
    const movie = this.currentMovie;
    if (!movie || !movie.id) return '';
    return `http://localhost:8080/movies/${movie.id}/image`;
  }

  like() {
    if (this.swipeState()) return;
    this.swipeState.set('right');
    setTimeout(() => {
      const movie = this.currentMovie;
      if (movie) {
        this.cartService.addToCart(movie);
      }
      this.next();
    }, 500);
  }

  dislike() {
    if (this.swipeState()) return;
    this.swipeState.set('left');
    setTimeout(() => {
      this.next();
    }, 500);
  }

  private next() {
    this.swipeState.set(null);
    this.currentIndex.update(i => i + 1);
  }

  restart() {
    this.currentIndex.set(0);
  }
}
