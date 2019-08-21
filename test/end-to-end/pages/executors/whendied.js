'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/executors/whendied');

module.exports = function (executorNumber, diedBefore, firstRecord) {
    const I = this;

    if (firstRecord) {
        I.amOnLoadedPage(pageUnderTest.getUrl());
    } else {
        I.amOnLoadedPage(pageUnderTest.getUrl(parseInt(executorNumber) - 1));
    }

    const answer = diedBefore ? 'Yes' : 'No';
    I.click(`#diedbefore-option${answer}`);

    I.navByClick(commonContent.saveAndContinue);
};
