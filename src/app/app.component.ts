import { Component } from '@angular/core';
import { ProductState } from './ProductState';
import { Store } from '@ngrx/store';
import { interval, switchMap } from 'rxjs';
import { getProducts } from 'src/states/action/app-action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private store: Store<ProductState>) {
    interval(900000)
      .pipe(
        switchMap(() => {
          this.store.dispatch(getProducts());
          return [];
        })
      )
      .subscribe();
    this.store.dispatch(getProducts());
  }
}
