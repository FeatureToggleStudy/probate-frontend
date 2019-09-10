'use strict';

const commonLocators = require('test/end-to-end/resources/common');
const pageUnderTest = require('app/steps/ui/executors/roles');

module.exports = function (executorNumber, answer, firstRecord) {
    const I = this;

    if (firstRecord) {
        I.amOnLoadedPage(pageUnderTest.getUrl());
    } else {
        I.amOnLoadedPage(pageUnderTest.getUrl(executorNumber));
    }

    I.click(`#notApplyingReason${answer}`);

    I.navByClick(commonLocators.govUkButton);
};
