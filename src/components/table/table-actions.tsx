import { Button } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

import { useFavoritesContext } from 'hooks/favorites-context';
import { Data } from 'types';
import { ADD_ITEM, REMOVE_ITEM } from 'utils/actions';

import { DetailsLogo, HeartFilledIcon, HeartOutlineIcon } from '../../assets/icons';

interface TableActionsProps {
  item: Data;
}

export default function TableActions({ item }: TableActionsProps) {
  const { state, dispatch } = useFavoritesContext();

  function AddOrRemoveFavorites(favoriteItem: Data) {
    if (state.data.some((e: Data) => e.symbol === favoriteItem.symbol)) {
      dispatch({ type: REMOVE_ITEM, payload: { item: favoriteItem } });
    } else {
      dispatch({ type: ADD_ITEM, payload: { item: favoriteItem } });
    }
  }

  return (
    <div className="relative flex justify-center items-center gap-2">
      <Link href={`/${item.symbol}`}>
        <Button isIconOnly size="sm" variant="light">
          <DetailsLogo className="text-default-300" />
        </Button>
      </Link>
      <Button
        isIconOnly
        size="sm"
        variant="light"
        onClick={() => AddOrRemoveFavorites(item)}
      >
        {state.data.some((e: Data) => e.symbol === item.symbol) ? (
          <HeartFilledIcon className="text-danger" />
        ) : (
          <HeartOutlineIcon className="text-danger" />
        )}
      </Button>
    </div>
  );
}
