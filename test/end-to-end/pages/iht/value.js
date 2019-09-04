'use strict';

const commonLocators = require('test/end-to-end/resources/common');
const pageUnderTest = require('app/steps/ui/iht/value');

module.exports = function () {
    const I = this;
    I.amOnLoadedPage(pageUnderTest.getUrl());
    I.fillField('#grossValueField', '2500000');
    I.fillField('#netValueField', '2400000');
    I.navByClick(commonLocators.govUkButton);
};
