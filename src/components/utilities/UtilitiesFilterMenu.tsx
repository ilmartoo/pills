import { SwitchListManager } from '@components/filters/SwitchListManager';
import { PillOrdering, type Tag, type UtilitiesFilter } from '@logic/models';
import { toggleItem } from '@logic/utils';
import { ArrowDown01, ArrowDownAZ, ArrowUp01, ArrowUpAZ } from 'lucide-react';

export function UtilitiesFilterMenu(props: {
  filter: UtilitiesFilter;
  tags: Tag[];
  onChange: (filter: UtilitiesFilter) => void;
}) {
  function updatePillSearch(search: string) {
    props.onChange({ ...props.filter, pills: { ...props.filter.pills, search } });
  }

  function updatePillOrder() {
    props.onChange({
      ...props.filter,
      pills: { ...props.filter.pills, order: (props.filter.pills.order + 1) % PillOrdering.length },
    });
  }

  function updateTagsSearch(search: string) {
    props.onChange({ ...props.filter, tags: { ...props.filter.tags, search } });
  }

  function clearTagsActive() {
    props.onChange({ ...props.filter, tags: { ...props.filter.tags, active: [] } });
  }

  function toggleActiveTag(tag: Tag) {
    props.onChange({
      ...props.filter,
      tags: { ...props.filter.tags, active: toggleItem(props.filter.tags.active, tag) },
    });
  }

  const pillSortIcon = (() => {
    switch (PillOrdering[props.filter.pills.order]) {
      case 'AlphaNormal':
        return <ArrowDownAZ />;
      case 'AlphaReverse':
        return <ArrowUpAZ />;
      case 'TagNormal':
        return <ArrowDown01 />;
      case 'TagReverse':
        return <ArrowUp01 />;
    }
  })();

  return (
    <div className="space-y-2 h-full flex flex-col">
      <div className="flex gap-2">
        <input
          placeholder="Search pills"
          type="search"
          className="input"
          value={props.filter.pills.search}
          onChange={(e) => updatePillSearch(e.target.value)}
        />

        <button
          className="btn-sm-icon-outline size-9"
          onClick={updatePillOrder}
          data-tooltip="Change pill ordering"
          data-side="bottom"
          data-align="end"
        >
          {pillSortIcon}
        </button>
      </div>

      <SwitchListManager
        items={props.tags}
        active={props.filter.tags.active}
        onCheckedItem={toggleActiveTag}
        onUncheckAllItems={clearTagsActive}
        search={props.filter.tags.search}
        onSearchChange={updateTagsSearch}
        namings={{ singular: 'tag', plural: 'tags' }}
        open
      />
    </div>
  );
}
