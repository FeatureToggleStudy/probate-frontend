'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/deceased/name');

module.exports = (firstName, lastName) => {
    const I = this;
    I.amOnLoadedPage(pageUnderTest.getUrl());

    I.fillField('#firstName', firstName);
    I.fillField('#lastName', lastName);

    I.navByClick(commonContent.saveAndContinue);
};
