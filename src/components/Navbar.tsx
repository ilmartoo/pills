import { Menu, Moon, Sun } from 'lucide-react';
import { NavLink, useMatch } from 'react-router';
import { useTheme } from '../logic/hooks';
import { routes } from '../logic/routes';

const PillIcon = `${import.meta.env.BASE_URL}/pill-icon.png`;

export function Nabvar() {
  const [, , toggleDarkTheme] = useTheme();

  function toggleSidebar() {
    document.dispatchEvent(new CustomEvent('basecoat:sidebar'));
  }

  return (
    <nav className="p-4 border-b space-y-4">
      <div className="flex justify-between items-center">
        <button
          className="btn-icon-outline size-10"
          onClick={toggleSidebar}
          data-tooltip="Toggle filter menu"
          data-side="bottom"
          data-align="start"
        >
          <Menu className="w-full" />
        </button>
        <NavLink
          className="space-x-2 mx-4 grid grid-cols-[auto_1fr] place-items-center"
          to={routes.root.path}
        >
          <img className="inline size-6" src={PillIcon} />
          <p className="text-lg font-semibold">Knowledge Pills</p>
        </NavLink>

        <button
          className="btn-icon-outline size-10 sm:ml-auto"
          onClick={toggleDarkTheme}
          data-tooltip="Toggle dark mode"
          data-side="bottom"
          data-align="end"
        >
          <Moon className="w-full block dark:hidden" />
          <Sun className="w-full hidden dark:block" />
        </button>
      </div>

      <div className="tabs">
        <div role="tablist" className="w-full">
          <NavLink
            role="tab"
            to={routes.utilities.path}
            aria-selected={!!useMatch(routes.utilities.path)}
          >
            Utilities
          </NavLink>
          <NavLink
            role="tab"
            to={routes.recipes.path}
            aria-selected={!!useMatch(routes.recipes.path)}
          >
            Recipes
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
