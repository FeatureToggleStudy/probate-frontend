'use strict';

const paymentStatusContent = require('app/resources/en/translation/payment/status');
const commonLocators = require('test/end-to-end/resources/common');
const pageUnderTest = require('app/steps/ui/payment/status');
const testConfig = require('test/config.js');

module.exports = function () {
    const I = this;

    I.waitForText(paymentStatusContent.question, testConfig.TestWaitForTextToAppear);
    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.navByClick(commonLocators.govUkButton);
};
