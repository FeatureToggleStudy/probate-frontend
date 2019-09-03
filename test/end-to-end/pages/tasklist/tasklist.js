'use strict';

const tasklistContent = require('app/resources/en/translation/tasklist');
const pageUnderTest = require('app/steps/ui/tasklist');
const testConfig = require('test/config.js');
const commonLocators = require('test/end-to-end/resources/common');

module.exports = function () {
    const I = this;
    I.waitForText(tasklistContent.introduction, testConfig.TestWaitForTextToAppear);
    I.amOnLoadedPage(pageUnderTest.getUrl());

    I.click(commonLocators.govUkButton);
};
