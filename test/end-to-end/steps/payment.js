'use strict';

module.exports = function () {
    const I = this;

    I.selectATask();
    I.seePaymentBreakdown();
    I.enterGovUkPayment();
    I.seeGovUkConfirm();
    I.seePaymentStatus();
    I.seeDocumentsPage();
    I.seeThankYouPage();
};
