'use strict';

const commonContent = require('../../../../app/resources/en/translation/common');
const pageUnderTest = require('app/steps/ui/screeners/otherapplicants/index');

module.exports = function (answer) {
    const I = this;

    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    I.click(`#otherApplicants-option${answer}`);

    I.click(commonContent.continue);
};
