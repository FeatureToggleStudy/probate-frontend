'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/executors/address/index');

module.exports = function (executorNumber) {
    const I = this;

    I.seeCurrentUrlEquals(pageUnderTest.getUrl(parseInt(executorNumber)-1));
    I.click('.summary');
    I.fillField('#addressLine1', 'additional executor test address line 1');
    I.fillField('#addressLine2', 'additional executor test address line 2');
    I.fillField('#addressLine3', 'additional executor test address line 3');
    I.fillField('#postTown', 'additional executor test address town');
    I.fillField('#newPostCode', 'postcode');

    I.waitForNavigationToComplete(`input[value="${commonContent.saveAndContinue}"]`);
};
