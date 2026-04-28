import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../models/movie';
import { CartService } from '../services/cart.service';
import { MoviesApi } from '../services/movies-api';

export enum SwipeDirection {
  LEFT = 'left',
  RIGHT = 'right'
}

@Component({
  selector: 'app-swipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './swipe.html',
  styleUrls: ['./swipe.scss']
})
export class SwipeComponent implements OnInit {
  private cartService = inject(CartService);
  private moviesApi = inject(MoviesApi);

  readonly SwipeDirection = SwipeDirection;
  movies = signal<Movie[]>([]);
  currentIndex = signal(0);
  swipeState = signal<SwipeDirection | null>(null);

  ngOnInit() {
    this.moviesApi.getMovies().subscribe(backendMovies => {
      this.movies.set(backendMovies);
    });
  }

  currentMovie = computed(() => this.movies()[this.currentIndex()]);

  visibleMovies = computed(() => {
    const idx = this.currentIndex();
    const all = this.movies();
    const result = [];
    if (idx + 1 < all.length) result.push(all[idx + 1]);
    if (idx < all.length) result.push(all[idx]);
    return result;
  });

  like() {
    if (this.swipeState()) return;
    this.swipeState.set(SwipeDirection.RIGHT);
    const movie = this.currentMovie();
    if (movie) {
      this.cartService.addToCart(movie);
    }
    this.next();
  }

  dislike() {
    if (this.swipeState()) return;
    this.swipeState.set(SwipeDirection.LEFT);
    this.next();
  }

  private next() {
    this.currentIndex.update(i => i + 1);
    setTimeout(() => this.swipeState.set(null), 0);
  }

  restart() {
    this.currentIndex.set(0);
  }
}
