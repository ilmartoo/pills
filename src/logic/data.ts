import type { PillData, PillType, RecipePill, RecipePillHeader, Tag, UtilityPill, UtilityPillHeader } from "./models";

const SpreadSheetId = '1GuBlxXs-IplKkXr5Du9sAg8rKb2Y4pPrCDxACmU8bqQ' as const;

const ValueSeparator = '","';
const RowSeparator = '"\n"';

export async function requestPills<T extends PillType>(type: T, query?: string): Promise<PillData<T>> {
  let queryURL = `https://docs.google.com/spreadsheets/d/${SpreadSheetId}/gviz/tq?tqx=out:csv&sheet=${type}`;
  if (query != null) { queryURL += `&tq=${encodeURI(query)}`; }

  const response = await fetch(queryURL, { method: 'GET' });
  const text = await response.text();

  return parseData(type, text);
}

function parseData<T extends PillType>(type: T, data: string): PillData<T> {
  switch (type) {
    case "utility": return parseUtilityPills(data) as PillData<T>;
    case "recipe": return parseRecipePills(data) as PillData<T>;
    default: return { pills: [], tags: new Set() };
  }
}

function parseUtilityPills(data: string): PillData<"utility"> {
  const pills: UtilityPill[] = [];
  const tags: Set<Tag> = new Set();

  const [headers, ...rows] = data.substring(1, data.length - 1).split(RowSeparator)

  const HeaderIndex = headers.split(ValueSeparator).reduce((map, header, idx) => ({ ...map, [header.trim().toLocaleLowerCase()]: idx }), {} as Record<UtilityPillHeader, number>);

  for (let i = 0; i < rows.length; ++i) {
    const values = rows[i].split(ValueSeparator);

    const pill: UtilityPill = {
      id: i,
      title: values[HeaderIndex.title].trim(),
      link: values[HeaderIndex.link].trim(),
      img: values[HeaderIndex.img]?.trim() || undefined,
      description: values[HeaderIndex.description]?.trim() || undefined,
      tags: values[HeaderIndex.tags].split(",").map(t => t.trim())
    }
    pill.tags.forEach(t => tags.add(t));
    pills.push(pill);
  }

  return { pills, tags };
}

function parseRecipePills(data: string): PillData<"recipe"> {
  const pills: RecipePill[] = [];
  const tags: Set<Tag> = new Set();

  const [headers, ...rows] = data.substring(1, data.length - 1).split(RowSeparator)

  const HeaderIndex = headers.split(ValueSeparator).reduce((map, header, idx) => ({ ...map, [header.trim().toLocaleLowerCase()]: idx }), {} as Record<RecipePillHeader, number>);

  for (let i = 0; i < rows.length; ++i) {
    const values = rows[i].split(ValueSeparator);

    const pill: RecipePill = {
      id: i,
      title: values[HeaderIndex.title].trim(),
      link: values[HeaderIndex.link].trim(),
      img: values[HeaderIndex.img]?.trim(),
      servings: +values[HeaderIndex.servings].trim(),
      ingredients: values[HeaderIndex.ingredients].split(",").map(t => t.trim()),
      description: values[HeaderIndex.description].trim(),
      tags: values[HeaderIndex.tags].split(",").map(t => t.trim())
    }
    pill.tags.forEach(t => tags.add(t));
    pills.push(pill);
  }

  return { pills, tags };
}