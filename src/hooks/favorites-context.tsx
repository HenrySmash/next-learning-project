import { useContext } from 'react';

import { FavoritesContext } from 'context/favorites-context';

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }

  return context;
};
