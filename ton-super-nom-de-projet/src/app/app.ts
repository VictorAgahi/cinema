import { Component, signal } from '@angular/core';
import { Navbar } from "./navbar/navbar";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer';
import { ToastComponent } from './toast/toast';

@Component({
  selector: 'app-root',
  imports: [Navbar, RouterOutlet, FooterComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('CineMatch');
}
