import type {
  Country,
  RecipePill,
  RecipePillHeader,
  RecipePillsData,
  Tag,
  UtilityPill,
  UtilityPillHeader,
  UtilityPillsData,
} from '@logic/models';

const ValueSeparator = '","';
const RowSeparator = '"\n"';

const SpreadSheetId = '1GuBlxXs-IplKkXr5Du9sAg8rKb2Y4pPrCDxACmU8bqQ' as const;
const SpreadSheetPages = {
  UTILITY: 'Utilities',
  RECIPES: 'Recipes',
} as const;

// ---- Data storage -------------------------------------------

const storage: { utilities?: UtilityPillsData; recipes?: RecipePillsData } = {};

// ---- Utility pills ------------------------------------------

export async function requestUtilityPills() {
  if (storage.utilities) {
    return storage.utilities;
  } // Saved data

  const queryURL = `https://docs.google.com/spreadsheets/d/${SpreadSheetId}/gviz/tq?tqx=out:csv&sheet=${SpreadSheetPages.UTILITY}`;
  const response = await fetch(queryURL, { method: 'GET' });
  const text = await response.text();

  return parseUtilityPills(text);
}

function parseUtilityPills(data: string): UtilityPillsData {
  const pills: UtilityPill[] = [];
  const tags: Set<Tag> = new Set();

  const [headers, ...rows] = data.substring(1, data.length - 1).split(RowSeparator);

  const HeaderIndex = headers
    .split(ValueSeparator)
    .reduce(
      (map, header, idx) => ({ ...map, [header.trim().toLocaleLowerCase()]: idx }),
      {} as Record<UtilityPillHeader, number>
    );

  for (let i = 0; i < rows.length; ++i) {
    const values = rows[i].split(ValueSeparator);

    const pill: UtilityPill = {
      id: i,
      title: values[HeaderIndex.title].trim(),
      link: values[HeaderIndex.link].trim(),
      img: values[HeaderIndex.img]?.trim() || undefined,
      description: values[HeaderIndex.description]?.trim() || undefined,
      tags: values[HeaderIndex.tags].split(',').map((t) => t.trim()),
    };
    pill.tags.forEach((t) => tags.add(t));
    pills.push(pill);
  }

  return (storage.utilities = { pills, tags });
}

// ---- Recipe pills -------------------------------------------

export async function requestRecipePills() {
  if (storage.recipes) {
    return storage.recipes;
  } // Saved data

  const queryURL = `https://docs.google.com/spreadsheets/d/${SpreadSheetId}/gviz/tq?tqx=out:csv&sheet=${SpreadSheetPages.RECIPES}`;
  const response = await fetch(queryURL, { method: 'GET' });
  const text = await response.text();

  return parseRecipePills(text);
}

function parseRecipePills(data: string): RecipePillsData {
  const pills: RecipePill[] = [];
  const tags: Set<Tag> = new Set();
  const countries: Set<Country> = new Set();

  const [headers, ...rows] = data.substring(1, data.length - 1).split(RowSeparator);

  const HeaderIndex = headers
    .split(ValueSeparator)
    .reduce(
      (map, header, idx) => ({ ...map, [header.trim().toLocaleLowerCase()]: idx }),
      {} as Record<RecipePillHeader, number>
    );

  for (let i = 0; i < rows.length; ++i) {
    const values = rows[i].split(ValueSeparator);

    const servingsValue = values[HeaderIndex.servings].trim().split('-');
    const minServings = +servingsValue[0];
    const maxServings = servingsValue.length > 1 ? +servingsValue[1] : minServings;

    const pill: RecipePill = {
      id: i,
      title: values[HeaderIndex.title].trim(),
      link: values[HeaderIndex.link].trim(),
      img: values[HeaderIndex.img]?.trim() || undefined,
      servings: { min: minServings, max: maxServings },
      ingredients: values[HeaderIndex.ingredients].split(',').map((t) => t.trim()),
      tags: values[HeaderIndex.tags].split(',').map((t) => t.trim()),
      country: values[HeaderIndex.country]?.trim() || undefined,
    };
    pill.tags.forEach((t) => tags.add(t));
    if (pill.country) {
      countries.add(pill.country);
    }
    pills.push(pill);
  }

  return (storage.recipes = { pills, tags, countries });
}
