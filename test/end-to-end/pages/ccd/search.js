'use strict';

const testConfig = require('test/config.js');

module.exports = function (ccdRef) {
    const I = this;

    I.seeCurrentUrlEquals(`${testConfig.TestCCDUrl}/list/case?jurisdiction=PROBATE&case-type=GrantOfRepresentation&case-state=CaseCreated`);
    I.waitForNavigationToComplete(`${testConfig.TestCCDUrl}/case/PROBATE/GrantOfRepresentation/${ccdRef}`);
};
