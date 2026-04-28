import { Component, Input, inject, signal } from '@angular/core';
import { TitleCasePipe, NgIf, NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TitleCasePipe, RouterLink, RouterLinkActive, NgIf, NgFor],
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
