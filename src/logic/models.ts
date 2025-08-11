export type ID = number;

export type Tag = string;

export const PillOrdering = ['AlphaNormal', 'AlphaReverse', 'TagNormal', 'TagReverse'] as const;

export const TagOrdering = ['AlphaNormal', 'AlphaReverse', 'ActiveNormal', 'ActiveReverse'] as const;

export type UtilityPillHeader = "title" | 'link' | "img" | "description" | "tags";

export type UtilityPill = {
    id: ID;
    title: string;
    link: string;
    img?: string;
    description?: string;
    tags: Tag[];
}

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

export type RecipePillHeader = "title" | 'link' | "img" | "servings" | "ingredients" | "description" | "tags";

export type RecipePill = {
    id: ID;
    title: string;
    link: string;
    img?: string;
    servings: number;
    ingredients: string[]
    description: string;
    tags: Tag[];
}

export type PillType = 'utility' | 'recipe';

export type PillTypes = {
    'utility': UtilityPill,
    'recipe': RecipePill
};

export type PillData<T extends PillType> = {
    pills: PillTypes[T][],
    tags: Set<Tag>,
}
