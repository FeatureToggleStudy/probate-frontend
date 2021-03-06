'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/executors/dealingwithestate');

module.exports = (executorsApplyingList) => {
    const I = this;

    I.amOnLoadedPage(pageUnderTest.getUrl());

    executorsApplyingList.forEach((executorNumber) => {
        I.checkOption('#executorsApplying-' + (parseInt(executorNumber) - 1));
    });

    I.navByClick(commonContent.saveAndContinue);
};
