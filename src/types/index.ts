import { Dispatch } from 'react';

import { OrderBy } from 'utils/enums';

export interface Data {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}

export interface Filter {
  placeholder?: string;
  value?: string;
  onChange: (newValue?: string) => void;
}
export interface FilterDropdown extends Filter {
  id: string;
  items: string[];
}
export interface FilterProps {
  searchInput?: Filter,
  filters: FilterDropdown[],
  hideClearFilters?: boolean;
  className?: string;
}

export interface TableWrapperProps {
  items: Data[];
  ordering: OrderBy;
}

export interface TableProps {
  items: Data[];
  filters?: FilterProps;
}

export type State = {
  data: Data[]
};

export type ActionPayload = {
  type: string;
  payload: { item: Data };
};

export type FavoritesContextType = {
  state: State;
  dispatch: Dispatch<ActionPayload>;
};
