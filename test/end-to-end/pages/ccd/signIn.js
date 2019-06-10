'use strict';

const testConfig = require('test/config.js');

module.exports = function () {
    const I = this;

    I.see('Sign in');
    I.fillField('#username', testConfig.TestCCDEmailAddress);
    I.fillField('#password', testConfig.TestCCDPassword);

    I.waitForNavigationToComplete('input[value="Sign in"]');
};
