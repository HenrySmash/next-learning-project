import { Data } from 'types';

export async function generateStaticParams() {
  const data: Data[] = await fetch('http://localhost:3000/api/content').then(
    (res) => res.json()
  );

  return data.map((item) => ({
    symbol: item.symbol,
  }));
}

interface Props {
  params: { symbol: string };
}

export default async function ItemPage({ params }: Props) {
  const data: Data[] = await fetch('http://localhost:3000/api/content').then(
    (res) => res.json()
  );
  const item = data.find((item) => item.symbol === params.symbol)!;

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block justify-center text-center">
        <h1>{item.symbol}</h1>
        <div className="grid grid-cols-4 gap-4">
          <p>{item.openPrice}</p>
        </div>
      </div>
    </section>
  );
}
