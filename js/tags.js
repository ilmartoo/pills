/// <reference path="../lib/jquery-3.7.1.min.js"/>

/**
 * Creates a tag checkbox for the menu.
 * @param {string} tag Tag name.
 * @returns {JQuery} JQuery element.
 */
function createTagCheckbox(tag) {
    return $(`<li class="tag" ${Properties.TAG_NAME}="${tag}"><label><input type="checkbox"/> ${tag}</label></li>`).on('change', function(e) {        
        const checked = $(this).find('input').prop('checked');
        if (checked) { State.logic.selectTag(tag); }
        else { State.logic.unselectTag(tag); }
    });
}

/**
 * Creates the tag list menu.
 * @param {string[]} tags List of tags.
 * @returns {JQuery} The list of tags.
 */
function createTagMenu(tags) {
    return tags.reduce((jq, tag) => jq.add(createTagCheckbox(tag)), $());
}