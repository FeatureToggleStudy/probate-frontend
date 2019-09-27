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

function calculateExecutorsNotApplying(noOfExecs, whoDied, execsApplying) {
    const execTotalArray = [...Array(noOfExecs).keys()];
    execTotalArray.shift();

    const applyingOrDied = execsApplying.concat(whoDied);
    return execTotalArray.filter(x => !applyingOrDied.includes(x));
}

module.exports = {
    convertToRadioLocator,
    convertToCheckboxLocator,
    convertExecAliasToCheckboxLocator,
    calculateExecutorsNotApplying
};
