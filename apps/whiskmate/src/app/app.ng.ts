import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Layout } from './layout.ng';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, Layout],
  template: `
    <app-layout>
      <router-outlet />
    </app-layout>
  `,
})
export class App {}
