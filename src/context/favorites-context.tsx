'use client';

import React, {
  createContext, ReactNode, useContext, useReducer
} from 'react';

import { Data } from 'types/index';

export const FavoritesContext = createContext<Data[] | undefined>(undefined);
export const FavoritesProvider = ({
  reducer,
  initialState,
  children
}: {
  reducer: any;
  initialState: Data[] | undefined;
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};
export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }

  return context;
};
