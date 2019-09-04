'use strict';

const commonLocators = require('test/end-to-end/resources/common');
const documentsContent = require('app/resources/en/translation/documents');
const pageUnderTest = require('app/steps/ui/documents');

module.exports = function (paperIhtFormUsed, deathCertUploaded, spouseRenouncing) {
    const I = this;
    I.amOnLoadedPage(pageUnderTest.getUrl());

    if (paperIhtFormUsed) {
        I.see(documentsContent['checklist-item4-iht205']);
    }
    if (!deathCertUploaded) {
        I.see(documentsContent['checklist-item3-will-uploaded']);
    }
    if (spouseRenouncing) {
        const spouseRenouncingContent = 'filled in by the spouse or civil partner of the deceased who is permanently giving up the right to make this application for probate';
        I.see(spouseRenouncingContent);
    }

    I.downloadPdfIfNotIE11('#coverSheetPdfHref');
    I.navByClick(commonLocators.govUkButton);
};
