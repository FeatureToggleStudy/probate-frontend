/* eslint-disable no-undef */
'use strict';

const taskListContent = require('app/resources/en/translation/tasklist');
const TestConfigurator = new (require('test/end-to-end/helpers/TestConfigurator'))();
const testConfig = require('test/config.js');
const {forEach, head} = require('lodash');
const paymentType = testConfig.paymentType;
const copies = testConfig.copies;

let retries = -1;

Feature('Cancel Additional Executors Flow');

// eslint complains that the Before/After are not used but they are by codeceptjs
// so we have to tell eslint to not validate these
// eslint-disable-next-line no-undef
BeforeSuite(() => {
    TestConfigurator.getBefore();
});

// eslint-disable-next-line no-undef
AfterSuite(() => {
    TestConfigurator.getAfter();
});

Scenario(TestConfigurator.idamInUseText('Multiple Executors Journey - Cancel Additional Executors: 1st stage of completing application'), function (I) {
    retries += 1;

    if (retries >= 1) {
        TestConfigurator.getBefore();
    }

    I.amOnPage(testConfig.TestE2EFrontendUrl);

    // // Eligibility Task (pre IdAM)
    // I.startApplication();

    // I.selectDeathCertificate('No');
    // I.seeStopPage('deathCertificate');
    // I.selectDeathCertificate('Yes');

    // I.selectDeceasedDomicile('No');
    // I.seeStopPage('notInEnglandOrWales');
    // I.selectDeceasedDomicile('Yes');

    // I.selectIhtCompleted('No');
    // I.seeStopPage('ihtNotCompleted');
    // I.selectIhtCompleted('Yes');

    // I.selectPersonWhoDiedLeftAWill('Yes');

    // I.selectOriginalWill('No');
    // I.seeStopPage('notOriginal');
    // I.selectOriginalWill('Yes');

    // I.selectApplicantIsExecutor('No');
    // I.seeStopPage('notExecutor');
    // I.selectApplicantIsExecutor('Yes');

    // I.selectMentallyCapable('No');
    // I.seeStopPage('mentalCapacity');
    // I.selectMentallyCapable('Yes');

    // I.startApply();

    // IdAM
    I.authenticateWithIdamIfAvailable();

    // Deceased Details
    I.selectATask(taskListContent.taskNotStarted);
    I.enterDeceasedName('Deceased First Name', 'Deceased Last Name');
    I.enterDeceasedDateOfBirth('01', '01', '1950');
    I.enterDeceasedDateOfDeath('01', '01', '2017');
    I.enterDeceasedAddress();
    I.selectDocumentsToUpload();
    I.selectInheritanceMethodPaper();

    if (TestConfigurator.getUseGovPay() === 'true') {
        I.enterGrossAndNet(paymentType.form, paymentType.pay.gross, paymentType.pay.net);
    } else {
        I.enterGrossAndNet(paymentType.form, paymentType.noPay.gross, paymentType.noPay.net);
    }

    I.selectDeceasedAlias('No');
    I.selectDeceasedMarriedAfterDateOnWill('No');
    I.selectWillCodicils('No');

    // ExecutorsTask
    I.selectATask(taskListContent.taskNotStarted);
    I.enterApplicantName('Applicant First Name', 'Applicant Last Name');
    I.selectNameAsOnTheWill('Yes');
    I.enterApplicantPhone();
    I.enterAddressManually();

    const totalExecutors = '3';
    I.enterTotalExecutors(totalExecutors);
    I.enterExecutorNames(totalExecutors);
    I.selectExecutorsAllAlive('Yes');
    I.selectExecutorsApplying('Yes');

    const executorsApplyingList = ['2', '3'];
    I.selectExecutorsDealingWithEstate(executorsApplyingList, false);
    I.selectExecutorsWithDifferentNameOnWill('No');

    forEach(executorsApplyingList, executorNumber => {
        I.enterExecutorContactDetails(executorNumber, head(executorsApplyingList) === executorNumber);
        I.enterExecutorManualAddress(executorNumber);
    });

    // Review and confirm Task
    I.selectATask(taskListContent.taskNotStarted);
    I.seeSummaryPage('declaration');
    I.acceptDeclaration();
    I.waitForNavigationToComplete('a[href="/sign-out"]');
    I.waitForNavigationToComplete('a[href="/"]');

    // IdAM
    I.authenticateWithIdamIfAvailable();
    I.waitForNavigationToComplete('a[href="/summary/*"]');
    I.waitForNavigationToComplete('a[href="/other-executors-applying"]');
    I.selectExecutorsApplying('No');
    I.selectExecutorRoles('2', true, true);
    I.selectHasExecutorBeenNotified('Yes', '2');
    I.selectExecutorRoles('3', false, false);
    I.waitForNavigationToComplete('a[href="/sign-out"]');
}).retry(TestConfigurator.getRetryScenarios());

Scenario(TestConfigurator.idamInUseText('Multiple Executors Journey - Cancel Additional Executors: final stage of application'), function (I) {

    I.amOnPage(testConfig.TestE2EFrontendUrl);

    // IdAM
    I.authenticateWithIdamIfAvailable();

    // Review and confirm Task
    I.selectATask(taskListContent.taskNotStarted);
    I.seeSummaryPage('declaration');
    I.acceptDeclaration();

    //Extra Copies Task
    I.selectATask(taskListContent.taskNotStarted);
    I.enterUkCopies(copies.pay.uk);
    I.selectOverseasAssets();
    I.enterOverseasCopies(copies.pay.overseas);
    I.seeCopiesSummary();

    //PaymentTask
    I.selectATask(taskListContent.taskNotStarted);
    if (TestConfigurator.getUseGovPay() === 'true') {
        I.seePaymentBreakdownPage(copies.pay.uk, copies.pay.overseas, paymentType.pay.net);
    } else {
        I.seePaymentBreakdownPage(copies.pay.uk, copies.pay.overseas, paymentType.noPay.net);
    }

    I.seeGovUkPaymentPage();
    I.seeGovUkConfirmPage();
    I.seePaymentStatusPage();

    // Send Documents Task
    I.seeDocumentsPage();

    // Thank You - Application Complete Task
    I.seeThankYouPage();
}).retry(TestConfigurator.getRetryScenarios());
