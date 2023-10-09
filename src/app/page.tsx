import React from 'react';

import TableComponent from 'components/table/table';

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block justify-center">
        <TableComponent />
      </div>
    </section>
  );
}
