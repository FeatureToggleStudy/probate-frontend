'use strict';

const e2eUtils = require('../../util/e2eUtils.js');
const convertToRadioLocator = e2eUtils.convertToRadioLocator;
const convertToCheckboxLocator = e2eUtils.convertToCheckboxLocator;

module.exports = function (noOfExecutors, whoDied) {
    const I = this;
    const allAlive = whoDied.length === 0;

    I.enterExecutorNames(noOfExecutors);
    pause();
    // I.selectExecutorsAllAlive(convertToRadioLocator(allAlive));
    // if (!allAlive) {
    //     I.selectExecutorsWhoDied(convertToCheckboxLocator(whoDied));
    // }
};
