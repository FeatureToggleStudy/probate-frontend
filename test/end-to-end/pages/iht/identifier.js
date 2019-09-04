'use strict';

const commonLocators = require('test/end-to-end/resources/common');
const pageUnderTest = require('app/steps/ui/iht/identifier');

module.exports = function () {
    const I = this;
    I.amOnLoadedPage(pageUnderTest.getUrl());
    I.fillField('#identifier', '123456789XXXXX');
    I.navByClick(commonLocators.govUkButton);
};
