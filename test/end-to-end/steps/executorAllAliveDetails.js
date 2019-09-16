'use strict';

const e2eUtils = require('../../util/e2eUtils.js');
const convertToRadioLocator = e2eUtils.convertToRadioLocator;
const convertToCheckboxLocator = e2eUtils.convertToCheckboxLocator;
const {forEach} = require('lodash');

module.exports = function (noOfExecutors, whoDied) {
    const I = this;
    const allAlive = whoDied.length === 0;

    I.enterExecutorNames(noOfExecutors);
    I.selectExecutorsAllAlive(convertToRadioLocator(allAlive));
    if (!allAlive) {
        I.selectExecutorsWhoDied(convertToCheckboxLocator(whoDied));

        let firstRecord = true;
        forEach(whoDied, deadExec => {
            I.selectExecutorsWhenDied(deadExec, firstRecord);
            firstRecord = false;
        });
    }
};
