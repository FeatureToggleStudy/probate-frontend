'use strict';

const TestWrapper = require('test/util/TestWrapper');
const Summary = require('app/steps/ui/summary');
const IhtMethod = require('app/steps/ui/iht/method');
const DocumentUpload = require('app/steps/ui/documentupload');
const testHelpBlockContent = require('test/component/common/testHelpBlockContent.js');
const config = require('app/config');
const nock = require('nock');
const featureToggleUrl = config.featureToggles.url;
const documentUploadFeatureTogglePath = `${config.featureToggles.path}/${config.featureToggles.document_upload}`;
const featureTogglesNock = (status = 'true') => {
    nock(featureToggleUrl)
        .get(documentUploadFeatureTogglePath)
        .reply(200, status);
};

describe('deceased-address', () => {
    let testWrapper;
    const expectedNextUrlForSummary = Summary.getUrl();
    const expectedNextUrlForIhtMethod = IhtMethod.getUrl();
    const expectedNextUrlForDocumentUpload = DocumentUpload.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('DeceasedAddress');
    });

    afterEach(() => {
        testWrapper.destroy();
        nock.cleanAll();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testHelpBlockContent.runTest('DeceasedAddress', featureTogglesNock);

        it('test right content loaded on the page', (done) => {
            const excludeKeys = ['selectAddress'];

            testWrapper.testContent(done, excludeKeys);
        });

        it('test address schema validation when address search is unsuccessful', (done) => {
            const data = {
                addressFound: 'false'
            };

            testWrapper.testErrors(done, data, 'required', ['addressLine1']);
        });

        it(`test it redirects to document upload page: ${expectedNextUrlForDocumentUpload}`, (done) => {
            featureTogglesNock('true');

            const data = {
                addressLine1: 'value',
                postTown: 'value',
                newPostCode: 'value'
            };
            testWrapper.testRedirect(done, data, expectedNextUrlForDocumentUpload);
        });
    });
});
