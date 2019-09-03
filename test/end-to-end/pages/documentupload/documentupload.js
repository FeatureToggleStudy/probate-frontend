'use strict';

const commonLocators = require('test/end-to-end/resources/common');
const pageUnderTest = require('app/steps/ui/documentupload');
//const testConfig = require('test/config');

module.exports = function (uploadDocument=false) {
    const I = this;

    I.amOnLoadedPage(pageUnderTest.getUrl());

    I.waitForVisible('.document-upload__dropzone-text--choose-file');

    if (uploadDocument) {
        I.uploadDocumentIfNotMicrosoftEdge();
    }

    I.navByClick(commonLocators.govUkButton);
};
