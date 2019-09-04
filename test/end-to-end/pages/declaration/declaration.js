'use strict';

const commonLocators = require('test/end-to-end/resources/common');
const pageUnderTest = require('app/steps/ui/declaration');

module.exports = function () {
    const I = this;
    I.amOnLoadedPage(pageUnderTest.getUrl());

    I.downloadPdfIfNotIE11('#declarationPdfHref');
    I.click('#declarationCheckbox');
    I.navByClick(commonLocators.govUkButton);
};
