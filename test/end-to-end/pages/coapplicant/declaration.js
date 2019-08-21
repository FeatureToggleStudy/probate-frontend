'use strict';

const pageUnderTest = require('app/steps/ui/coapplicant/declaration');

module.exports = function (answer) {
    const I = this;

    I.amOnLoadedPage(pageUnderTest.getUrl());
    I.click(`#agreement-option${answer}`);

    I.navByClick('#acceptAndSend');
};
