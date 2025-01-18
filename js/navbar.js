/// <reference path="../lib/jquery-3.7.1.min.js"/>

/**
 * Creates a nav element.
 * @param {Type} type Related sheet of the element.
 * @returns {JQuery} JQuery element.   
 */
function createNavButton(type) {
    return $(`<button type="button" class="button nav">${type}</button>`);
}

/**
 * Handles the nav element click.
 * @param {Type} type Related sheet of the link.
 */
function handleNavElementClick(type) {
    if (State.active.type !== type) {
        debug(`[NAVBAR] [CLICKED] ${type}`);
    }
}

/**
 * Navigation bar elements
 * @type {Record<Type, JQuery>}
 */
const NavElements = Object.values(Config.SheetTypes).reduce((elements, type) => {
    const element = createNavButton(type).on('click', () => handleNavElementClick(type));
    Sections.NAVBAR.append(element);
    elements[type] = element;
    return elements;
}, {});