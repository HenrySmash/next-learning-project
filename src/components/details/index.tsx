import React from 'react';

interface DetailsProps {
  label: string;
  content: string | number;
}

export function Details({ label, content } : DetailsProps) {
  return (
    <div className="basis-1/2 mb-8">
      {label && <h5 className="mb-2">{label}</h5>}
      <p>{content}</p>
    </div>
  );
}
