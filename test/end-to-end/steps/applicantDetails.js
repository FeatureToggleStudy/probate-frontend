'use strict';

const convertToLocator = require('../../util/e2eUtils.js');

module.exports = function (alias, numberOfExecutors) {
    const I = this;

    I.selectATask();
    I.enterApplicantName();
    I.selectApplicantNameAsOnWill(convertToLocator(!alias));
    if (alias) {
        I.enterApplicantAlias();
        I.enterApplicantAliasReason();
    }
    I.enterApplicantPhone();
    I.enterApplicantAddress();
    I.enterTotalExecutors(numberOfExecutors);
};
