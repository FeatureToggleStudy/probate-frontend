'use strict';

const commonLocators = require('test/end-to-end/resources/common');
const pageUnderTest = require('app/steps/ui/applicant/phone');

module.exports = function () {
    const I = this;
    I.amOnLoadedPage(pageUnderTest.getUrl());

    I.fillField('#phoneNumber', '123456789');
    I.navByClick(commonLocators.govUkButton);
};
