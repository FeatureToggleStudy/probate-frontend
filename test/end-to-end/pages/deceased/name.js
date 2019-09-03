'use strict';

const commonLocators = require('test/end-to-end/resources/common');
const pageUnderTest = require('app/steps/ui/deceased/name');

module.exports = function () {
    const I = this;
    I.amOnLoadedPage(pageUnderTest.getUrl());

    I.fillField('#firstName', 'Deceased_fn');
    I.fillField('#lastName', 'Deceased_ln');
    I.navByClick(commonLocators.govUkButton);
};
