'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/documentupload');

module.exports = () => {
    const I = this;

    I.amOnLoadedPage(pageUnderTest.getUrl());

    I.waitForVisible('.document-upload__dropzone-text--choose-file');

    I.uploadDocumentIfNotMicrosoftEdge();

    I.navByClick(commonContent.continue);
};
