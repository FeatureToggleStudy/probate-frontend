'use strict';

const commonLocators = require('test/end-to-end/resources/common');
const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/deceased/address');

module.exports = function () {
    const I = this;

    I.amOnLoadedPage(pageUnderTest.getUrl());
    I.waitForInvisible('#addressLine1');
    I.click(commonLocators.manualAddressLink);
    I.waitForVisible('#addressLine1');

    I.fillField('#addressLine1', 'test address for deceased line 1');
    I.fillField('#addressLine2', 'test address for deceased line 2');
    I.fillField('#addressLine3', 'test address for deceased line 3');
    I.fillField('#postTown', 'test address for deceased town');
    I.fillField('#newPostCode', 'postcode');
    I.fillField('#country', 'country');

    I.navByClick(commonContent.saveAndContinue);
};
