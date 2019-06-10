/* eslint-disable no-undef */
'use strict';

const TestConfigurator = new (require('test/end-to-end/helpers/TestConfigurator'))();
const {forEach, head} = require('lodash');
const testConfig = require('test/config.js');

let grabIds;
let retries = -1;

Feature('All Alias Reasons').retry(TestConfigurator.getRetryFeatures());

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

Scenario(TestConfigurator.idamInUseText('Multiple Executors Journey - Main applicant: 1st stage of completing application'), function* (I) {
    retries += 1;

    if (retries >= 1) {
        TestConfigurator.getBefore();
    }

    // Eligibility Task (pre IdAM)
    I.startApplication();

    I.selectDeathCertificate('No');
    I.seeStopPage('deathCertificate');
    I.selectDeathCertificate('Yes');

    I.selectDeceasedDomicile('No');
    I.seeStopPage('notInEnglandOrWales');
    I.selectDeceasedDomicile('Yes');

    I.selectIhtCompleted('No');
    I.seeStopPage('ihtNotCompleted');
    I.selectIhtCompleted('Yes');

    I.selectPersonWhoDiedLeftAWill('Yes');

    I.selectOriginalWill('No');
    I.seeStopPage('notOriginal');
    I.selectOriginalWill('Yes');

    I.selectApplicantIsExecutor('No');
    I.seeStopPage('notExecutor');
    I.selectApplicantIsExecutor('Yes');

    I.selectMentallyCapable('No');
    I.seeStopPage('mentalCapacity');
    I.selectMentallyCapable('Yes');

    I.startApply();

    // IdAM
    I.authenticateWithIdamIfAvailable();

    // DeceasedTask
    I.selectATask();
    I.enterDeceasedName('Deceased First Name', 'Deceased Last Name');
    I.enterDeceasedDateOfBirth('01', '01', '1950');
    I.enterDeceasedDateOfDeath('01', '01', '2017');
    I.enterDeceasedAddress();
    I.selectDocumentsToUpload();
    I.selectInheritanceMethodPaper();

    if (TestConfigurator.getUseGovPay() === 'true') {
        I.enterGrossAndNet('205', '600000', '300000');
    } else {
        I.enterGrossAndNet('205', '500', '400');
    }

    I.selectDeceasedAlias('No');
    I.selectDeceasedMarriedAfterDateOnWill('No');
    I.selectWillCodicils('No');

    // ExecutorsTask
    I.selectATask();
    I.enterApplicantName('Applicant First Name', 'Applicant Last Name');
    I.selectNameAsOnTheWill('No');
    I.enterApplicantAlias('Polly');
    I.enterApplicantAliasReason('aliasOther', 'Witness protection');
    I.enterApplicantPhone();
    I.enterAddressManually();

    const totalExecutors = '4';
    I.enterTotalExecutors(totalExecutors);
    I.enterExecutorNames(totalExecutors);
    I.selectExecutorsAllAlive('Yes');

    I.selectExecutorsApplying('Yes');

    const executorsApplyingList = ['2', '3', '4'];
    I.selectExecutorsDealingWithEstate(executorsApplyingList, false);

    I.selectExecutorsWithDifferentNameOnWill('Yes');

    const executorsWithDifferentNameList = ['2', '3', '4'];
    I.selectWhichExecutorsWithDifferentNameOnWill(executorsApplyingList, executorsWithDifferentNameList);

    const aliasReasonList = ['aliasMarriage', 'aliasDivorce', 'aliasDeedPoll'];

    let currentIteration = 0;
    forEach(executorsWithDifferentNameList, executorNumber => {
        I.enterExecutorCurrentName(executorNumber, head(executorsWithDifferentNameList) === executorNumber);
        I.enterExecutorCurrentNameReason(executorNumber, aliasReasonList[currentIteration], 'Because YOLO');
        currentIteration += 1;
    });

    forEach(executorsApplyingList, executorNumber => {
        I.enterExecutorContactDetails(executorNumber, head(executorsApplyingList) === executorNumber);
        I.enterExecutorManualAddress(executorNumber);
    });

    // Review and confirm Task
    I.selectATask();
    I.seeSummaryPage('declaration');
    I.acceptDeclaration();

    // Notify additional executors Dealing with estate
    I.notifyAdditionalExecutors();

    //Retrieve the email urls for additional executors
    I.amOnPage(testConfig.TestInviteIdListUrl);
    grabIds = yield I.grabTextFrom('pre');
}).retry(TestConfigurator.getRetryScenarios());

Scenario(TestConfigurator.idamInUseText('Additional Executor(s) Agree to Statement of Truth'), function* (I) {
    const idList = JSON.parse(grabIds);

    for (let i=0; i < idList.ids.length; i++) {
        I.amOnPage(testConfig.TestInvitationUrl + '/' + idList.ids[i]);
        I.amOnPage(testConfig.TestE2EFrontendUrl + '/pin');

        const grabPins = yield I.grabTextFrom('pre');
        const pinList = JSON.parse(grabPins);

        yield I.clickBrowserBackButton();

        I.enterPinCode(pinList.pin.toString());
        I.seeCoApplicantStartPage();

        I.agreeDisagreeDeclaration('Agree');

        if (i === (idList.ids.length-1)) {
            I.seeAgreePage(true);
        } else {
            I.seeAgreePage();
        }
    }
});

Scenario(TestConfigurator.idamInUseText('Continuation of Main applicant journey: final stage of application'), function* (I) {
    // IDAM
    I.amOnPage(testConfig.TestE2EFrontendUrl);

    // IdAM
    I.authenticateWithIdamIfAvailable();

    // Extra copies task
    I.selectATask();

    if (TestConfigurator.getUseGovPay() === 'true') {
        I.enterUkCopies('5');
        I.selectOverseasAssets();
        I.enterOverseasCopies('7');
    } else {
        I.enterUkCopies('0');
        I.selectOverseasAssets();
        I.enterOverseasCopies('0');
    }

    I.seeCopiesSummary();

    // PaymentTask
    I.selectATask();

    if (TestConfigurator.getUseGovPay() === 'true') {
        I.seePaymentBreakdownPage('5', '7', '300000');
    } else {
        I.seePaymentBreakdownPage('0', '0', '400');
    }

    if (TestConfigurator.getUseGovPay() === 'true') {
        I.seeGovUkPaymentPage();
        I.seeGovUkConfirmPage();
    }

    I.seePaymentStatusPage();

    // Send Documents Task
    I.seeDocumentsPage();

    // Thank You - Application Complete Task
    I.seeThankYouPage();

    // Sign back in and see thank you page
    I.amOnPage(testConfig.TestE2EFrontendUrl);
    I.authenticateWithIdamIfAvailable();
    let ccdRef = yield I.grabTextFrom('//strong');
    ccdRef = ccdRef[1].replace(/-/g, '');
    I.seeThankYouPage();

    // Find case on CCD
    I.waitForNavigationToComplete(testConfig.TestCCDUrl);
    I.authenticateCCDWithIdam();
    I.searchCases(ccdRef);
    I.click('Deceased');
    I.see('Deceased First Name');
    I.see('Deceased Last Name');

}).retry(TestConfigurator.getRetryScenarios());
