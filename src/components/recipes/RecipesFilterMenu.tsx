import { SwitchListManager } from '@components/filters/SwitchListManager';
import { PillOrdering, type Country, type RecipesFilter, type Tag } from '@logic/models';
import { toggleItem } from '@logic/utils';
import { ArrowDown01, ArrowDownAZ, ArrowUp01, ArrowUpAZ } from 'lucide-react';

export function RecipesFilterMenu(props: {
  filter: RecipesFilter;
  tags: Tag[];
  countries: Country[];
  onChange: (filter: RecipesFilter) => void;
}) {
  function updateRecipeSearch(search: string) {
    props.onChange({ ...props.filter, pills: { ...props.filter.pills, search } });
  }

  function updateRecipeOrder() {
    props.onChange({
      ...props.filter,
      pills: { ...props.filter.pills, order: (props.filter.pills.order + 1) % PillOrdering.length },
    });
  }

  function updateServings(servings: number | null) {
    props.onChange({ ...props.filter, servings });
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

  function updateCountriesSearch(search: string) {
    props.onChange({ ...props.filter, countries: { ...props.filter.countries, search } });
  }

  function clearCountriesActive() {
    props.onChange({ ...props.filter, countries: { ...props.filter.countries, active: [] } });
  }

  function toggleActiveCountry(country: Country) {
    props.onChange({
      ...props.filter,
      countries: {
        ...props.filter.countries,
        active: toggleItem(props.filter.countries.active, country),
      },
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
          placeholder="Search recipes"
          type="search"
          className="input"
          value={props.filter.pills.search}
          onChange={(e) => updateRecipeSearch(e.target.value)}
        />

        <button
          className="btn-sm-icon-outline size-9"
          onClick={updateRecipeOrder}
          data-tooltip="Change recipe ordering"
          data-side="bottom"
          data-align="end"
        >
          {pillSortIcon}
        </button>
      </div>

      <input
        placeholder="Number of servings"
        type="number"
        className="input"
        value={props.filter.servings || ''}
        min={1}
        onChange={(e) => updateServings(e.target.value ? +e.target.value : null)}
      />

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

      <SwitchListManager
        items={props.countries}
        active={props.filter.countries.active}
        onCheckedItem={toggleActiveCountry}
        onUncheckAllItems={clearCountriesActive}
        search={props.filter.countries.search}
        onSearchChange={updateCountriesSearch}
        namings={{ singular: 'country', plural: 'countries' }}
        open
      />
    </div>
  );
}
