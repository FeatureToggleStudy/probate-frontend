'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/executors/whodied');
const {forEach} = require('lodash');

module.exports = function (whoDiedLocators) {
    const I = this;
    I.amOnLoadedPage(pageUnderTest.getUrl());

    forEach(whoDiedLocators, whoDiedLocator => {
        I.checkOption('#executorsWhoDied' + whoDiedLocator);
    });
    I.navByClick(commonContent.saveAndContinue);
};
