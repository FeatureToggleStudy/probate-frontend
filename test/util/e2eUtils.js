'use strict';

function convertToRadioLocator(option) {
    return option ? '' : '-2';
}

function convertToCheckboxLocator(options) {
    return options.map((option) => {
        return option === 1 ? '' : '-'+option;
    });
}

function convertExecAliasToCheckboxLocator(execsApplying, execsWithAliases) {
    const indexes = execsApplying
        .filter(x => execsWithAliases.includes(x))
        .map(x => execsApplying.indexOf(x)+1);
    return convertToCheckboxLocator(indexes);
}

module.exports = {
    convertToRadioLocator,
    convertToCheckboxLocator,
    convertExecAliasToCheckboxLocator
};
