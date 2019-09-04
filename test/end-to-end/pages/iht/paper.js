'use strict';

const pageUnderTest = require('app/steps/ui/iht/paper');
const commonLocators = require('test/end-to-end/resources/common');

module.exports = function () {
    const I = this;

    I.amOnLoadedPage(pageUnderTest.getUrl());
    I.click('#form');
    I.fillField('#grossValueFieldIHT205', '250000');
    I.fillField('#netValueFieldIHT205', '240000');
    I.navByClick(commonLocators.govUkButton);
};
