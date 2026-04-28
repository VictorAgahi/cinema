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
  private readonly cartService = inject(CartService);
  private readonly moviesApi  = inject(MoviesApi);

  readonly SwipeDirection = SwipeDirection;
  movies       = signal<Movie[]>([]);
  currentIndex = signal(0);
  swipeState   = signal<SwipeDirection | null>(null);

  currentMovie = computed(() => this.movies()[this.currentIndex()]);

  ngOnInit() {
    this.moviesApi.getMovies().subscribe(m => this.movies.set(m));
  }

  like() {
    if (this.swipeState()) return;
    this.swipeState.set(SwipeDirection.RIGHT);
    const movie = this.currentMovie();
    if (movie) this.cartService.addToCart(movie);
    setTimeout(() => this.next(), 450);
  }

  dislike() {
    if (this.swipeState()) return;
    this.swipeState.set(SwipeDirection.LEFT);
    setTimeout(() => this.next(), 450);
  }

  private next() {
    this.currentIndex.update(i => i + 1);
    this.swipeState.set(null);
  }

  restart() {
    this.currentIndex.set(0);
  }
}
