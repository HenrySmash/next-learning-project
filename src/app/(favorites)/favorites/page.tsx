'use client';

import { useFavoritesContext } from 'context/favorites-context';
import { Data } from 'types';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
} from '@nextui-org/react';
import { REMOVE_ITEM } from 'utils/actions';

export default function FavoritesPage() {
  const { state, dispatch } = useFavoritesContext();

  return (
    <div className="grid grid-cols-3 gap-4">
      {state.data.map((item: Data) => (
        <Card key={item.symbol}>
          <CardHeader className="flex justify-between align-center">
            <h2>{item.symbol}</h2>
            <Button
              size="sm"
              onClick={() =>
                dispatch({
                  type: REMOVE_ITEM,
                  payload: { symbol: item.symbol },
                })
              }>
              Remove
            </Button>
          </CardHeader>
          <CardBody>
            <p>Volume: {item.volume}</p>
            <p>Close Time: {new Date(item.closeTime).toLocaleString()}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
