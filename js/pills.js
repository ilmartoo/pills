/// <reference path="../lib/jquery-3.7.1.min.js"/>

/**
 * @typedef {{ title: string; link: string }} Pill A pill of information
 * @typedef {Pill & { img?: string; description?: string; tags: string[] }} GeneralPill A general pill with interesting information
 * @typedef {Pill & { img?: string; description?: string; ingredients: string[]; servings: number }} RecipePill A recipe pill with a recipe 
 */

// ----------------------------------------------------------------------------------------------
// --- General Pills ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------

/**
 * Parses a general sheet request response.
 * @param {RequestResult} data Data to parse.
 * @returns {{ pills: GeneralPill[]; tags: string[] }} An array of general pills and some additional data. 
 */
function parseGeneralPills(data) {
    /** @type {(keyof GeneralPill)[]} */
    const headers = data.header.map(t => t.toLowerCase());

    /** @type {Set<string>} */
    const tags = new Set();

    /** @type {GeneralPill[]} */
    const pills = data.rows.map(l => {
        /** @type {GeneralPill} */
        const pill = l.reduce((p, v, i) => {
            p[headers[i]] = v || undefined;
            return p;
        }, {});

        pill.tags = (pill.tags?.split(',') ?? []).map(t => t.trim()).sort();
        pill.tags.forEach(t => tags.add(t));
        return pill;
    });

    debug('[PARSED]');

    return { pills: pills.sort((a,b) => a.title - b.title), tags: [...tags].sort() };
}

/**
 * Creates an DOM element from a general pill.
 * @param {GeneralPill} pill The general pill to use.
 * @returns {[JQuery, JQuery]} Element of the general pill and the collection of tags of the item.
 */
function createGeneralPill(pill) {
    const foldActions = [];
    if (pill.img || pill.description) {
        const fold = $(`<a ${Properties.PILL_ACTION}="${Properties.FOLD_ACTION}" title="Fold pill">${Icons.FOLD}</a>`).on('click', () => {
            fold.hide();
            unfold.show();
            parent.removeClass(Properties.SHOW_DETAILS);
        }).hide();
        const unfold = $(`<a ${Properties.PILL_ACTION}="${Properties.UNFOLD_ACTION}" title="Unfold pill">${Icons.UNFOLD}</a>`).on('click', () => {
            fold.show();
            unfold.hide();
            parent.addClass(Properties.SHOW_DETAILS);
        });
        foldActions.push(fold, unfold);
    } 

    const parent = $(`<div class="pill general"></div>`);
    if (pill.description) { parent.attr('title', pill.description); }
    parent.append(
        `<h1 class="title">${pill.title}</h1>`,
        $('<div class="link-list"></div>').append(
            ...foldActions,
            `<a title="${pill.link}" target="_blank" href="${pill.link}">${getLinkIcon(pill.link)}</a>`,
        ),
    );
    if (pill.img) { parent.append(``); }
    if (pill.description || pill.img) {
        const description = $('<p class="description"></p>');
        if (pill.img) {
            description.append(`<img class="image" src="${pill.img}" title="${pill.img}"/>`)
        }
        if (pill.description) {
            description.append(`<span>${pill.description}</span>`);
        }
        parent.append(description);
    }
    const tags = pill.tags.reduce((jq, tag) => jq
        .add($(`<span class="tag" ${Properties.TAG_NAME}="${tag}">${Icons.TAG}<span>${tag}</span></span>`)
            .on('click', () => State.active.tags.has(tag) ? State.logic.unselectTag(tag) : State.logic.selectTag(tag))
        ), $())
    parent.append($('<div class="tag-list"></div>').append(tags));
    return [parent, tags];
}

/**
 * Creates the DOM elements from an array of general pills.
 * @param {GeneralPill[]} pills Array of general pills.
 * @returns {[JQuery, JQuery]} Collection of general pills and collection of tag items.
 */
function createGeneralPills(pills) {
    let jqPills = $();
    let jqTags = $();
    pills.forEach((p) => {
        const [pill, tags] = createGeneralPill(p);
        jqPills = jqPills.add(pill);
        jqTags = jqTags.add(tags);
    });
    return [jqPills, jqTags];
}

// ----------------------------------------------------------------------------------------------
// --- Recipe Pills -----------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------
