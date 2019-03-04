'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/screeners/relatedtodeceased/index');

module.exports = function (answer) {
    const I = this;

    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.click(`#related-option${answer}`);

    I.waitForNavigationToComplete(`input[value="${commonContent.continue}"]`);
};