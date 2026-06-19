import { Component, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { Title } from './title/title';
import { Body } from './body/body';
import { Footer } from './footer/footer';
import { CommonModule } from '@angular/common';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,  // ✅ only the outlet for pages
    Title,
    Body,
    Footer        // ✅ shared layout components only
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnDestroy {
  isHome = true;
  private sub: Subscription;

  constructor(private router: Router) {
    this.sub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log(`navigated to ${event.urlAfterRedirects}`);
        this.isHome = event.urlAfterRedirects === '/' || event.urlAfterRedirects === '';
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}