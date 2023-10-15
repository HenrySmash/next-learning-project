'use client';

import React, {
  createContext, ReactNode, useMemo, useReducer
} from 'react';

import { FavoritesContextType, State } from 'types/index';

import reducer from '../utils/reducer';

const defaultInitialState: State = { data: [] };

export const FavoritesContext = createContext<FavoritesContextType>({
  state: defaultInitialState,
  dispatch: () => {}
});

export const FavoritesProvider = ({
  initialState,
  children
}: {
  initialState: State;
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({
    state,
    dispatch
  }), [state]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
