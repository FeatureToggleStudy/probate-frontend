'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/applicant/alias');

module.exports = (alias) => {
    const I = this;
    I.amOnLoadedPage(pageUnderTest.getUrl());
    I.fillField('#alias', alias);

    I.navByClick(commonContent.saveAndContinue);
};
