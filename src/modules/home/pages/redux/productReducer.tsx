import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IProduct } from '../../../../models/product';
import { IDeleteParams } from '../../../../models/userData';

export interface ProductState {
  data: IProduct[];
  recordsTotal: number;
  deleteData: IDeleteParams[];
}

export const setProductsAction = createCustomAction('product/setProductsAction', (data: IProduct[]) => ({
  data,
}));

export const setRecordsTotalAction = createCustomAction('product/setRecordsTotal', (recordsTotal: number) => ({
  recordsTotal,
}));

export const setDeleteProductAction = createCustomAction('product/setDeleteProduct', (data: IDeleteParams[]) => ({
  data,
}));

const actions = { setProductsAction, setRecordsTotalAction, setDeleteProductAction };

type Action = ActionType<typeof actions>;

export default function reducer(state: ProductState = { data: [], recordsTotal: 0, deleteData: [] }, action: Action) {
  switch (action.type) {
    case getType(setProductsAction):
      return { ...state, data: action.data };
    case getType(setRecordsTotalAction):
      return { ...state, recordsTotal: action.recordsTotal };
    case getType(setDeleteProductAction):
      return { ...state, data: action.data };
    default:
      return state;
  }
}
