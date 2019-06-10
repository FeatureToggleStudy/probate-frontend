'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/documentupload');
const testConfig = require('test/config');

module.exports = function (disableScript = false) {
    const I = this;

    I.seeCurrentUrlEquals(pageUnderTest.getUrl());

    if (disableScript) {
        I.attachFile('#file', testConfig.TestDocumentToUpload);
        I.waitForNavigationToComplete('input[value="Upload document"]');
    } else {
        I.attachFile('.dz-hidden-input', testConfig.TestDocumentToUpload);
        I.waitForEnabled('#button', testConfig.TestDocumentToUpload);
    }

    I.waitForNavigationToComplete(`input[value="${commonContent.continue}"]`);
};
