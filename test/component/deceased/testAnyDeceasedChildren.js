'use strict';

const TestWrapper = require('test/util/TestWrapper');
const AnyGrandchildrenUnder18 = require('app/steps/ui/deceased/anygrandchildrenunder18/index');
const ApplicantName = require('app/steps/ui/applicant/name/index');
const testCommonContent = require('test/component/common/testCommonContent.js');
const caseTypes = require('app/utils/CaseTypes');

describe('any-deceased-children', () => {
    let testWrapper;
    const expectedNextUrlForAnyGrandchildrenUnder18 = AnyGrandchildrenUnder18.getUrl();
    const expectedNextUrlForApplicantName = ApplicantName.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('AnyDeceasedChildren');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testCommonContent.runTest('AnyDeceasedChildren');

        it('test content loaded on the page', (done) => {
            const sessionData = {
                ccdCase: {
                    state: 'Draft',
                    id: 1234567890123456
                },
                deceased: {
                    'firstName': 'John',
                    'lastName': 'Doe',
                    'dod-formattedDate': '13 October 2018'
                }
            };
            const contentToExclude = ['theDeceased'];

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const contentData = {deceasedName: 'John Doe', deceasedDoD: '13 October 2018'};

                    testWrapper.testContent(done, contentData, contentToExclude);
                });
        });

        it('test errors message displayed for missing data', (done) => {
            testWrapper.testErrors(done, {}, 'required');
        });

        it(`test it redirects to Any Grandchildren Under 18 page if deceased had children who died before them: ${expectedNextUrlForAnyGrandchildrenUnder18}`, (done) => {
            testWrapper.agent.post('/prepare-session/form')
                .send({caseType: caseTypes.INTESTACY})
                .end(() => {
                    const data = {
                        anyDeceasedChildren: 'optionYes'
                    };

                    testWrapper.testRedirect(done, data, expectedNextUrlForAnyGrandchildrenUnder18);
                });
        });

        it(`test it redirects to Applicant Name page if deceased had no children who died before them: ${expectedNextUrlForApplicantName}`, (done) => {
            testWrapper.agent.post('/prepare-session/form')
                .send({caseType: caseTypes.INTESTACY})
                .end(() => {
                    const data = {
                        anyDeceasedChildren: 'optionNo'
                    };

                    testWrapper.testRedirect(done, data, expectedNextUrlForApplicantName);
                });
        });
    });
});
