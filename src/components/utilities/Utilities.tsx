import { Layout } from '@components/Layout';
import { PillsHolder } from '@components/pills/PillsHolder';
import { UtilitiesFilterMenu } from '@components/utilities/UtilitiesFilterMenu';
import { UtilitiesPillsList } from '@components/utilities/UtiltitiesPillsList';
import { requestUtilityPills } from '@logic/data';
import { PillOrdering, type Tag, type UtilitiesFilter, type UtilityPill } from '@logic/models';
import { getStoreUtilitiesFilter, updateStoreUtilitiesFilter } from '@logic/store';
import { pluralize, toggleItem } from '@logic/utils';
import { useEffect, useState } from 'react';

export function Utilities() {
  const [data, setData] = useState<{ pills: UtilityPill[]; tags: Tag[] }>({
    pills: [],
    tags: [],
  });
  const [filter, setFilter] = useState<UtilitiesFilter>(getStoreUtilitiesFilter());

  useEffect(() => {
    requestUtilityPills()
      .then((r) => ({ pills: r.pills, tags: [...r.tags].sort() }))
      .then(setData);
  }, []);

  useEffect(() => {
    updateStoreUtilitiesFilter(filter);
  }, [filter]);

  function toggleTag(tag: Tag) {
    setFilter({
      ...filter,
      tags: { ...filter.tags, active: toggleItem(filter.tags.active, tag) },
    });
  }

  function toggleFavorite(id: number) {
    setFilter({
      ...filter,
      pills: { ...filter.pills, favorites: toggleItem(filter.pills.favorites, id) },
    });
  }

  const pills = (() => {
    let pills = data.pills;

    // Pill search
    if (filter.pills.search) {
      const searchString = filter.pills.search.toLocaleLowerCase();
      pills = pills.filter(
        ({ title, description, tags }) =>
          !filter.pills.search ||
          title.toLocaleLowerCase().includes(searchString) ||
          (description && description.toLocaleLowerCase().includes(searchString)) ||
          tags.some((t) => t.includes(searchString))
      );
    }

    // Active tags filtering
    if (filter.tags.active.length > 0) {
      pills = pills.filter(
        ({ tags }) => tags.length > 0 && filter.tags.active.some((t) => tags.includes(t))
      );
    }

    // Base sorting
    let sort: string;

    const alphaOrdering = (a: string, b: string) => a.localeCompare(b);

    switch (PillOrdering[filter.pills.order]) {
      case 'AlphaNormal':
        sort = 'Title alphabetical order';
        pills = pills.sort((a, b) => alphaOrdering(a.title, b.title));
        break;
      case 'AlphaReverse':
        sort = 'Title reverse alphabetical order';
        pills = pills.sort((a, b) => alphaOrdering(b.title, a.title));
        break;
      case 'TagNormal':
        sort = 'Tags alphabetical order';
        pills = pills.sort((a, b) => {
          for (let i = 0; i < Math.min(a.tags.length, b.tags.length); i++) {
            const comp = a.tags[i].localeCompare(b.tags[i]);
            if (comp != 0) {
              return comp;
            }
          }
          return a.tags.length - b.tags.length;
        });
        break;
      case 'TagReverse':
        sort = 'Tags reverse alphabetical order';
        pills = pills.sort((a, b) => {
          for (let i = 0; i < Math.min(a.tags.length, b.tags.length); i++) {
            const comp = b.tags[i].localeCompare(a.tags[i]);
            if (comp != 0) {
              return comp;
            }
          }
          return b.tags.length - a.tags.length;
        });
        break;
    }

    // Favorite sorting
    const favoritePillsMap = pills.reduce(
      (map, p) => ({ ...map, [p.id]: filter.pills.favorites.includes(p.id) }),
      {} as Record<number, boolean>
    );
    pills.sort((a, b) => {
      let value = 0;
      if (favoritePillsMap[a.id]) {
        value -= 1;
      }
      if (favoritePillsMap[b.id]) {
        value += 1;
      }
      return value;
    });

    return {
      displayed: pills,
      shown: pills.length,
      hidden: data.pills.length - pills.length,
      sort,
    };
  })();

  if (data.pills.length) {
    return (
      <Layout
        sidebar={<UtilitiesFilterMenu filter={filter} tags={data.tags} onChange={setFilter} />}
      >
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <span className="badge-secondary">
              {pills.shown} {pluralize('pill', 'pills', pills.shown)} on display
            </span>

            {pills.hidden > 0 && (
              <span className="badge-primary">
                {pills.hidden} {pluralize('pill', 'pills', pills.hidden)} excluded
              </span>
            )}

            <span className="badge-secondary">{pills.sort}</span>
          </div>
          <PillsHolder>
            <UtilitiesPillsList
              pills={pills.displayed}
              activeTags={filter.tags.active}
              favourites={filter.pills.favorites}
              onFavoriteClick={toggleFavorite}
              onTagClick={toggleTag}
            />
          </PillsHolder>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout
        sidebar={
          <div className="space-y-2">
            <div className="bg-accent animate-pulse h-9 rounded-md" />
            <div className="bg-accent animate-pulse h-9 rounded-md" />

            <div className="bg-accent animate-pulse h-4.5 w-2/3 rounded-md" />
            <div className="bg-accent animate-pulse h-4.5 w-2/3 rounded-md" />
            <div className="bg-accent animate-pulse h-4.5 w-2/3 rounded-md" />
            <div className="bg-accent animate-pulse h-4.5 w-2/3 rounded-md" />
            <div className="bg-accent animate-pulse h-4.5 w-2/3 rounded-md" />
            <div className="bg-accent animate-pulse h-4.5 w-2/3 rounded-md" />
            <div className="bg-accent animate-pulse h-4.5 w-2/3 rounded-md" />
            <div className="bg-accent animate-pulse h-4.5 w-2/3 rounded-md" />
          </div>
        }
      >
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="bg-accent animate-pulse w-30 h-5.5 rounded-md" />
            <div className="bg-accent animate-pulse w-30 h-5.5 rounded-md" />
          </div>
          <PillsHolder>
            <div className="bg-accent animate-pulse h-80 rounded-lg" />
            <div className="bg-accent animate-pulse h-80 rounded-lg" />

            <div className="bg-accent animate-pulse h-80 rounded-lg max-lg:hidden" />

            <div className="bg-accent animate-pulse h-80 rounded-lg max-xl:hidden" />
            <div className="bg-accent animate-pulse h-80 rounded-lg max-xl:hidden" />

            <div className="bg-accent animate-pulse h-80 rounded-lg max-2xl:hidden" />
            <div className="bg-accent animate-pulse h-80 rounded-lg max-2xl:hidden" />
          </PillsHolder>
        </div>
      </Layout>
    );
  }
}
