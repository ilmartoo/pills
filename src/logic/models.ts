export type ID = number;

export type Tag = string;

export type Country = string;

export const PillOrdering = ['AlphaNormal', 'AlphaReverse', 'TagNormal', 'TagReverse'] as const;

export const TagOrdering = [
  'AlphaNormal',
  'AlphaReverse',
  'ActiveNormal',
  'ActiveReverse',
] as const;

export type UtilityPillHeader = 'title' | 'link' | 'img' | 'description' | 'tags';

export type UtilityPill = {
  id: ID;
  title: string;
  link: string;
  img?: string;
  description?: string;
  tags: Tag[];
};

export type UtilitiesFilter = {
  pills: {
    search: string;
    order: number;
    favorites: number[];
  };
  tags: {
    search: string;
    active: Tag[];
  };
};

export const CleanUtilitiesFilter: UtilitiesFilter = {
  pills: {
    search: '',
    order: 0,
    favorites: [],
  },
  tags: {
    search: '',
    active: [],
  },
};

export type RecipePillHeader =
  | 'title'
  | 'link'
  | 'img'
  | 'servings'
  | 'ingredients'
  | 'tags'
  | 'country';

export type RecipePill = {
  id: ID;
  title: string;
  link: string;
  img?: string;
  servings: { min: number; max: number };
  ingredients: string[];
  tags: Tag[];
  country?: Country;
};

export type RecipesFilter = {
  pills: {
    search: string;
    order: number;
    favorites: number[];
  };
  tags: {
    search: string;
    active: Tag[];
  };
  countries: {
    search: string;
    active: Country[];
  };
  servings: number | null;
};

export const CleanRecipesFilter: RecipesFilter = {
  pills: {
    search: '',
    order: 0,
    favorites: [],
  },
  tags: {
    search: '',
    active: [],
  },
  countries: {
    search: '',
    active: [],
  },
  servings: null,
};

export type UtilityPillsData = {
  pills: UtilityPill[];
  tags: Set<Tag>;
};

export type RecipePillsData = {
  pills: RecipePill[];
  tags: Set<Tag>;
  countries: Set<Country>;
};
