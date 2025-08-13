import { Layout } from '@components/Layout';
import { PillsHolder } from '@components/pills/PillsHolder';
import { requestRecipePills } from '@logic/data';
import {
  PillOrdering,
  type Country,
  type RecipePill,
  type RecipesFilter,
  type Tag,
} from '@logic/models';
import { getStoreRecipesFilter, updateStoreRecipesFilter } from '@logic/store';
import { pluralize, toggleItem } from '@logic/utils';
import { useEffect, useState } from 'react';
import { RecipesFilterMenu } from './RecipesFilterMenu';
import { RecipesPillsList } from './RecipesPillsList';

export function Recipes() {
  const [data, setData] = useState<{ pills: RecipePill[]; tags: Tag[]; countries: Country[] }>({
    pills: [],
    tags: [],
    countries: [],
  });
  const [filter, setFilter] = useState<RecipesFilter>(getStoreRecipesFilter());

  useEffect(() => {
    requestRecipePills()
      .then((r) => ({
        pills: r.pills,
        tags: [...r.tags].sort(),
        countries: [...r.countries].sort(),
      }))
      .then(setData);
  }, []);

  useEffect(() => {
    updateStoreRecipesFilter(filter);
  }, [filter]);

  function toggleTag(tag: Tag) {
    setFilter({
      ...filter,
      tags: { ...filter.tags, active: toggleItem(filter.tags.active, tag) },
    });
  }

  function toggleCountry(country: Country) {
    setFilter({
      ...filter,
      countries: { ...filter.countries, active: toggleItem(filter.countries.active, country) },
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
        ({ title, ingredients, tags, country }) =>
          !filter.pills.search ||
          title.toLocaleLowerCase().includes(searchString) ||
          country?.toLocaleLowerCase().includes(searchString) ||
          ingredients.some((i) => i.includes(searchString)) ||
          tags.some((t) => t.includes(searchString))
      );
    }

    // Active tags filtering
    if (filter.tags.active.length > 0) {
      pills = pills.filter(
        ({ tags }) => tags.length > 0 && filter.tags.active.some((t) => tags.includes(t))
      );
    }

    // Active countries filtering
    if (filter.countries.active.length > 0) {
      pills = pills.filter(
        ({ country }) => country && filter.countries.active.some((c) => c === country)
      );
    }

    // Servings filtering
    if (filter.servings !== null) {
      pills = pills.filter(
        ({ servings }) => filter.servings! >= servings.min && filter.servings! <= servings.max
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
        sidebar={
          <RecipesFilterMenu
            filter={filter}
            tags={data.tags}
            countries={data.countries}
            onChange={setFilter}
          />
        }
      >
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <span className="badge-secondary">
              {pills.shown} {pluralize('recipe', 'recipes', pills.shown)} on display
            </span>

            {pills.hidden > 0 && (
              <span className="badge-primary">
                {pills.hidden} {pluralize('recipe', 'recipes', pills.hidden)} excluded
              </span>
            )}

            <span className="badge-secondary">{pills.sort}</span>
          </div>
          <PillsHolder>
            <RecipesPillsList
              pills={pills.displayed}
              activeTags={filter.tags.active}
              activeCountries={filter.countries.active}
              favourites={filter.pills.favorites}
              onFavoriteClick={toggleFavorite}
              onTagClick={toggleTag}
              onCountryClick={toggleCountry}
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
