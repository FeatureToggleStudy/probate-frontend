'use strict';

const pageUnderTest = require('app/steps/ui/thankyou');
const commonContent = require('app/resources/en/translation/common');
const thankYouContent = require('app/resources/en/translation/thankyou');
const testConfig = require('test/config.js');

module.exports = function () {
    const I = this;

    I.amOnPage(pageUnderTest.getUrl());
    I.waitForText(thankYouContent.header, testConfig.TestWaitForTextToAppear);

    I.downloadPdfIfNotIE11('#checkAnswerHref');
    I.downloadPdfIfNotIE11('#declarationPdfHref');
    I.downloadPdfIfNotIE11('#coverSheetPdfHref');
    I.click(commonContent.signOut);
};
