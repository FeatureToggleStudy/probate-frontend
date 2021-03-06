'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/applicant/name');

module.exports = (firstname, lastname) => {
    const I = this;
    I.amOnLoadedPage(pageUnderTest.getUrl());
    I.fillField('#firstName', firstname);
    I.fillField('#lastName', lastname);

    I.navByClick(commonContent.saveAndContinue);
};
