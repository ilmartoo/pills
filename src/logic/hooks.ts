import { getStore, updateStoreTheme } from '@logic/store';
import { useEffect, useState } from 'react';

export function usePropState<T>(value: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState(value);
  useEffect(() => setState(value), [value]);
  return [state, setState];
}

export function useTheme() {
  const [isDarkTheme, setDarkTheme] = useState(getStore().dark);
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    updateStoreTheme(isDarkTheme);
  }, [isDarkTheme]);

  return [
    isDarkTheme,
    (isDarkTheme: boolean) => void (isDarkTheme ? setDarkTheme(true) : setDarkTheme(false)),
    () => setDarkTheme(!isDarkTheme),
  ] as const;
}
