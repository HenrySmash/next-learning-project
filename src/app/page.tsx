import React from 'react';

import TableWrapper from './(main)';
import { OrderBy } from 'utils/enums';

export default function Home() {
  const orderBy = OrderBy.DESC;

  return <TableWrapper ordering={orderBy} />
}
