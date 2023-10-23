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
    return (
      <div className="flex justify-center mt-12 w-full h-full min-h-[100vh] min-w-full">
        <h1>There is no data to display</h1>
      </div>
    );
  }

  return <TableWrapper items={items} ordering={orderBy} />;
}
