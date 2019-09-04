'use strict';

const commonLocators = require('test/end-to-end/resources/common');
const pageUnderTest = require('app/steps/ui/applicant/alias');

module.exports = function () {
    const I = this;
    I.amOnLoadedPage(pageUnderTest.getUrl());

    I.fillField('#alias', 'Applicant_alias');
    I.navByClick(commonLocators.govUkButton);
};
