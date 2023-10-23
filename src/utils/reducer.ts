import { ActionPayload, Data, State } from 'types/index';

import { ADD_ITEM, REMOVE_ITEM } from './actions';

export default function reducer(state: State, action: ActionPayload): State {
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, data: [...state.data, action.payload.item] };
    case REMOVE_ITEM:
      return {
        ...state,
        data: state.data.filter(
          (item: Data) => item.symbol !== action.payload.item.symbol
        )
      };
    default:
      throw new Error(`No matching "${action.type}" - action type`);
  }
}
