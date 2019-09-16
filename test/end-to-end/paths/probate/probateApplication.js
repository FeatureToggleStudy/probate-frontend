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

Scenario(TestConfigurator.idamInUseText('Single applicant journey'), function (I) {
    const screenersToggle = true;
    const paper = true;
    const deceasedAlias = false;
    const codicils = false;
    const applicantAlias = false;
    const assetsOverseas = false;

    I.startApplicationProbate(screenersToggle);
    I.completeDeceasedDetails(paper, deceasedAlias, codicils);
    I.completeApplicantDetails(applicantAlias);
    I.completeLegalDeclaration();
    I.completeCopiesDetails(assetsOverseas);
    I.completePayment();
});

Scenario.only(TestConfigurator.idamInUseText('Main applicant journey with 6 executors'), function (I) {
    const screenersToggle = false;
    const paper = true;
    const deceasedAlias = false;
    const codicils = false;
    const applicantAlias = false;
    const noOfExecutors = 7;
    const whoDied = [1, 6];
    const execsApplying = [3, 5];
    const execsWithAliases = [3];

    I.startApplicationProbate(screenersToggle);
    I.completeDeceasedDetails(paper, deceasedAlias, codicils);
    I.completeApplicantDetails(applicantAlias, noOfExecutors);
    I.completeExecutorAllAliveDetails(noOfExecutors, whoDied);
    I.completeExecutorApplyingDetails(execsApplying, execsWithAliases);
    I.completeExecutorDetails();
});
