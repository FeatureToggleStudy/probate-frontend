'use strict';

module.exports = function (paper, alias, codicils) {
    const I = this;

    I.selectATask();
    I.enterDeceasedName();
    I.enterDeceasedDateOfBirth();
    I.enterDeceasedDateOfDeath();
    I.enterDeceasedAddress();
    I.selectDocumentsToUpload();
    I.selectInheritanceMethod(convertToLocator(paper));
    if (paper) {
        I.enterIHTPaperValues();
    } else {
        I.enterIHTIdentifier();
        I.enterIHTOnlineValues();
    }
    I.selectDeceasedAlias(convertToLocator(alias));
    if (alias) {
        I.enterDeceasedAliases();
    }
    I.selectDeceasedMarried();
    I.selectCodicils(convertToLocator(codicils));
    if (codicils) {
        I.selectNoOfCodicils();
    }
};

function convertToLocator(option) {
    return option ? '' : '-2';
}
