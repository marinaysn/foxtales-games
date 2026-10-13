import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'ft-root',
  template: '<router-outlet />',
})
export class App {}
