'use strict';

const commonLocators = require('test/end-to-end/resources/common');
const pageUnderTest = require('app/steps/ui/executors/othername');
const {forEach} = require('lodash');

module.exports = function (execIds) {
    const I = this;

    I.amOnLoadedPage(pageUnderTest.getUrl());
    forEach(execIds, id => {
        I.checkOption('#executorsWithOtherNames'+ id);
    });

    I.navByClick(commonLocators.govUkButton);
};
