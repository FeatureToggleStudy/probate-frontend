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

Scenario(TestConfigurator.idamInUseText('Single Applicant Journey with Screeners Questions'), function (I) {
    const screenersToggle = true;
    I.startApplicationProbate(screenersToggle);
});

Scenario.only(TestConfigurator.idamInUseText('Single Applicant Journey without Screeners Questions'), function (I) {
    const screenersToggle = false;
    const paper = true;
    const alias = false;
    const codicils = true;
    I.startApplicationProbate(screenersToggle);
    I.completeDeceasedDetails(paper, alias, codicils);
    I.completeExecutorDetails();
});
