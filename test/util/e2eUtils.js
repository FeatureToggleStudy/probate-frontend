'use strict';

function convertToRadioLocator(option) {
    return option ? '' : '-2';
}

function convertToCheckboxLocator(options) {
    options.map((option) => {
        return option === '1' ? '' : '-'+option;
    });
}

module.exports = {
    convertToRadioLocator,
    convertToCheckboxLocator
}
