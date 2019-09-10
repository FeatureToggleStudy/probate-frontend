'use strict';

const commonLocators = require('test/end-to-end/resources/common');
const pageUnderTest = require('app/steps/ui/executors/contactdetails');
const testConfig = require('test/config');

module.exports = function (executorNumber, firstRecord) {
    const I = this;

    if (firstRecord) {
        I.amOnLoadedPage(pageUnderTest.getUrl());
    } else {
        I.amOnLoadedPage(pageUnderTest.getUrl(executorNumber));
    }

    I.fillField('#email', testConfig.TestEnvEmailAddress);
    I.fillField('#mobile', testConfig.TestEnvMobileNumber);

    I.navByClick(commonLocators.govUkButton);
};
