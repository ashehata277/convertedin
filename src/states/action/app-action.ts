import { createAction, props } from '@ngrx/store';

export const getProducts = createAction('[products] Get Products');
export const getProductSuccess = createAction(
  '[products] Get ProductSuccess',
  props<{ payload: any }>()
);
export const getProductsFailed = createAction(
  '[products] Get ProductFailed',
  props<{ payload: any }>()
);
