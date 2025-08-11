import type { ReactNode } from 'react';
import { Nabvar } from './Navbar';
import { Sidebar } from './Sidebar';

export function Layout(props: { sidebar: ReactNode; children: ReactNode }) {
  return (
    <>
      <Sidebar>{props.sidebar}</Sidebar>
      <main>
        <Nabvar />
        <section className='p-4'>{props.children}</section>
      </main>
    </>
  );
}
