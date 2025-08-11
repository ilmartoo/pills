import type { UtilitiesFilter } from "./models";

const StoreKey = 'user_prefs' as const;

type StoreVersion = `${number}.${number}.${number}`;
const CurrentVersion: StoreVersion = '0.0.1';

export type Store = {
  version: StoreVersion;
  dark: boolean;
  utilities: {
    filter: UtilitiesFilter;
  };
};

let storeInit = false;
let store: Store;

const InitialStore: Store = {
  version: CurrentVersion,
  dark: false,
  utilities: {
    filter: {
      pills: {
        search: '',
        order: 0,
        favorites: [],
      },
      tags: {
        search: '',
        active: [],
      }
    },
  }
};

export function getStore(): Readonly<Store> {
  if (storeInit) { return store; }
  storeInit = true;
  const value = window.localStorage.getItem(StoreKey);
  store = value ? JSON.parse(value) : InitialStore;
  if (store.version !== CurrentVersion) { store = InitialStore; }
  return store;
}

export function getStoreTheme(): Readonly<Store['dark']> {
  return getStore().dark;
}

export function getStoreUtilities(): Readonly<Store['utilities']> {
  return getStore().utilities;
}

export function getStoreUtilitiesFilter(): Readonly<Store['utilities']['filter']> {
  return getStoreUtilities().filter;
}

export function updateStore(newStore: Store) {
  store = newStore;
  store.version = CurrentVersion;
  window.localStorage.setItem(StoreKey, JSON.stringify(newStore));
}

export function updateStoreTheme(dark: Store['dark']) {
  updateStore({ ...store, dark });
}

export function updateStoreUtilities(utilities: Store['utilities']) {
  updateStore({ ...store, utilities });
}

export function updateStoreUtilitiesFilter(filter: Store['utilities']['filter']) {
  updateStoreUtilities({ ...store.utilities, filter });
}
