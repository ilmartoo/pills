import { Switch } from '@components/filters/Switch';
import { pluralize } from '@logic/utils';
import { ChevronDown, FlagOff } from 'lucide-react';

export function SwitchListManager(props: {
  items: string[];
  active: string[];
  onCheckedItem: (item: string, checked: boolean) => void;
  onUncheckAllItems: () => void;
  search: string;
  onSearchChange: (text: string) => void;
  namings: { singular: string; plural: string };
  open?: boolean;
}) {
  const items = (() => {
    let items = props.items;
    if (props.search) {
      items = items.filter((x) => x.includes(props.search));
    }
    return { searched: items, hidden: props.items.length - items.length };
  })();

  return (
    <div>
      <div className="flex gap-2 pb-2">
        <input
          placeholder={`Search ${props.namings.plural}`}
          type="search"
          className="input"
          value={props.search}
          onChange={(e) => props.onSearchChange(e.target.value)}
        />

        <button
          className="btn-sm-icon-outline size-9"
          onClick={props.onUncheckAllItems}
          data-tooltip={`Clear active ${props.namings.plural}`}
          data-side="top"
          data-align="end"
        >
          <FlagOff />
        </button>
      </div>

      <details className="group border-b" open={props.open}>
        <summary className="grid grid-cols-[1fr_auto] pb-2 gap-2">
          <div className="flex gap-2 flex-wrap">
            <span className="badge-secondary">
              {props.active.length}{' '}
              {pluralize(props.namings.singular, props.namings.plural, props.active.length)} active
            </span>

            {items.hidden > 0 && <span className="badge-primary">{items.hidden} hidden</span>}
          </div>
          <ChevronDown className="block pointer-events-none size-4 translate-y-0.5 transition-transform duration-200 group-open:rotate-180" />
        </summary>

        <menu className="list list-none space-y-2 overflow-y-auto pb-2">
          {items.searched.map((x) => {
            const checked = props.active.includes(x);
            return (
              <li key={x}>
                <Switch checked={checked} onChange={() => props.onCheckedItem(x, !checked)}>
                  {x}
                </Switch>
              </li>
            );
          })}
        </menu>
      </details>
    </div>
  );
}
