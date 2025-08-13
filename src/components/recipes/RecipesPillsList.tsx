import type { RecipePill, Tag } from '@logic/models';
import { cn } from '@logic/utils';
import { ChefHat, MapPin, Star } from 'lucide-react';

export function RecipesPillsList(props: {
  pills: RecipePill[];
  activeTags: Tag[];
  activeCountries: Tag[];
  favourites: number[];
  onTagClick: (t: Tag) => void;
  onCountryClick: (t: Tag) => void;
  onFavoriteClick: (id: number) => void;
}) {
  return props.pills.map((pill) => {
    const favorite = props.favourites.includes(pill.id);

    return (
      <div
        className={cn('card justify-start', favorite && 'border-accent-foreground border')}
        key={pill.id}
      >
        <header>
          <div className="space-y-1.5">
            <div className="flex justify-between items-center gap-4">
              <div>
                <h1 className="font-semibold">{pill.title}</h1>
                <p>
                  {pill.servings.min}
                  {pill.servings.min < pill.servings.max && ` to ${pill.servings.max}`} servings
                </p>
              </div>
              <button
                className="btn-icon-ghost self-start"
                onClick={() => props.onFavoriteClick(pill.id)}
                data-tooltip="Toggle favorite"
                data-side="top"
                data-align="center"
              >
                <Star
                  className={cn(
                    'size-5 transition-colors duration-250',
                    favorite && 'fill-current'
                  )}
                />
              </button>
            </div>
            <p className="flex gap-2">
              <a className="badge-outline mr-auto" href={pill.link} target="_blank">
                <ChefHat /> Make this recipe
              </a>
              {pill.country && (
                <a
                  className={cn(
                    'cursor-pointer',
                    props.activeCountries.includes(pill.country) ? 'badge-primary' : 'badge-outline'
                  )}
                  onClick={() => props.onCountryClick(pill.country!)}
                >
                  <MapPin /> {pill.country}
                </a>
              )}
            </p>
          </div>
        </header>

        {pill.img && (
          <section className="w-full flex flex-col space-y-2">
            <img
              src={pill.img}
              className="max-h-60 self-center h-fit object-scale-down rounded-md"
            />
            <p className="text-xs font-">
              <b>Ingredients:</b> {pill.ingredients.sort().join(', ')}.
            </p>
          </section>
        )}

        <footer className="mt-auto flex flex-wrap gap-2">
          {pill.tags.sort().map((t) => (
            <a
              key={t}
              className={cn(props.activeTags.includes(t) ? 'btn-sm-primary' : 'btn-sm-outline')}
              onClick={() => props.onTagClick(t)}
            >
              {t}
            </a>
          ))}
        </footer>
      </div>
    );
  });
}
