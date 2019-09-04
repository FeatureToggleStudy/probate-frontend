'use strict';

const commonLocators = require('test/end-to-end/resources/common');
const pageUnderTest = require('app/steps/ui/will/codicilsnumber');

module.exports = function () {
    const I = this;
    I.amOnLoadedPage(pageUnderTest.getUrl());

    I.fillField('#codicilsNumber', '2');
    I.navByClick(commonLocators.govUkButton);
};
