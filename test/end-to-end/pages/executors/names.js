'use strict';

const commonLocators = require('test/end-to-end/resources/common');
const pageUnderTest = require('app/steps/ui/executors/names');

module.exports = function (totalExecutors) {
    const I = this;
    I.amOnLoadedPage(pageUnderTest.getUrl());

    let i = 0;
    while (i < (totalExecutors - 1)) {
        I.fillField('#executorName_'+i, 'exec'+(i+1));
        i += 1;
    }
    I.navByClick(commonLocators.govUkButton);
};
