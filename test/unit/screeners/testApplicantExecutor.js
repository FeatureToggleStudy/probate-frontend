'use strict';

const journey = require('app/journeys/probate');
const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const ApplicantExecutor = steps.ApplicantExecutor;

describe('ApplicantExecutor', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ApplicantExecutor.constructor.getUrl();
            expect(url).to.equal('/applicant-executor');
            done();
        });
    });

    describe('getContextData()', () => {
        it('should return the correct context on GET', (done) => {
            const req = {
                method: 'GET',
                sessionID: 'dummy_sessionId',
                session: {
                    form: {},
                    caseType: 'gop'
                },
                body: {
                    executor: 'optionYes'
                }
            };
            const res = {};

            const ctx = ApplicantExecutor.getContextData(req, res);
            expect(ctx).to.deep.equal({
                sessionID: 'dummy_sessionId',
                executor: 'optionYes',
                caseType: 'gop',
                userLoggedIn: false
            });
            done();
        });
    });

    describe('nextStepUrl()', () => {
        it('should return the correct url when Yes is given', (done) => {
            const req = {
                session: {
                    journey: journey
                }
            };
            const ctx = {
                executor: 'optionYes'
            };
            const nextStepUrl = ApplicantExecutor.nextStepUrl(req, ctx);
            expect(nextStepUrl).to.equal('/mental-capacity');
            done();
        });

        it('should return the correct url when No is given', (done) => {
            const req = {
                session: {
                    journey: journey
                }
            };
            const ctx = {
                executor: 'optionNo'
            };
            const nextStepUrl = ApplicantExecutor.nextStepUrl(req, ctx);
            expect(nextStepUrl).to.equal('/stop-page/notExecutor');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const nextStepOptions = ApplicantExecutor.nextStepOptions();
            expect(nextStepOptions).to.deep.equal({
                options: [{
                    key: 'executor',
                    value: 'optionYes',
                    choice: 'isExecutor'
                }]
            });
            done();
        });
    });
});
