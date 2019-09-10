'use strict';

const e2eUtils = require('../../util/e2eUtils.js');
const convertToRadioLocator = e2eUtils.convertToRadioLocator;
const convertToCheckboxLocator = e2eUtils.convertToCheckboxLocator;
const convertExecAliasToCheckboxLocator = e2eUtils.convertExecAliasToCheckboxLocator;
const calculateRoles = e2eUtils.calculateRoles;

module.exports = function (noOfExecutors, whoDied, execsApplying, execsWithAliases) {
    const I = this;
    const allAlive = whoDied.length === 0;

    I.enterExecutorNames(noOfExecutors);
    I.selectExecutorsAllAlive(convertToRadioLocator(allAlive));
    if (!allAlive) {
        I.selectExecutorsWhoDied(convertToCheckboxLocator(whoDied));
        let i;
        for (i = 0; i < whoDied.length; i++) {
            let diedBefore = false;
            let firstRecord = false;

            if (i === 0) {
                diedBefore = true;
                firstRecord = true;
            }
            I.selectExecutorsWhenDied(whoDied[i], diedBefore, firstRecord);
        }
    }
    I.selectExecutorsApplying(convertToRadioLocator(execsApplying));
    if (execsApplying) {
        I.selectExecutorsDealingWithEstate(execsApplying);
        I.selectExecutorsWithDifferentNameOnWill(convertToRadioLocator(execsWithAliases));
        if (execsWithAliases) {
            I.selectWhichExecutorsWithDifferentNameOnWill(
                convertExecAliasToCheckboxLocator(execsApplying, execsWithAliases)
            );
            let i;
            for (i = 0; i < execsWithAliases.length; i++) {
                let firstRecord = false;

                if (i === 0) {
                    firstRecord = true;
                }
                I.enterExecutorCurrentName(execsWithAliases[i], firstRecord);
                I.enterExecutorCurrentNameReason(execsWithAliases[i]);
            }
        }
        let i;
        for (i = 0; i < execsApplying.length; i++) {
            let firstRecord = false;

            if (i === 0) {
                firstRecord = true;
            }
            I.enterExecutorContactDetails(execsApplying[i], firstRecord);
            I.enterExecutorManualAddress(execsApplying[i]);
        }
    }
    const execsWithRoles = calculateRoles(noOfExecutors, whoDied, execsApplying);
    let i;
    for (i = 0; i < execsWithRoles.length; i++) {
        let firstRecord = false;
        let powerReserved = false;

        if (i === 0) {
            firstRecord = true;
            powerReserved = true;
        }
        I.selectExecutorRoles(execsWithRoles[i], convertToRadioLocator(powerReserved), firstRecord);
        if (powerReserved) {
            I.selectHasExecutorBeenNotified(convertToRadioLocator(powerReserved), execsWithRoles[i]);
        }
    }
};
