'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/documentupload');
const testConfig = require('test/config');

module.exports = function (disableScript = false) {
    const I = this;
    const documents = testConfig.TestDocumentsToUpload;

    I.seeCurrentUrlEquals(pageUnderTest.getUrl());

    if (disableScript) {
        for (let i = 0; i < documents.length; i++) {
            I.attachFile('#file', documents[i]);
            I.waitForNavigationToComplete('input[value="Upload document"]');
        }
    } else {
        for (let i = 0; i < documents.length; i++) {
            I.attachFile('.dz-hidden-input', documents[i]);
            I.waitForEnabled('#button', documents[i]);
        }
    }

    I.waitForNavigationToComplete(`input[value="${commonContent.continue}"]`);
};
