'use strict';

const commonContent = require('app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/applicant/relationshiptodeceased');

module.exports = function (answer) {
    const I = this;

    I.waitInUrl(pageUnderTest.getUrl());
    I.click(`#relationshipToDeceased-option${answer}`);

    I.waitForNavigationToComplete(commonContent.saveAndContinue);
};
