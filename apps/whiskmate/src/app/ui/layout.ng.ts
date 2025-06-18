import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <h1>Welcome to Whiskmate!</h1>
    <ng-content select="[slot=header]" />
    <ng-content />
    <footer>
      <ng-content select="[slot=footer]"></ng-content>
    </footer>
  `,
})
export class Layout {}
