'use strict';

const commonLocators = require('test/end-to-end/resources/common');
const pageUnderTest = require('app/steps/ui/executors/currentnamereason');

module.exports = function (executorNumber) {
    const I = this;

    I.amOnLoadedPage(pageUnderTest.getUrl(executorNumber));
    I.click('#currentNameReason-4');
    I.fillField('#otherReason', 'Other reason');

    I.navByClick(commonLocators.govUkButton);
};
