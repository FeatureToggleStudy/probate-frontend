'use strict';

const TestWrapper = require('test/util/TestWrapper');
const StartApply = require('app/steps/ui/screeners/startapply/index');
const StopPage = require('app/steps/ui/stoppage/index');
const commonContent = require('app/resources/en/translation/common');
const config = require('app/config');
const cookies = [{
    name: config.redis.eligibilityCookie.name,
    content: {
        nextStepUrl: '/other-applicants',
        pages: [
            '/death-certificate',
            '/deceased-domicile',
            '/iht-completed',
            '/will-left',
            '/died-after-october-2014',
            '/relationship-to-deceased'
        ]
    }
}];

const nock = require('nock');
const featureToggleUrl = config.featureToggles.url;
const featureTogglePath = `${config.featureToggles.path}/${config.featureToggles.intestacy_questions}`;

describe('other-applicants', () => {
    let testWrapper;
    const expectedNextUrlForStartApply = StartApply.getUrl();
    const expectedNextUrlForStopPage = StopPage.getUrl('otherApplicants');

    beforeEach(() => {
        testWrapper = new TestWrapper('OtherApplicants');
        nock(featureToggleUrl)
            .get(featureTogglePath)
            .reply(200, 'true');
    });

    afterEach(() => {
        testWrapper.destroy();
        nock.cleanAll();
    });

    describe('Verify Content, Errors and Redirection', () => {
        it('test help block content is loaded on page', (done) => {
            const playbackData = {};
            playbackData.helpTitle = commonContent.helpTitle;
            playbackData.helpText = commonContent.helpText;
            playbackData.contactTelLabel = commonContent.contactTelLabel.replace('{helpLineNumber}', config.helpline.number);
            playbackData.contactOpeningTimes = commonContent.contactOpeningTimes.replace('{openingTimes}', config.helpline.hours);
            playbackData.helpEmailLabel = commonContent.helpEmailLabel;
            playbackData.contactEmailAddress = commonContent.contactEmailAddress;

            testWrapper.testDataPlayback(done, playbackData, cookies);
        });

        it('test content loaded on the page', (done) => {
            testWrapper.testContent(done, [], {}, cookies);
        });

        it('test errors message displayed for missing data', (done) => {
            testWrapper.agent.post('/prepare-session-field/willLeft/No')
                .end(() => {
                    testWrapper.testErrors(done, {}, 'required', [], cookies);
                });
        });

        it(`test it redirects to next page: ${expectedNextUrlForStartApply}`, (done) => {
            testWrapper.agent.post('/prepare-session-field/willLeft/No')
                .end(() => {
                    const data = {
                        otherApplicants: 'No'
                    };

                    testWrapper.testRedirect(done, data, expectedNextUrlForStartApply, cookies);
                });
        });

        it(`test it redirects to stop page: ${expectedNextUrlForStopPage}`, (done) => {
            testWrapper.agent.post('/prepare-session-field/willLeft/No')
                .end(() => {
                    const data = {
                        otherApplicants: 'Yes'
                    };

                    testWrapper.testRedirect(done, data, expectedNextUrlForStopPage, cookies);
                });
        });

        it('test save and close link is not displayed on the page', (done) => {
            const playbackData = {};
            playbackData.saveAndClose = commonContent.saveAndClose;

            testWrapper.testContentNotPresent(done, playbackData);
        });
    });
});
