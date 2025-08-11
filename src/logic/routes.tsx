import { RecipePills } from '../components/RecipePills';
import { Utilities } from '../components/utility-pills/Utilities';

export const routes = {
  root: { path: '/' },
  utilities: { path: '/utilities', element: <Utilities /> },
  recipes: { path: '/recipes', element: <RecipePills /> },
} as const;
