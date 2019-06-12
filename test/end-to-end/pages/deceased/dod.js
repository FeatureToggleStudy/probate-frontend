'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/deceased/dod');

module.exports = function (day, month, year, saveAndClose = false) {
    const I = this;
    I.waitInUrl(pageUnderTest.getUrl());

    I.fillField('#dod_day', day);
    I.fillField('#dod_month', month);
    I.fillField('#dod_year', year);

    if (saveAndClose) {
        I.waitForNavigationToComplete('.column-two-thirds > p a');
    } else {
        I.waitForNavigationToComplete(commonContent.saveAndContinue);
    }
};
