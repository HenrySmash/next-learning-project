'use client';

import {
  Button,
  Card,
  CardBody,
  CardHeader
} from '@nextui-org/react';
import { X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { useFavoritesContext } from 'hooks/favorites-context';
import { Data } from 'types';
import { REMOVE_ITEM } from 'utils/actions';

export default function FavoritesPage() {
  const { state, dispatch } = useFavoritesContext();

  if (state.data.length === 0) {
    return (
      <div className="h-full w-full p-10 text-center min-h-screen">
        <h1>You have no favorite items at the moment.</h1>
        <h3>Consider adding some on the home page!</h3>
      </div>
    );
  }

  return (
    <div className="h-full w-full p-10 grid grid-cols-3 gap-4">
      {state.data.map((item: Data) => (
        <Card key={item.symbol}>
          <CardHeader className="flex justify-end align-center pb-1">
            <Button
              size="sm"
              isIconOnly
              variant="light"
              className="cursor-pointer"
              onClick={() => dispatch({ type: REMOVE_ITEM, payload: { item } })}
            >
              <X />
            </Button>
          </CardHeader>
          <CardBody className="pt-1">
            <div className="flex justify-between items-center pb-8">
              <Link
                color="foreground"
                className="text-large"
                href={`/${item.symbol}`}
              >
                {item.symbol}
              </Link>
              <p className={parseFloat(item.priceChangePercent) > 0 ? 'text-success' : 'text-danger'}>{ `${item.priceChangePercent}%` }</p>
            </div>
            <p className="pb-4">
              Open Price:
              {' '}
              {parseFloat(item.openPrice)}
            </p>
            <p>
              Volume:
              {' '}
              {parseFloat(item.volume)}
            </p>
            <p>
              Close Time:
              {' '}
              {new Date(item.closeTime).toLocaleString()}
            </p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
