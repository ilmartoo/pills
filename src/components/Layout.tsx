import { Nabvar } from '@components/Navbar';
import { Sidebar } from '@components/Sidebar';
import type { ReactNode } from 'react';

export function Layout(props: { sidebar: ReactNode; children: ReactNode }) {
  return (
    <>
      <Sidebar>{props.sidebar}</Sidebar>
      <main className="h-screen grid grid-rows-[auto_1fr]">
        <Nabvar />
        <section className="p-4 overflow-y-auto">{props.children}</section>
      </main>
    </>
  );
}
