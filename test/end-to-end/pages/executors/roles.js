'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/executors/roles');

module.exports = function (executorNumber, powerReserved, firstRecord) {
    const I = this;

    if (firstRecord) {
        I.amOnLoadedPage(pageUnderTest.getUrl());
    } else {
        I.amOnLoadedPage(pageUnderTest.getUrl(parseInt(executorNumber) - 1));
    }

    const answer = powerReserved ? 'PowerReserved' : 'Renunciated';
    I.click(`#notApplyingReason-option${answer}`);

    I.navByClick(commonContent.saveAndContinue);
};
