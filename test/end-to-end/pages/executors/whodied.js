'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/executors/whodied');
const {forEach} = require('lodash');

module.exports = (executorsWhoDiedList) => {
    const I = this;

    I.amOnLoadedPage(pageUnderTest.getUrl());

    forEach(executorsWhoDiedList, (executorNumber) => {
        I.checkOption('#executorsWhoDied-'+(parseInt(executorNumber) - 1));
    });

    I.navByClick(commonContent.saveAndContinue);
};
