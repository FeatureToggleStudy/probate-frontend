'use strict';

const convertToLocator = require('../../util/e2eUtils.js');

module.exports = function (assetsOverseas) {
    const I = this;

    I.selectATask();
    I.enterUkCopies();
    I.selectOverseasAssets(convertToLocator(assetsOverseas));
    if (assetsOverseas) {
        I.enterOverseasCopies();
    }
    I.seeCopiesSummary();
};
