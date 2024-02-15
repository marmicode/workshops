import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
  <h1>Welcome</h1>
  <router-outlet/>
  <hr>
  <ul>
    <li><a routerLink="/">Landing</a></li>
    <li><a routerLink="/recipe/rec-burger">Burger</a></li>
    <li><a routerLink="/recipe/rec-salad">Salad</a></li>
  </ul>
  `
})
export class AppComponent {
}
