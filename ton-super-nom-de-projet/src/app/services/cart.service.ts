import { Injectable, signal } from '@angular/core';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = signal<Movie[]>([]);

  readonly items = this.cartItems.asReadonly();

  addToCart(movie: Movie) {
    this.cartItems.update((items) => [...items, movie]);
  }

  removeFromCart(movieId: number) {
    this.cartItems.update((items) => items.filter((item) => item.id !== movieId));
  }

  clearCart() {
    this.cartItems.set([]);
  }

  get count() {
    return this.cartItems().length;
  }
}
