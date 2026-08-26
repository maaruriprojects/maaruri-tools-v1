import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { Sidebar } from './layout/sidebar/sidebar';
import { LoadingSpinner } from './shared/loading-spinner/loading-spinner';

@Component({
  imports: [RouterOutlet, Header, Footer, Sidebar, LoadingSpinner],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Maaruri Tools');
}
