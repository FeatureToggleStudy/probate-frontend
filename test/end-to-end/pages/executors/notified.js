'use strict';

const commonLocators = require('test/end-to-end/resources/common');
const pageUnderTest = require('app/steps/ui/executors/notified');

module.exports = function (answer, executorNumber) {
    const I = this;

    I.amOnLoadedPage(pageUnderTest.getUrl(executorNumber));
    I.click(`#executorNotified${answer}`);

    I.navByClick(commonLocators.govUkButton);
};
