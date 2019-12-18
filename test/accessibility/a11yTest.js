'use strict';

const co = require('co');
const request = require('supertest');
const a11y = require('test/util/a11y');
const expect = require('chai').expect;
const app = require('app');
const initSteps = require('app/core/initSteps');
const {endsWith} = require('lodash');
const commonContent = require('app/resources/en/translation/common');
const stepsToExclude = [
    'Dashboard', 'Summary', 'TaskList', 'PinPage', 'PinSent', 'PinResend', 'AddressLookup', 'ExecutorAddress', 'ExecutorContactDetails', 'ExecutorName',
    'ExecutorNotified', 'ExecutorNameAsOnWill', 'ExecutorApplying', 'DeleteExecutor', 'PaymentStatus', 'AddAlias', 'RemoveAlias', 'ExecutorRoles', 'ExecutorsWhenDied'
];
const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`], 'en');
const nock = require('nock');
const config = require('app/config');
const commonSessionData = {
    form: {
        payloadVersion: config.payloadVersion,
        applicantEmail: 'test@email.com',
        applicant: {},
        deceased: {}
    },
    back: []
};

Object.keys(steps)
    .filter(stepName => stepsToExclude.includes(stepName))
    .forEach((stepName) => delete steps[stepName]);

for (const step in steps) {
    ((step) => {
        const stepUrl = step.constructor.getUrl();
        let results;
        let sessionData = {};

        if (config.whitelistedPagesAfterSubmission.includes(stepUrl)) {
            sessionData = Object.assign(commonSessionData, {
                form: {
                    declaration: {
                        declarationCheckbox: 'true'
                    },
                    payment: {
                        total: 0
                    },
                    ccdCase: {
                        state: 'CaseCreated'
                    }
                }
            });
        } else if (config.whitelistedPagesAfterDeclaration.includes(stepUrl)) {
            sessionData = Object.assign(commonSessionData, {
                form: {
                    declaration: {
                        declarationCheckbox: 'true'
                    }
                }
            });
        }

        describe(`Verify accessibility for the page ${step.name}`, () => {
            let server = null;
            let agent = null;
            let title;
            if (step.name === 'StartEligibility') {
                title = `${commonContent.serviceName} - Eligibility`;
            } else if (step.name === 'StartApply') {
                title = `${commonContent.serviceName} - Create account`;
            } else {
                title = `${step.content.title} - ${commonContent.serviceName}`
                    .replace(/&lsquo;/g, '‘')
                    .replace(/&rsquo;/g, '’')
                    .replace(/\(/g, '\\(')
                    .replace(/\)/g, '\\)');
            }

            before((done) => {
                nock(config.services.orchestrator.url)
                    .get('/invite/allAgreed/undefined')
                    .reply(200, 'false');

                nock(config.featureToggles.url)
                    .get(`${config.featureToggles.path}/probate-fees-api`)
                    .reply(200, 'true');

                server = app.init(true, sessionData);
                agent = request.agent(server.app);
                co(function* () {
                    let urlSuffix = '';
                    if (endsWith(agent.get(step.constructor.getUrl()), '*')) {
                        urlSuffix = '/0';
                    }
                    results = yield a11y(agent.get(stepUrl).url + urlSuffix, title);
                })
                    .then(done, done)
                    .catch((error) => {
                        done(error);
                    });
            });

            after((done) => {
                nock.cleanAll();
                server.http.close();
                done();
            });

            it('should not generate any errors', () => {
                const errors = results.filter((res) => res.type === 'error');
                expect(errors.length).to.equal(0, JSON.stringify(errors, null, 2));
            });

            it('should not generate any warnings', () => {
                const warnings = results.filter((res) => res.type === 'warning');
                expect(warnings.length).to.equal(0, JSON.stringify(warnings, null, 2));
            });
        });
    })(steps[step]);
}
