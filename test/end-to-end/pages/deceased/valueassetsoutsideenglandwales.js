'use strict';

const pageUnderTest = require('app/steps/ui/iht/valueassetsoutside');
const commonContent = require('app/resources/en/translation/common');

module.exports = (netAmount) => {
    const I = this;

    I.amOnLoadedPage(pageUnderTest.getUrl());

    I.fillField('#netValueAssetsOutsideField', netAmount);

    I.navByClick(commonContent.saveAndContinue);
};
