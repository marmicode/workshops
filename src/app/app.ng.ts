import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <h1>Welcome to Whiskmate</h1>
    <router-outlet />
    <hr />
    <footer>
      <p>Powered by Angular</p>
      <a routerLink="/cart">Go to cart</a>
      <hr />
      <a href="https://coobkook.marmicode.io">Learn more</a>
    </footer>
  `,
})
export class AppComponent {}
