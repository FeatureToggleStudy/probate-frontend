'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/deceased/dob');

module.exports = function (day, month, year) {
    const I = this;
    I.waitInUrl(pageUnderTest.getUrl());

    I.fillField('#dob_day', day);
    I.fillField('#dob_month', month);
    I.fillField('#dob_year', year);

    I.waitForNavigationToComplete(commonContent.saveAndContinue);
};
