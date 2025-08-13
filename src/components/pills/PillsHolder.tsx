import type { ReactNode } from 'react';

export function PillsHolder(props: { children: ReactNode }) {
  return (
    <div className="grid gap-2 auto-rows-min grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {props.children}
    </div>
  );
}
//
