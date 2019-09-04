'use strict';

const commonContent = require('app/resources/en/translation/common');
const otherNameContent = require('app/resources/en/translation/deceased/otherNames');
const pageUnderTest = require('app/steps/ui/deceased/otherNames');

module.exports = function () {
    const I = this;
    I.amOnLoadedPage(pageUnderTest.getUrl());

    I.fillField('#otherNames_name_0_firstName', 'Alias_fn_1');
    I.fillField('#otherNames_name_0_lastName', 'Alias_ln_1');
    I.navByClick(otherNameContent.addAnotherName);
    I.fillField('#otherNames_name_1_firstName', 'Alias_fn_2');
    I.fillField('#otherNames_name_1_lastName', 'Alias_ln_2');
    I.navByClick(commonContent.saveAndContinue);
};
