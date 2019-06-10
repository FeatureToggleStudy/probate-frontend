'use strict';

const TestConfigurator = new (require('test/end-to-end/helpers/TestConfigurator'))();
const testConfig = require('test/config.js');

Feature('Single Executor flow').retry(TestConfigurator.getRetryFeatures());

// eslint complains that the Before/After are not used but they are by codeceptjs
// so we have to tell eslint to not validate these
// eslint-disable-next-line no-undef
Before(() => {
    TestConfigurator.getBefore();
});

// eslint-disable-next-line no-undef
After(() => {
    TestConfigurator.getAfter();
});

Scenario(TestConfigurator.idamInUseText('Single Executor Journey'), function* (I) {

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

    // Deceased Details
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

    I.selectDeceasedAlias('Yes');
    I.selectOtherNames('2');
    I.selectDeceasedMarriedAfterDateOnWill('No');
    I.selectWillCodicils('Yes');
    I.selectWillNoOfCodicils('3');

    // Section 1 Check
    I.waitForNavigationToComplete('a[href="/sign-out"]');
    I.waitForNavigationToComplete('a[href="/"]');
    I.authenticateWithIdamIfAvailable();
    I.waitForNavigationToComplete('a[href="/summary/*"]');
    I.seeSummaryContent('1');

    // ExecutorsTask
    I.selectATask();
    I.enterApplicantName('Applicant First Name', 'Applicant Last Name');
    I.selectNameAsOnTheWill('No');
    I.enterApplicantAlias('Applicant Alias');
    I.enterApplicantAliasReason('aliasOther', 'Applicant_alias_reason');
    I.enterApplicantPhone();
    I.enterAddressManually();

    const totalExecutors = '1';
    I.enterTotalExecutors(totalExecutors);

    // Section 2 Check
    I.waitForNavigationToComplete('a[href="/sign-out"]');
    I.waitForNavigationToComplete('a[href="/"]');
    I.authenticateWithIdamIfAvailable();
    I.waitForNavigationToComplete('a[href="/summary/*"]');
    I.seeSummaryContent('2');

    // Review and Confirm Task
    I.selectATask();
    I.seeSummaryPage('declaration');
    I.acceptDeclaration();

    // Section 3 Check
    I.waitForNavigationToComplete('a[href="/sign-out"]');
    I.waitForNavigationToComplete('a[href="/"]');
    I.authenticateWithIdamIfAvailable();

    // Extra Copies Task
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

    // Section 4 Check
    I.waitForNavigationToComplete('a[href="/sign-out"]');
    I.waitForNavigationToComplete('a[href="/"]');
    I.authenticateWithIdamIfAvailable();

    // Payment Task
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

    // Thank You
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
});
