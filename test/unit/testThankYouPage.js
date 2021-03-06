'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`]);
const ThankYou = steps.ThankYou;

describe('ThankYou', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ThankYou.constructor.getUrl();
            expect(url).to.equal('/thank-you');
            done();
        });
    });

    describe('getContextData()', () => {
        let ctx;
        let req;

        it('should return the context with the ccd case id', (done) => {
            req = {
                session: {
                    form: {
                        ccdCase: {
                            id: 1234567890123456,
                            state: 'CaseCreated'
                        }
                    }
                }
            };

            ctx = ThankYou.getContextData(req);
            expect(ctx.ccdReferenceNumber).to.deep.equal('1234-5678-9012-3456');
            expect(ctx.ccdReferenceNumberAccessible).to.deep.equal('1 2 3 4, -, 5 6 7 8, -, 9 0 1 2, -, 3 4 5 6');
            done();
        });
    });

    describe('action()', () => {
        it('test that context variables are removed and empty object returned', () => {
            let formdata = {};
            let ctx = {
                ccdReferenceNumber: '1234-1235-1236-1237',
                ccdReferenceNumberAccessible: '1 2 3 4, -, 5 6 7 8, -, 9 0 1 2, -, 3 4 5 6'
            };
            [ctx, formdata] = ThankYou.action(ctx, formdata);
            expect(ctx).to.deep.equal({});
        });
    });

    describe('handleGet()', () => {
        it('test when checkAnswersSummary JSON just exists', () => {
            let ctx = {};
            let formdata = {
                checkAnswersSummary: '{"test":"data"}'
            };
            [ctx, formdata] = ThankYou.handleGet(ctx, formdata);
            expect(ctx.checkAnswersSummary).to.deep.equal(true);
            expect(ctx.legalDeclaration).to.deep.equal(false);
        });

        it('test when legalDeclaration JSON just exists', () => {
            let ctx = {};
            let formdata = {
                legalDeclaration: '{"test":"data"}'
            };
            [ctx, formdata] = ThankYou.handleGet(ctx, formdata);
            expect(ctx.checkAnswersSummary).to.deep.equal(false);
            expect(ctx.legalDeclaration).to.deep.equal(true);
        });

        it('test when no pdf variables JSON exists', () => {
            let ctx = {};
            let formdata = {};
            [ctx, formdata] = ThankYou.handleGet(ctx, formdata);
            expect(ctx.checkAnswersSummary).to.deep.equal(false);
            expect(ctx.legalDeclaration).to.deep.equal(false);
        });

        it('test when all pdf variables JSON exists', () => {
            let ctx = {};
            let formdata = {
                checkAnswersSummary: '{"test":"data"}',
                legalDeclaration: '{"test":"data"}'
            };
            [ctx, formdata] = ThankYou.handleGet(ctx, formdata);
            expect(ctx.checkAnswersSummary).to.deep.equal(true);
            expect(ctx.legalDeclaration).to.deep.equal(true);
        });
    });
});
