'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/screeners/otherapplicants');

module.exports = function (answer) {
    const I = this;

    I.waitInUrl(pageUnderTest.getUrl());
    I.click(`#otherApplicants-option${answer}`);

    I.waitForNavigationToComplete(`input[value="${commonContent.continue}"]`);
};
