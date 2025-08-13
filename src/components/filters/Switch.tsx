import { cn } from '@logic/utils';
import type { ReactNode } from 'react';

export function Switch(props: {
  children: ReactNode;
  className?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className={cn('label gap-2', props.className)}>
      <input
        type="checkbox"
        role="switch"
        className="input"
        checked={props.checked}
        onChange={() => props.onChange(!props.checked)}
      />
      {props.children}
    </label>
  );
}
