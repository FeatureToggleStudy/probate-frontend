'use strict';

const TestWrapper = require('test/util/TestWrapper');
const AllChildrenOver18 = require('app/steps/ui/deceased/allchildrenover18/index');
const ApplicantName = require('app/steps/ui/applicant/name/index');
const testHelpBlockContent = require('test/component/common/testHelpBlockContent.js');
const content = require('app/resources/en/translation/deceased/anychildren');

describe('adoption-place', () => {
    let testWrapper;
    const expectedNextUrlForAllChildrenOver18 = AllChildrenOver18.getUrl();
    const expectedNextUrlForApplicantName = ApplicantName.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('AnyChildren');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testHelpBlockContent.runTest('AnyChildren');

        it('test content loaded on the page', (done) => {
            const sessionData = {
                deceased: {
                    firstName: 'John',
                    lastName: 'Doe'
                }
            };

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const contentData = {deceasedName: 'John Doe'};
                    testWrapper.testContent(done, [], contentData);
                });
        });

        it('test errors message displayed for missing data', (done) => {
            testWrapper.testErrors(done, {}, 'required', []);
        });

        it(`test it redirects to All Children Over 18 page if deceased had children: ${expectedNextUrlForAllChildrenOver18}`, (done) => {
            const data = {
                anyChildren: content.optionYes
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForAllChildrenOver18);
        });

        it(`test it redirects to Applicant Name page if deceased had no children: ${expectedNextUrlForApplicantName}`, (done) => {
            const data = {
                anyChildren: content.optionNo
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantName);
        });
    });
});
