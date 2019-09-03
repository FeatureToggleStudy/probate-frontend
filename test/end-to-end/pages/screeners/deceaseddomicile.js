'use strict';

const commonLocators = require('test/end-to-end/resources/common');
const pageUnderTest = require('app/steps/ui/screeners/deceaseddomicile');

module.exports = function (answer) {
    const I = this;

    I.amOnLoadedPage(pageUnderTest.getUrl());
    I.click(`#domicile${answer}`);
    I.navByClick(commonLocators.govUkButton);
};
