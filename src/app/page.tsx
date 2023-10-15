import React from 'react';

import { Data } from 'types';
import { OrderBy } from 'utils/enums';

import TableWrapper from './(main)';

const getData = async (): Promise<Data[]> => {
  const response = await fetch('https://data-api.binance.vision/api/v3/ticker/24hr');
  const apiData = await response.json() as Data[];

  return apiData;
};

export default async function Home() {
  const orderBy = OrderBy.ALPASC;
  const items = await getData();

  if (!items) {
    return <p>No data</p>;
  }

  return <TableWrapper items={items} ordering={orderBy} />;
}
