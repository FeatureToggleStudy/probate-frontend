'use strict';

const commonLocators = require('test/end-to-end/resources/common');
const pageUnderTest = require('app/steps/ui/executors/dealingwithestate');
const {forEach} = require('lodash');

module.exports = function (executorsApplying) {
    const I = this;

    I.amOnLoadedPage(pageUnderTest.getUrl());

    forEach(executorsApplying, executorNumber => {
        I.checkOption('#executorsApplying-' + executorNumber);
    });

    I.navByClick(commonLocators.govUkButton);
};
