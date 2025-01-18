/// <reference path="../lib/jquery-3.7.1.min.js"/>

/**
 * @typedef {{
 *      active: {
 *          type: typeof Config.SheetTypes.GENERAL;
 *          tags: Set<string>;
 *          intersection: boolean;
 *      };
 *      all: {
 *          pills: JQuery;
 *          tags: JQuery;
 *      };
 *      inputs: {
 *          tags: JQuery;
 *      };
 *      logic: {
 *          intersectionMode(active: boolean): void;
 *          selectTag(tag: string): void;
 *          unselectTag(tag: string): void;
 *          clearSelection(): void;
 *          reloadSelected(): void;
 *      }
 * }} GeneralState State type for General page
 * @typedef {GeneralState} State State type
 */

/** @type {State} */
let State = null;

/**
 * Initializes the General state.
 * @param {JQuery} pills Pills of the page.
 * @param {JQuery} tags All tag items of the pills.
 * @param {JQuery} checkboxes All menu tag items
 */
function initGeneralState(pills, tags, checkboxes) {
    State = {
        active: { type: Config.SheetTypes.GENERAL, tags: new Set(), intersection: true },
        all: { pills, tags },
        inputs: { tags: checkboxes },
        logic: {
            intersectionMode: (active) => {
                State.active.intersection = active;
                State.logic.reloadSelected();
            },
            selectTag: (tag) => {
                State.active.tags.add(tag);
                State.all.tags.filter(`[${Properties.TAG_NAME}="${tag}"]`).addClass('selected');
                State.all.pills.find
                State.logic.reloadSelected();
            },
            unselectTag: (tag) => {
                State.active.tags.delete(tag);
                State.all.tags.filter(`[${Properties.TAG_NAME}="${tag}"]`).removeClass('selected');
                State.logic.reloadSelected();
            },
            clearSelection: () => {
                State.active.tags.clear();
                State.all.tags.filter(`[${Properties.TAG_NAME}]`).removeClass('selected');
                State.logic.reloadSelected();
            },
            reloadSelected: () => {
                if (!State.active.tags.size) {
                    State.all.pills.show();
                    State.inputs.tags.find('input').prop('checked', false);
                } else {
                    // Pills
                    /** @type {(el: HTMLElement) => boolean} */
                    const numActiveTagsCheck = State.active.intersection ? (n) => n === State.active.tags.size : (n) => n > 0;
                    State.all.pills.hide();
                    State.all.pills.filter(function () {
                        return numActiveTagsCheck($(this).find('.tag').filter(function () {
                            return State.active.tags.has(this.getAttribute(Properties.TAG_NAME));
                        }).length);
                    }).show();
                    // Checkboxes
                    State.inputs.tags.find('input').prop('checked', false);
                    State.inputs.tags.filter(function () {
                        return State.active.tags.has(this.getAttribute(Properties.TAG_NAME))
                    }).find('input').prop('checked', true);
                }
            },
        },
    };
}
