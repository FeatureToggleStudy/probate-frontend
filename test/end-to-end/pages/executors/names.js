'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/executors/names');

module.exports = (totalExecutors) => {
    const I = this;

    I.amOnLoadedPage(pageUnderTest.getUrl());

    let i = 0;

    while (i < (totalExecutors - 1)) {
        I.fillField('#executorName_' + i, 'exec' + (i + 2));
        i += 1;
    }

    I.navByClick(commonContent.saveAndContinue);
};
