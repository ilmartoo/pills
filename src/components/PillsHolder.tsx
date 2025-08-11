import type { ReactNode } from 'react';

export function PillsHolder(props: { children: ReactNode }) {
  return (
    <div className='grid gap-2 auto-rows-min sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
      {props.children}
    </div>
  );
}
//
