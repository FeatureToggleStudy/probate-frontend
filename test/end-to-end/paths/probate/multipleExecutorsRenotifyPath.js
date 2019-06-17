/* eslint-disable no-undef */
'use strict';

const taskListContent = require('app/resources/en/translation/tasklist');
const commonContent = require('app/resources/en/translation/common');
const data = require('test/data/injecting-data/three-executors-start-from-declaration-section');
const TestConfigurator = new (require('test/end-to-end/helpers/TestConfigurator'))();
const testConfig = require('test/config.js');
const paymentType = testConfig.paymentType;
const copies = testConfig.copies;

let retries = -1;

Feature('Multiple Executors Renotify Flow');

BeforeSuite(() => {
    TestConfigurator.getBefore();
});

AfterSuite(() => {
    TestConfigurator.getAfter();
});

let grabIdsOriginalExecutors;
let grabIdsNewExecutors;

Scenario(TestConfigurator.idamInUseText('Multiple Executors Renotify Journey - Main applicant: 1st stage of completing application'), async function (I) {
    retries += 1;

    if (retries >= 1) {
        TestConfigurator.getBefore();
    }

    TestConfigurator.injectFormData(data);

    I.amOnPage(testConfig.TestE2EFrontendUrl);

    // IDAM
    I.authenticateWithIdamIfAvailable();

    // Review and confirm Task
    I.selectATask(taskListContent.taskNotStarted);
    I.seeSummaryPage('declaration');
    I.acceptDeclaration();

    // Notify additional executors Dealing with estate
    I.notifyAdditionalExecutors();

    I.amOnPage(testConfig.TestInviteIdListUrl);
    grabIdsOriginalExecutors = await I.grabTextFrom('pre');
    I.amOnPage(testConfig.TestE2EFrontendUrl);

    //Go to summary page
    I.waitForNavigationToComplete('a[href="/summary/*"]');

    //Go to executors number page
    I.waitForNavigationToComplete('a[href="/executors-number"]');

    //Enter name for fourth executor
    I.enterTotalExecutors('4');
    I.fillField('#executorName_'+2, 'Fourth Executor');
    I.waitForNavigationToComplete(`input[value="${commonContent.saveAndContinue}"]`);

    //Executors applying section
    I.selectExecutorsAllAlive('Yes');
    I.selectExecutorsApplying('Yes');
    I.click('#executorsApplying-2');
    I.click('#executorsApplying-4');
    I.waitForNavigationToComplete(`input[value="${commonContent.saveAndContinue}"]`);

    I.click('#alias-optionNo');

    //No need to change or fill values as they are already entered
    I.waitForNavigationToComplete(`input[value="${commonContent.saveAndContinue}"]`);
    I.waitForNavigationToComplete(`input[value="${commonContent.saveAndContinue}"]`);
    I.waitForNavigationToComplete(`input[value="${commonContent.saveAndContinue}"]`);

    //Fourth executor details
    I.enterExecutorContactDetails('4', false);
    I.enterExecutorManualAddress('4');
    I.selectExecutorRoles('2', false, true);

    //Declaration section
    I.selectATask(taskListContent.taskNotStarted);
    I.seeSummaryPage('declaration');
    I.acceptDeclaration();

    // Notify additional executors Dealing with estate
    I.notifyNewAdditionalExecutors();

    I.seeAdditionalInvitesSentPage();

    //Retrieve the email urls for additional executors
    I.amOnPage(testConfig.TestInviteIdListUrl);
    grabIdsNewExecutors = await I.grabTextFrom('pre');

}).retry(TestConfigurator.getRetryScenarios());

Scenario(TestConfigurator.idamInUseText('Multiple Executors Renotify Journey - Additional Executor(s) Agree to Statement of Truth'), async function (I) {
    const idListOriginalExecutors = JSON.parse(grabIdsOriginalExecutors);
    const idListnewExecutors = JSON.parse(grabIdsNewExecutors);

    //Find the executor who isn't applying for probate anymore and check that his link leads to an error page
    for (let i=0; i < idListOriginalExecutors.ids.length; i++) {
        const currentId = idListOriginalExecutors.ids[i];
        if (!idListnewExecutors.ids.includes(currentId)) {
            I.amOnPage(testConfig.TestInvitationUrl + '/' + currentId);
            I.see404ErrorPage();
        }
    }

    //Confirmation of 'Statement of Truth' for applying additional executors
    for (let i=0; i < idListnewExecutors.ids.length; i++) {
        I.amOnPage(testConfig.TestInvitationUrl + '/' + idListnewExecutors.ids[i]);
        I.amOnPage(testConfig.TestE2EFrontendUrl + '/pin');

        // eslint-disable-next-line no-await-in-loop
        const grabPins = await I.grabTextFrom('pre');
        const pinList = JSON.parse(grabPins);

        // eslint-disable-next-line no-await-in-loop
        await I.clickBrowserBackButton();
        I.enterPinCode(pinList.pin.toString());
        I.seeCoApplicantStartPage();
        I.agreeDisagreeDeclaration('Agree');
        I.seeAgreePage(i);
    }
});

Scenario(TestConfigurator.idamInUseText('Multiple Executors Renotify Journey - Continuation of Main applicant journey: final stage of application'), function (I) {

    I.amOnPage(testConfig.TestE2EFrontendUrl);

    // IDAM
    I.authenticateWithIdamIfAvailable();

    //Extra Copies Task
    I.selectATask(taskListContent.taskNotStarted);
    I.enterUkCopies(copies.pay.uk);
    I.selectOverseasAssets();
    I.enterOverseasCopies(copies.pay.overseas);
    I.seeCopiesSummary();

    //PaymentTask
    I.selectATask(taskListContent.taskNotStarted);
    I.seePaymentBreakdownPage(copies.pay.uk, copies.pay.overseas, paymentType.pay.net);
    I.seeGovUkPaymentPage();
    I.seeGovUkConfirmPage();
    I.seePaymentStatusPage();

    // Send Documents Task
    I.seeDocumentsPage();

    // Thank You - Application Complete Task
    I.seeThankYouPage();
});
