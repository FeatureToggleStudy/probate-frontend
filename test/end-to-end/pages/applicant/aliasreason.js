'use strict';

const commonLocators = require('test/end-to-end/resources/common');
const pageUnderTest = require('app/steps/ui/applicant/aliasreason');

module.exports = function () {
    const I = this;
    I.amOnLoadedPage(pageUnderTest.getUrl());

    I.click('#aliasReason-4');
    I.fillField('#otherReason', 'Name misspelt on will');
    I.navByClick(commonLocators.govUkButton);
};
