'use strict';

const e2eUtils = require('../../util/e2eUtils.js');
const convertToRadioLocator = e2eUtils.convertToRadioLocator;
const convertExecAliasToCheckboxLocator = e2eUtils.convertExecAliasToCheckboxLocator;
const {forEach} = require('lodash');

module.exports = function (execsApplying, execsWithAliases) {
    const I = this;

    I.selectExecutorsApplying(convertToRadioLocator(execsApplying));
    if (execsApplying) {
        I.selectExecutorsDealingWithEstate(execsApplying);
        I.selectExecutorsWithDifferentNameOnWill(convertToRadioLocator(execsWithAliases));
        if (execsWithAliases) {
            I.selectWhichExecutorsWithDifferentNameOnWill(
                convertExecAliasToCheckboxLocator(execsApplying, execsWithAliases)
            );

            let firstRecord = true;
            forEach(execsWithAliases, execWithAliases => {
                I.enterExecutorCurrentName(execWithAliases, firstRecord);
                I.enterExecutorCurrentNameReason(execWithAliases);
                firstRecord = false;
            });
        }

        let firstRecord = true;
        forEach(execsApplying, execApplying => {
            I.enterExecutorContactDetails(execApplying, firstRecord);
            I.enterExecutorManualAddress(execApplying);
            firstRecord = false;
        });
    }
};
