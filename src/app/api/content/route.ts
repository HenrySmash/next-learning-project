import { NextResponse } from 'next/server';

const url = 'https://data-api.binance.vision/api/v3/ticker/24hr';

export async function GET() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await fetch(url).then((resp) => resp.json());

  return NextResponse.json(data);
}
