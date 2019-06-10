'use strict';

const pageUnderTest = require('app/steps/ui/coapplicant/agreepage');

module.exports = function (isLast = false) {
    const I = this;

    I.seeCurrentUrlEquals(pageUnderTest.getUrl());

    if (!isLast) {
        I.see('When everyone');
    } else {
        I.see('All executors applying');
    }
};
