import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IProduct } from '../../utils';

export interface ProductState {
    data: IProduct[]    
}

export const setProductsAction = createCustomAction('product/setProductsAction', (data: ProductState) => ({
  data,
}));

const actions = { setProductsAction };

type Action = ActionType<typeof actions>;

export default function reducer(state: ProductState = {data: []}, action: Action) {
  switch (action.type) {
    case getType(setProductsAction):
      return { ...state, data: action.data };
    default:
      return state;
  }
}