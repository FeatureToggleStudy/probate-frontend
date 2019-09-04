'use strict';

const commonLocators = require('test/end-to-end/resources/common');
const pageUnderTest = require('app/steps/ui/summary');

module.exports = function (redirect) {
    const I = this;
    I.amOnLoadedPage(pageUnderTest.getUrl(redirect));

    I.downloadPdfIfNotIE11('#checkAnswerHref');
    I.navByClick(commonLocators.govUkButton);
};
