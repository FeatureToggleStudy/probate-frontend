'use strict';

const e2eUtils = require('../../util/e2eUtils.js');
const convertToRadioLocator = e2eUtils.convertToRadioLocator;

module.exports = function (paper, alias, codicils) {
    const I = this;

    I.selectATask();
    I.enterDeceasedName();
    I.enterDeceasedDateOfBirth();
    I.enterDeceasedDateOfDeath();
    I.enterDeceasedAddress();
    I.selectDocumentsToUpload();
    I.selectInheritanceMethod(convertToRadioLocator(paper));
    if (paper) {
        I.enterIHTPaperValues();
    } else {
        I.enterIHTIdentifier();
        I.enterIHTOnlineValues();
    }
    I.selectDeceasedAlias(convertToRadioLocator(alias));
    if (alias) {
        I.enterDeceasedAliases();
    }
    I.selectDeceasedMarried();
    I.selectCodicils(convertToRadioLocator(codicils));
    if (codicils) {
        I.selectNoOfCodicils();
    }
};
