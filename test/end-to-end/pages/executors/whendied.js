'use strict';

const e2eUtils = require('../../../util/e2eUtils.js');
const convertToRadioLocator = e2eUtils.convertToRadioLocator;
const commonLocators = require('test/end-to-end/resources/common');
const pageUnderTest = require('app/steps/ui/executors/whendied');

module.exports = function (executorNumber, diedBefore, firstRecord) {
    const I = this;

    if (firstRecord) {
        I.amOnLoadedPage(pageUnderTest.getUrl());
    } else {
        I.amOnLoadedPage(pageUnderTest.getUrl(executorNumber));
    }

    const answer = convertToRadioLocator(diedBefore);
    I.click(`#diedbefore${answer}`);

    I.navByClick(commonLocators.govUkButton);
};
