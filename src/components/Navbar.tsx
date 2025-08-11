import { Moon, PanelLeft, Sun } from 'lucide-react';
import { NavLink } from 'react-router';
import { useTheme } from '../logic/hooks';
import { routes } from '../logic/routes';

const PillIcon = '../assets/pill-icon.png';

export function Nabvar() {
  const [, , toggleDarkTheme] = useTheme();

  function toggleSidebar() {
    document.dispatchEvent(new CustomEvent('basecoat:sidebar'));
  }

  return (
    <nav className='flex justify-start items-center p-4 h-18 border-b'>
      <button
        className='btn-icon-ghost size-10'
        onClick={toggleSidebar}
        data-tooltip='Toggle filter sidebar'
        data-side='bottom'
        data-align='start'
      >
        <PanelLeft className='w-full' />
      </button>
      <NavLink
        className='space-x-2 mx-4 grid grid-cols-[auto_1fr] place-items-center'
        to={routes.root.path}
      >
        <img className='inline size-6' src={PillIcon} />
        <div className='text-lg font-semibold'>Knowledge Pills</div>
      </NavLink>
      <NavLink className='btn-ghost' to={routes.utilities.path}>
        Utilities
      </NavLink>
      <NavLink className='btn-ghost' to={routes.recipes.path}>
        Recipes
      </NavLink>

      <button
        className='ml-auto btn-icon-outline size-10 block dark:hidden'
        onClick={toggleDarkTheme}
        data-tooltip='Toggle dark mode'
        data-side='bottom'
        data-align='end'
      >
        <Moon className='w-full' />
      </button>
      <button
        className='ml-auto btn-icon-outline size-10 hidden dark:block'
        onClick={toggleDarkTheme}
        data-tooltip='Toggle light mode'
        data-side='bottom'
        data-align='end'
      >
        <Sun className='w-full' />
      </button>
    </nav>
  );
}
