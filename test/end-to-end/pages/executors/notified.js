'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/executors/notified');

module.exports = function (answer, executorNumber) {
    const I = this;

    I.amOnLoadedPage(pageUnderTest.getUrl(parseInt(executorNumber) - 1));
    I.click(`#executorNotified-option${answer}`);

    I.navByClick(commonContent.saveAndContinue);
};
