/// <reference path="../lib/jquery-3.7.1.min.js"/>

/** @typedef {(typeof Config.SheetTypes)[keyof typeof Config.SheetTypes]} Type */

/** Configuration of the page. */
const Config = {
    /** Spreadsheet ID. */
    SPREADSHEET_ID: '1GuBlxXs-IplKkXr5Du9sAg8rKb2Y4pPrCDxACmU8bqQ',
    /** Enum of sheet names (pill types). */
    SheetTypes: {
        /** @type {'General'} */ GENERAL: 'General',
        /** @type {'Recipes'} */ RECIPES: 'Recipes',
    }
};

/** Sections of the page. */
const Sections = {
    /** Navigation bar. */
    HTML: $("html"),
    /** Navigation bar. */
    NAVBAR: $('#navbar'),
    /** Logo. */
    LOGO: $('#logo'),
    /** Page options. */
    MENU: $('#menu'),
    /** Page elements. */
    DISPLAY: $('#display'),
    /** Extra information. */
    FOOTER: $('#footer'),
    /** Personal links. */
    PERSONAL_LINKS: $('#personal-links'),
}

/** Attributes */
const Properties = {
    /** Tag name attribute */
    TAG_NAME: 'tag-name',
    /** Grid elements property */
    GRID_COLUMNS: '--grid-columns',
    /** Show details class */
    SHOW_DETAILS: 'show-details',
    /** Pill action attribute */
    PILL_ACTION: 'pill-action',
    /** Fold action attribute value */
    FOLD_ACTION: 'fold',
    /** Unfold action attribute value */
    UNFOLD_ACTION: 'unfold',
    /** Pallete attribute */
    PALLETE: "pallete",
    /** Pallete types */
    PALLETE_TYPES: ["red", "yellow", "blue-yellow"],
}

/**
 * Debug print function.
 * @param {*[]} message 
 */
function debug(...message) {
    console.log(`[${new Date().toISOString()}]`, ...message);
}