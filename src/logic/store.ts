import {
  CleanRecipesFilter,
  CleanUtilitiesFilter,
  type RecipesFilter,
  type UtilitiesFilter,
} from '@logic/models';

const StoreKey = 'user_prefs' as const;

type StoreVersion = `${number}.${number}.${number}`;
const CurrentVersion: StoreVersion = '1.0.0';

export type Store = {
  version: StoreVersion;
  dark: boolean;
  utilities: {
    filter: UtilitiesFilter;
  };
  recipes: {
    filter: RecipesFilter;
  };
};

let storeInit = false;
let store: Store;

const InitialStore: Store = {
  version: CurrentVersion,
  dark: false,
  utilities: {
    filter: { ...CleanUtilitiesFilter },
  },
  recipes: {
    filter: { ...CleanRecipesFilter },
  },
};

// ---- Store --------------------------------------------------
export function getStore(): Readonly<Store> {
  if (storeInit) {
    return store;
  }
  storeInit = true;
  const value = window.localStorage.getItem(StoreKey);
  store = value ? JSON.parse(value) : InitialStore;
  if (store.version !== CurrentVersion) {
    store = InitialStore;
  }
  return store;
}

export function updateStore(newStore: Store) {
  store = newStore;
  store.version = CurrentVersion;
  window.localStorage.setItem(StoreKey, JSON.stringify(newStore));
}

// ---- Theme --------------------------------------------------
export function getStoreTheme(): Readonly<Store['dark']> {
  return getStore().dark;
}

export function updateStoreTheme(dark: Store['dark']) {
  updateStore({ ...store, dark });
}

// ---- Utilities ----------------------------------------------
export function getStoreUtilities(): Readonly<Store['utilities']> {
  return getStore().utilities;
}

export function getStoreUtilitiesFilter(): Readonly<Store['utilities']['filter']> {
  return getStoreUtilities().filter;
}

export function updateStoreUtilities(utilities: Store['utilities']) {
  updateStore({ ...store, utilities });
}

export function updateStoreUtilitiesFilter(filter: Store['utilities']['filter']) {
  updateStoreUtilities({ ...store.utilities, filter });
}

// ---- Recipes ------------------------------------------------
export function getStoreRecipes(): Readonly<Store['recipes']> {
  return getStore().recipes;
}

export function getStoreRecipesFilter(): Readonly<Store['recipes']['filter']> {
  return getStoreRecipes().filter;
}

export function updateStoreRecipes(recipes: Store['recipes']) {
  updateStore({ ...store, recipes });
}

export function updateStoreRecipesFilter(filter: Store['recipes']['filter']) {
  updateStoreRecipes({ ...store.recipes, filter });
}
