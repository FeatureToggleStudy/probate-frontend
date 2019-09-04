'use strict';

const commonLocators = require('test/end-to-end/resources/common');
const pageUnderTest = require('app/steps/ui/applicant/nameasonwill');

module.exports = function (answer) {
    const I = this;
    I.amOnLoadedPage(pageUnderTest.getUrl());

    I.click(`#nameAsOnTheWill${answer}`);
    I.navByClick(commonLocators.govUkButton);
};
