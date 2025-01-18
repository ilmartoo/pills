/// <reference path="../lib/jquery-3.7.1.min.js"/>

/**
 * Loads the general page
 */
async function loadGeneralPage() {
    const result = parseGeneralPills(await requestPills(Config.SheetTypes.GENERAL));

    const [pills, tags] = createGeneralPills(result.pills);
    const menuTags = createTagMenu(result.tags);

    Sections.DISPLAY.children().remove();
    Sections.MENU.children().remove();
    Sections.MENU.append(
        $('<li><button class="button main full-width">Fold all</button></li>').on('click', () => State.all.pills.find(`[${Properties.PILL_ACTION}="${Properties.FOLD_ACTION}"]`).trigger('click')),
        $('<li><button class="button main full-width">Unfold all</button></li>').on('click', () => State.all.pills.find(`[${Properties.PILL_ACTION}="${Properties.UNFOLD_ACTION}"]`).trigger('click')),
        '<li class="separator"></li>',
        $('<li class="tag"><label><input type="checkbox" class="toggle-switch"/> Intersect mode </label></li>').on('change', function () { State.logic.intersectionMode(!!$(this).find('input').prop('checked')) }),
        '<li class="separator"></li>',
        $('<li><button class="button secondary full-width">Clear selection</button></li>').on('click', () => State.logic.clearSelection()),
        menuTags,
    );
    Sections.DISPLAY.append(pills);

    calculateGridElements();
    initGeneralState(pills, tags, menuTags);
}

/**
 * Inserts a personal link.
 * @param {string} link Link of the personal information.
 * @param {string} title Title of the link.
 * @param {string} [icon] Icon to display.
 */
function insertPersonalLink(link, title, icon) {
    Sections.PERSONAL_LINKS.append(`<li><a href="${link}" target="_blank" title="${title}">${icon || title}</a></li>`);
}

/**
 * Inserts all the needed personal links.
 */
function insertAllPersonalLinks() {
    insertPersonalLink('https://github.com/ilmartoo', 'GitHub', Icons.GITHUB);
    insertPersonalLink('https://www.linkedin.com/in/martin-sz', 'LinkedIn', Icons.LINKEDIN);
}

/**
 * Calculates the number of grid elements to show per row.
 */
function calculateGridElements() {
    const gridColumns = Math.max(Math.trunc(((Sections.DISPLAY.width() / 100) - 2) / 4), 1);
    Sections.DISPLAY.css(Properties.GRID_COLUMNS, gridColumns);
}

function initPallleteChangeLogic() {
    Sections.LOGO.on("click", () => State.logic.nextPallete());
}

// ----------------------------------------------------------------------------------------------

$(() => {
    insertAllPersonalLinks();
    initPallleteChangeLogic();
    loadGeneralPage();
});

$(window).on('resize', () => calculateGridElements());
