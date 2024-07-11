import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap, catchError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {
  getProducts,
  getProductsFailed,
  getProductSuccess,
} from '../action/app-action';
import { environment } from 'src/environments/environment';

@Injectable()
export class DataEffects {
  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProducts),
      switchMap(() =>
        this.http.get(`${environment.apiUrl}/products?limit=100`).pipe(
          map((data) => getProductSuccess({ payload: data })),
          catchError((error) => of(getProductsFailed({ payload: error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
