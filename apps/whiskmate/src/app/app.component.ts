import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title } from '../shared/title.component';

@Component({
  selector: 'wm-app',
  imports: [RouterOutlet, Title],
  template: `
    @defer (hydrate never) {
      <wm-title>👨🏻‍🍳 Whiskmate</wm-title>
    }
    <router-outlet />
  `,
})
export class App {}
