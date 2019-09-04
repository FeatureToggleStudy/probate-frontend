'use strict';

const commonLocators = require('test/end-to-end/resources/common');
const pageUnderTest = require('app/steps/ui/will/codicils');

module.exports = function (option) {
    const I = this;
    I.amOnLoadedPage(pageUnderTest.getUrl());

    I.click(`#codicils${option}`);
    I.navByClick(commonLocators.govUkButton);
};
