'use strict';

const e2eUtils = require('../../util/e2eUtils.js');
const convertToRadioLocator = e2eUtils.convertToRadioLocator;

module.exports = function (alias, numberOfExecutors=1) {
    const I = this;

    I.selectATask();
    I.enterApplicantName();
    I.selectApplicantNameAsOnWill(convertToRadioLocator(!alias));
    if (alias) {
        I.enterApplicantAlias();
        I.enterApplicantAliasReason();
    }
    I.enterApplicantPhone();
    I.enterApplicantAddress();
    I.enterTotalExecutors(numberOfExecutors);
};
