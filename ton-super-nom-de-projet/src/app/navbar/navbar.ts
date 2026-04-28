import { Component, Input, inject, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TitleCasePipe, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  @Input({ required: true }) title!: string;
  cartService = inject(CartService);
  isCartOpen = signal(false);

  toggleCart() {
    this.isCartOpen.update(v => !v);
  }
}
