'use strict';

const commonLocators = require('test/end-to-end/resources/common');
const pageUnderTest = require('app/steps/ui/deceased/dob');

module.exports = function (saveAndClose = false) {
    const I = this;
    I.amOnLoadedPage(pageUnderTest.getUrl());

    I.fillField('#dob-day', '01');
    I.fillField('#dob-month', '01');
    I.fillField('#dob-year', '2000');

    if (saveAndClose) {
        I.navByClick(commonLocators.govUkLink);
    } else {
        I.navByClick(commonLocators.govUkButton);
    }
};
