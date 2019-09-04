'use strict';

module.exports = function (alias) {
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
};

function convertToLocator(option) {
    return option ? '' : '-2';
}
