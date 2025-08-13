import type { ReactNode } from 'react';

export function Sidebar(props: { children: ReactNode; open?: boolean }) {
  return (
    <aside className="sidebar" data-side="left" aria-hidden={false}>
      <nav>
        <header className="mx-2 mt-4 flex justify-center">
          <h2 className="font-semibold">Search filters</h2>
        </header>
        <section className="p-4 pt-2">{props.children}</section>
      </nav>
    </aside>
  );
}
