'use strict';

const e2eUtils = require('../../util/e2eUtils.js');
const convertToRadioLocator = e2eUtils.convertToRadioLocator;
const calculateRoles = e2eUtils.calculateRoles;

module.exports = function (noOfExecutors, whoDied, execsApplying) {
    const I = this;

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
