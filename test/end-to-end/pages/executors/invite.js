'use strict';

const content = require('app/resources/en/translation/executors/invite');
const pageUnderTest = require('app/steps/ui/executors/invite');

module.exports = () => {
    const I = this;

    I.amOnLoadedPage(pageUnderTest.getUrl());

    I.navByClick(content.sendInvites);
};
