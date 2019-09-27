'use strict';

const e2eUtils = require('../../util/e2eUtils.js');
const convertToRadioLocator = e2eUtils.convertToRadioLocator;
const calculateExecutorsNotApplying = e2eUtils.calculateExecutorsNotApplying;
const {forEach} = require('lodash');

module.exports = function (noOfExecutors, whoDied, execsApplying) {
    const I = this;

    const execsNotApplying = calculateExecutorsNotApplying(noOfExecutors, whoDied, execsApplying);

    let firstRecord = true;
    let powerReserved = false;
    forEach(execsNotApplying, execNotApplying => {
        I.selectExecutorRoles(execNotApplying, convertToRadioLocator(powerReserved), firstRecord);
        if (powerReserved) {
            I.selectHasExecutorBeenNotified(convertToRadioLocator(powerReserved), execNotApplying);
            powerReserved = !powerReserved;
        }
        firstRecord = false;
    });
};
