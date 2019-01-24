'use strict';

const TestWrapper = require('test/util/TestWrapper');
const RelationshipToDeceased = require('app/steps/ui/screeners/relationshiptodeceased/index');
const StopPage = require('app/steps/ui/stoppage/index');
const commonContent = require('app/resources/en/translation/common');
const config = require('app/config');
const cookies = [{
    name: config.redis.eligibilityCookie.name,
    content: {
        nextStepUrl: '/died-after-october-2014',
        pages: [
            '/death-certificate',
            '/deceased-domicile',
            '/iht-completed',
            '/will-left'
        ]
    }
}];

const nock = require('nock');
const featureToggleUrl = config.featureToggles.url;
const featureTogglePath = `${config.featureToggles.path}/${config.featureToggles.intestacy_questions}`;

describe('died-after-october-2014', () => {
    let testWrapper;
    const expectedNextUrlForRelationshipToDeceased = RelationshipToDeceased.getUrl();
    const expectedNextUrlForStopPage = StopPage.getUrl('notDiedAfterOctober2014');

    beforeEach(() => {
        testWrapper = new TestWrapper('DiedAfterOctober2014');
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
            testWrapper.testErrors(done, {}, 'required', [], cookies);
        });

        it(`test it redirects to next page: ${expectedNextUrlForRelationshipToDeceased}`, (done) => {
            const data = {
                diedAfter: 'Yes'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForRelationshipToDeceased, cookies);
        });

        it(`test it redirects to stop page: ${expectedNextUrlForStopPage}`, (done) => {
            const data = {
                diedAfter: 'No'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForStopPage, cookies);
        });

        it('test save and close link is not displayed on the page', (done) => {
            const playbackData = {};
            playbackData.saveAndClose = commonContent.saveAndClose;

            testWrapper.testContentNotPresent(done, playbackData);
        });
    });
});
