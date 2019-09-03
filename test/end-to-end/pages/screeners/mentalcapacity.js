'use strict';

const commonLocators = require('test/end-to-end/resources/common');
const pageUnderTest = require('app/steps/ui/screeners/mentalcapacity');

module.exports = function (answer) {
    const I = this;

    I.amOnLoadedPage(pageUnderTest.getUrl());
    I.click(`#mentalCapacity${answer}`);
    I.navByClick(commonLocators.govUkButton);
};
