import { createReducer, on } from '@ngrx/store';
import { ProductState } from 'src/app/ProductState';
import {
  getProducts,
  getProductsFailed,
  getProductSuccess,
} from '../action/app-action';
import { initialState } from '../app-state';

export const productsReducer = createReducer(
  initialState,
  on(getProducts, (state: ProductState) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(getProductSuccess, (state: ProductState, { payload }) => {
    return {
      ...state,
      ...payload,
      loading: false,
    };
  }),
  on(getProductsFailed, (state: ProductState) => {
    return {
      ...state,
      loading: false,
    };
  })
);
