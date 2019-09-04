'use strict';

const TestConfigurator = new (require('test/end-to-end/helpers/TestConfigurator'))();

Feature('End-to-end application for grant of probate');
// .retry(TestConfigurator.getRetryFeatures());

// eslint complains that the Before/After are not used but they are by codeceptjs
// so we have to tell eslint to not validate these
// eslint-disable-next-line no-undef
Before(() => {
    TestConfigurator.getBefore();
});

Scenario(TestConfigurator.idamInUseText('Single Applicant Journey with Screener Questions'), function (I) {
    const screenersToggle = true;
    const paper = true;
    const deceasedAlias = false;
    const codicils = false;
    const applicantAlias = false;
    const noOfExecutors = 1;
    const assetsOverseas = false;

    I.startApplicationProbate(screenersToggle);
    I.completeDeceasedDetails(paper, deceasedAlias, codicils);
    I.completeApplicantDetails(applicantAlias, noOfExecutors);
    I.completeLegalDeclaration();
    I.completeCopiesDetails(assetsOverseas);
    I.completePayment();
});

Scenario(TestConfigurator.idamInUseText('Single Applicant Journey without Screener Questions'), function (I) {
    const screenersToggle = false;
    const paper = true;
    const deceasedAlias = false;
    const codicils = false;
    const applicantAlias = false;
    const noOfExecutors = 1;
    const assetsOverseas = false;

    I.startApplicationProbate(screenersToggle);
    I.completeDeceasedDetails(paper, deceasedAlias, codicils);
    I.completeApplicantDetails(applicantAlias, noOfExecutors);
    I.completeLegalDeclaration();
    I.completeCopiesDetails(assetsOverseas);
    I.completePayment();
});
