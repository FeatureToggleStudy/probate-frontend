'use strict';

const e2eUtils = require('../../util/e2eUtils.js');
const convertToRadioLocator = e2eUtils.convertToRadioLocator;

module.exports = function (assetsOverseas) {
    const I = this;

    I.selectATask();
    I.enterUkCopies();
    I.selectOverseasAssets(convertToRadioLocator(assetsOverseas));
    if (assetsOverseas) {
        I.enterOverseasCopies();
    }
    I.seeCopiesSummary();
};
