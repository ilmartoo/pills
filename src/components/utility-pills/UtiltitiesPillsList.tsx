import { Link, Star } from 'lucide-react';
import type { Tag, UtilityPill } from '../../logic/models';

export function UtilitiesPillsList(props: {
  pills: UtilityPill[];
  activeTags: Tag[];
  favourites: number[];
  onTagClick: (t: Tag) => void;
  onFavoriteClick: (id: number) => void;
}) {
  return props.pills.map((pill) => {
    const favorite = props.favourites.includes(pill.id);

    return (
      <div
        className={`card h-80 justify-start ${favorite ? 'border-accent-foreground border' : ''}`}
        key={pill.id}
      >
        <header>
          <div className='space-y-1.5'>
            <div className='flex justify-between items-center gap-4'>
              <h1 className='font-semibold'>{pill.title}</h1>
              <button
                className='btn-icon-ghost self-start'
                onClick={() => props.onFavoriteClick(pill.id)}
                data-tooltip='Toggle favorite'
                data-side='top'
                data-align='center'
              >
                <Star
                  className={`size-5 transition-colors duration-250 ${favorite ? 'fill-current' : ''}`}
                />
              </button>
            </div>
            <p>
              <a className='badge-outline' href={pill.link} target='_blank'>
                <Link /> Take this pill
              </a>
            </p>
          </div>
        </header>

        <section className='overflow-y-auto'>
          {pill.description && <p>{pill.description}</p>}
        </section>

        <footer className='flex flex-wrap gap-2 mt-auto'>
          {pill.tags.sort().map((t) => (
            <a
              key={t}
              className={props.activeTags.includes(t) ? 'btn-sm-primary' : 'btn-sm-secondary'}
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
