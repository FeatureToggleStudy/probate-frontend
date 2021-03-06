'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/will/codicilsnumber');

module.exports = (totalCodicils) => {
    const I = this;

    I.amOnLoadedPage(pageUnderTest.getUrl());
    I.fillField('#codicilsNumber', totalCodicils);

    I.navByClick(commonContent.saveAndContinue);
};
