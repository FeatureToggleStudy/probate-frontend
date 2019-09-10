'use strict';

const commonLocators = require('test/end-to-end/resources/common');
const pageUnderTest = require('app/steps/ui/executors/currentname');

module.exports = function (executorNumber, firstRecord) {
    const I = this;

    if (firstRecord) {
        I.amOnLoadedPage(pageUnderTest.getUrl());
    } else {
        I.amOnLoadedPage(pageUnderTest.getUrl(executorNumber));
    }

    I.fillField('#currentName', `Executor${executorNumber} Current Name`);

    I.navByClick(commonLocators.govUkButton);
};
