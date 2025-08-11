import type { ReactNode } from 'react';

export function Sidebar(props: { children: ReactNode }) {
  return (
    <aside className='sidebar' data-side='left'>
      <nav>
        <header className='h-18 flex justify-center items-center border-b'>
          <h2 className='font-semibold'>Search filters</h2>
        </header>
        <section className='p-4'>{props.children}</section>
      </nav>
    </aside>
  );
}
