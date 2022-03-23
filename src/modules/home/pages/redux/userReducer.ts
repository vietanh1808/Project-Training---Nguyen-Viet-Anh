import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IDeleteUserParams, IUsersParams } from '../../../../models/userData';

export interface UsersState {
  data: IUsersParams[];
  recordsTotal: number;
  deleteData: IDeleteUserParams[];
}

export const setUsersAction = createCustomAction('user/setUsersAction', (data: IUsersParams[]) => ({
  data,
}));

export const setRecordsTotalAction = createCustomAction('user/setRecordsTotal', (recordsTotal: number) => ({
  recordsTotal,
}));

export const setDeleteUserAction = createCustomAction('user/setDeleteUser', (data: IDeleteUserParams[]) => ({
  data,
}));

const actions = { setUsersAction, setRecordsTotalAction, setDeleteUserAction };

type Action = ActionType<typeof actions>;

export default function reducer(state: UsersState = { data: [], recordsTotal: 0, deleteData: [] }, action: Action) {
  switch (action.type) {
    case getType(setUsersAction):
      return { ...state, data: action.data };
    case getType(setRecordsTotalAction):
      return { ...state, recordsTotal: action.recordsTotal };
    case getType(setDeleteUserAction):
      return { ...state, data: action.data };
    default:
      return state;
  }
}
