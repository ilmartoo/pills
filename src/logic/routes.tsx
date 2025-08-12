import { Recipes } from '@components/recipes/Recipes';
import { Utilities } from '@components/utilities/Utilities';

export const routes = {
  root: { path: '/' },
  utilities: { path: '/utilities', element: <Utilities /> },
  recipes: { path: '/recipes', element: <Recipes /> },
} as const;
