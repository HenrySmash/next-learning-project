import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { DetailsLogo, HeartFilledIcon, HeartOutlineIcon } from '../../assets/icons';
import { Data } from 'types';
import { ADD_ITEM, REMOVE_ITEM } from 'utils/actions';
import { useFavoritesContext } from 'context/favorites-context';

interface TableActionsProps {
  item: Data;
}

export default function TableActions({ item }: TableActionsProps) {
  const { state, dispatch } = useFavoritesContext();
  function AddOrRemoveFavorites(item: Data) {
    if (state.data.some((e: Data) => e.symbol === item.symbol)) {
      dispatch({ type: REMOVE_ITEM, payload: { symbol: item.symbol } });
    } else {
      dispatch({ type: ADD_ITEM, payload: { item } });
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
        onClick={() => AddOrRemoveFavorites(item)}>
        {state.data.some((e: Data) => e.symbol === item.symbol) ? (
          <HeartFilledIcon className="text-red-500" />
        ) : (
          <HeartOutlineIcon className="text-red-500" />
        )}
      </Button>
    </div>
  );
}
