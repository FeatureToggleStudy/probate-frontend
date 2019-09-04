'use strict';

const commonLocators = require('test/end-to-end/resources/common');
const pageUnderTest = require('app/steps/ui/applicant/name');

module.exports = function () {
    const I = this;
    I.amOnLoadedPage(pageUnderTest.getUrl());
    I.fillField('#firstName', 'Applicant_fn');
    I.fillField('#lastName', 'Applicant_ln');
    I.navByClick(commonLocators.govUkButton);
};
