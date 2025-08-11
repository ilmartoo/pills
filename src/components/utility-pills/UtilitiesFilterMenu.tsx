import { ArrowDown01, ArrowDownAZ, ArrowUp01, ArrowUpAZ, BrushCleaning } from 'lucide-react';
import { PillOrdering, type Tag, type UtilitiesFilter } from '../../logic/models';
import { pluralize, toggleItem } from '../../logic/utils';

export function UtilitiesFilterMenu(props: {
  filter: UtilitiesFilter;
  tags: Tag[];
  onChange: (filter: UtilitiesFilter) => void;
}) {
  const tags = (() => {
    let tags = props.tags;

    // Tag search
    if (props.filter.tags.search) {
      tags = tags.filter((t) => t.includes(props.filter.tags.search));
    }

    return { searched: tags, hidden: props.tags.length - tags.length };
  })();

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
    <div className='space-y-2 h-full flex flex-col'>
      <div className='flex gap-2'>
        <input
          placeholder='Search pills'
          type='search'
          className='input'
          onChange={(e) => updatePillSearch(e.target.value)}
        />

        <button
          className='btn-sm-icon-outline size-9'
          onClick={updatePillOrder}
          data-tooltip='Change pill ordering'
          data-side='bottom'
          data-align='end'
        >
          {pillSortIcon}
        </button>
      </div>

      <div className='flex gap-2'>
        <input
          placeholder='Search tags'
          type='search'
          className='input'
          value={props.filter.tags.search}
          onChange={(e) => updateTagsSearch(e.target.value)}
        />

        <button
          className='btn-sm-icon-outline size-9'
          onClick={clearTagsActive}
          data-tooltip='Clear active tags'
          data-side='top'
          data-align='end'
        >
          <BrushCleaning />
        </button>
      </div>

      <div className='flex gap-2'>
        <span className='badge-secondary'>
          {props.filter.tags.active.length}{' '}
          {pluralize('tag', 'tags', props.filter.tags.active.length)} active
        </span>

        {tags.hidden > 0 && (
          <span className='badge-primary'>
            {tags.hidden} {pluralize('tag', 'tags', tags.hidden)} hidden
          </span>
        )}
      </div>

      <menu className='list list-none space-y-2 overflow-y-auto mb-[-1rem] pb-4'>
        {tags.searched.map((t) => {
          const checked = props.filter.tags.active.includes(t);
          return (
            <li key={t}>
              <TagSwitch tag={t} checked={checked} onChange={() => toggleActiveTag(t)} />
            </li>
          );
        })}
      </menu>
    </div>
  );
}

function TagSwitch(props: { tag: Tag; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className='label gap-2'>
      <input
        type='checkbox'
        role='switch'
        className='input'
        checked={props.checked}
        onChange={() => props.onChange(!props.checked)}
      />
      {props.tag}
    </label>
  );
}
