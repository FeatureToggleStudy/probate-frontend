'use strict';

const commonContent = require('app/resources/en/translation/common');
const content = require('app/resources/en/translation/applicant/phone');
const pageUnderTest = require('app/steps/ui/applicant/phone');

module.exports = () => {
    const I = this;
    I.amOnLoadedPage(pageUnderTest.getUrl());
    I.fillField(content.phoneNumber, '123456789');

    I.navByClick(commonContent.saveAndContinue);
};
