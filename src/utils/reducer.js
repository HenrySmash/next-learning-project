'use client';
import { ADD_ITEM, REMOVE_ITEM } from './actions';

const reducer = (state, action) => {
  if (action.type === ADD_ITEM) {
    return { ...state, data: [...state.data, action.payload.item] };
  }

  if (action.type === REMOVE_ITEM) {
    const filteredList = state.data.filter(
      (item) => item.symbol !== action.payload.symbol
    );
    return { ...state, data: filteredList };
  }

  // return state;
  throw new Error(`No matching "${action.type}" - action type`);
};

export default reducer;
