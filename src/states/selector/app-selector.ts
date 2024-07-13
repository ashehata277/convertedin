import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from 'src/app/ProductState';

export const appSelector = createFeatureSelector<ProductState>('products');

export const productSelector = createSelector(
  appSelector,
  (state: ProductState) => state
);
export const productSelectorById = (productId: number) =>
  createSelector(appSelector, (state: ProductState) =>
    state.products.find((product) => product.id === productId)
  );
