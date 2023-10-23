import React from 'react';

import { Details } from 'components/details';
import { DetailsWrapper } from 'components/details/wrapper';
import { Data } from 'types';

interface Props {
  params: { symbol: string };
}

export default async function ItemPage({ params }: Props) {
  const data: Data[] = await fetch('https://data-api.binance.vision/api/v3/ticker/24hr').then(
    (res) => res.json() as Promise<Data[]>
  );
  const item = data.find((value : Data) => value.symbol === params.symbol)!;

  return (
    <>
      <div className="flex justify-center text-center mt-6">
        <h1>{item?.symbol}</h1>
      </div>
      <section className="p-12">
        <h3>
          Price Information
        </h3>
        <hr />
        <DetailsWrapper className="mt-5">
          <Details label="Price Change" content={parseFloat(item.priceChange)} />
          <Details label="Price Change Percent" content={parseFloat(item.priceChangePercent)} />
          <Details label="Weighted Average Price" content={parseFloat(item.weightedAvgPrice)} />
          <Details label="Previous Close Price" content={parseFloat(item.prevClosePrice)} />
          <Details label="Last Price" content={parseFloat(item.lastPrice)} />
          <Details label="Last Quantity" content={parseFloat(item.lastQty)} />
        </DetailsWrapper>
        <h3>
          Order Book Information
        </h3>
        <hr />
        <DetailsWrapper className="mt-5">
          <Details label="Bid Price" content={parseFloat(item.bidPrice)} />
          <Details label="Bid Quantity" content={parseFloat(item.bidQty)} />
          <Details label="Ask Price" content={item.askPrice} />
          <Details label="Ask Quantity" content={parseFloat(item.askQty)} />
        </DetailsWrapper>
        <h3>
          Market Summary
        </h3>
        <hr />
        <DetailsWrapper className="mt-5">
          <Details label="Open Price" content={parseFloat(item.openPrice)} />
          <Details label="High Price" content={parseFloat(item.highPrice)} />
          <Details label="Low Price" content={item.lowPrice} />
          <Details label="Quote Volume" content={parseFloat(item.quoteVolume)} />
        </DetailsWrapper>
        <h3>
          Trade Information
        </h3>
        <hr />
        <DetailsWrapper className="mt-5">
          <Details label="Open Time" content={new Date(item.openTime).toLocaleString()} />
          <Details label="Close Time" content={new Date(item.closeTime).toLocaleString()} />
          <Details label="First ID" content={item.firstId} />
          <Details label="Last ID" content={item.lastId} />
          <Details label="Count" content={item.count} />
        </DetailsWrapper>
      </section>
    </>
  );
}
