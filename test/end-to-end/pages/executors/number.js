'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/executors/number');

module.exports = (totalExecutors) => {
    const I = this;

    I.amOnLoadedPage(pageUnderTest.getUrl());

    I.fillField('#executorsNumber', totalExecutors);

    I.navByClick(commonContent.saveAndContinue);
};
