import {Component, effect, viewChild} from '@angular/core';
import {Rating} from './rating.ng';

@Component({
  selector: 'app-root',
  imports: [Rating],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
