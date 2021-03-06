'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/copies/overseas');

module.exports = (copies) => {
    const I = this;

    I.amOnLoadedPage(pageUnderTest.getUrl());
    I.fillField('#overseas', copies);

    I.navByClick(commonContent.saveAndContinue);
};
