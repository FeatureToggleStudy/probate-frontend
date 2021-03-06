'use strict';

const initSteps = require('app/core/initSteps');
const {expect, assert} = require('chai');
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const IhtPaper = steps.IhtPaper;
const content = require('app/resources/en/translation/iht/paper');

describe('IhtPaper', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = IhtPaper.constructor.getUrl();
            expect(url).to.equal('/iht-paper');
            done();
        });
    });

    describe('handlePost()', () => {
        let ctx;
        let errors;

        it('should return the ctx with the estate values', (done) => {
            ctx = {
                form: 'optionIHT205',
                grossValueFieldIHT205: '500000',
                netValueFieldIHT205: '400000'
            };
            errors = [];
            [ctx, errors] = IhtPaper.handlePost(ctx, errors);
            expect(ctx).to.deep.equal({
                form: 'optionIHT205',
                ihtFormId: 'optionIHT205',
                grossValueFieldIHT205: '500000',
                grossValuePaper: '500000',
                grossValue: 500000,
                netValueFieldIHT205: '400000',
                netValuePaper: '400000',
                netValue: 400000
            });
            done();
        });

        it('should return the ctx with the estate values (values containing decimals)', (done) => {
            ctx = {
                form: 'optionIHT205',
                grossValueFieldIHT205: '500000.12',
                netValueFieldIHT205: '400000.34'
            };
            errors = [];
            [ctx, errors] = IhtPaper.handlePost(ctx, errors);
            expect(ctx).to.deep.equal({
                form: 'optionIHT205',
                ihtFormId: 'optionIHT205',
                grossValueFieldIHT205: '500000.12',
                grossValuePaper: '500000.12',
                grossValue: 500000.12,
                netValueFieldIHT205: '400000.34',
                netValuePaper: '400000.34',
                netValue: 400000.34
            });
            done();
        });

        it('should return the ctx with the estate values (values containing 3 decimals and thousands separators)', (done) => {
            ctx = {
                form: 'optionIHT205',
                grossValueFieldIHT205: '500,000.123',
                netValueFieldIHT205: '400,000.345'
            };
            errors = [];
            [ctx, errors] = IhtPaper.handlePost(ctx, errors, {}, {language: 'en'});
            expect(ctx).to.deep.equal({
                form: 'optionIHT205',
                ihtFormId: 'optionIHT205',
                grossValueFieldIHT205: '500,000.123',
                grossValuePaper: '500,000.123',
                grossValue: 500000.12,
                netValueFieldIHT205: '400,000.345',
                netValuePaper: '400,000.345',
                netValue: 400000.35
            });
            done();
        });

        it('should return the errors correctly', (done) => {
            ctx = {
                form: 'optionIHT205',
                grossValueFieldIHT205: '40a0000',
                netValueFieldIHT205: '50a0000'
            };
            errors = [];
            [ctx, errors] = IhtPaper.handlePost(ctx, errors, {}, {language: 'en'});
            expect(ctx).to.deep.equal({
                form: 'optionIHT205',
                ihtFormId: 'optionIHT205',
                grossValueFieldIHT205: '40a0000',
                grossValuePaper: '40a0000',
                grossValue: 400000,
                netValueFieldIHT205: '50a0000',
                netValuePaper: '50a0000',
                netValue: 500000
            });
            expect(errors).to.deep.equal([
                {
                    field: 'grossValueFieldIHT205',
                    href: '#grossValueFieldIHT205',
                    msg: {
                        summary: content.errors.grossValueFieldIHT205.invalidCurrencyFormat.summary,
                        message: content.errors.grossValueFieldIHT205.invalidCurrencyFormat.message
                    }
                },
                {
                    field: 'netValueFieldIHT205',
                    href: '#netValueFieldIHT205',
                    msg: {
                        summary: content.errors.netValueFieldIHT205.invalidCurrencyFormat.summary,
                        message: content.errors.netValueFieldIHT205.invalidCurrencyFormat.message
                    }
                },
                {
                    field: 'netValueFieldIHT205',
                    href: '#netValueFieldIHT205',
                    msg: {
                        summary: content.errors.netValueFieldIHT205.netValueGreaterThanGross.summary,
                        message: content.errors.netValueFieldIHT205.netValueGreaterThanGross.message
                    }
                }
            ]);
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct next step options', (done) => {
            const ctx = {
                netValue: 200000
            };
            const result = IhtPaper.nextStepOptions(ctx);
            expect(result).to.deep.equal({
                options: [{
                    key: 'lessThanOrEqualTo250k',
                    value: true,
                    choice: 'lessThanOrEqualTo250k'
                }]
            });
            done();
        });
    });

    describe('action()', () => {
        it('test it cleans up context when netValue > £250k', () => {
            const ctx = {
                netValue: 400000,
                lessThanOrEqualTo250k: false,
                grossValuePaper: 500000,
                netValuePaper: 400000,
                assetsOutside: 'optionYes',
                netValueAssetsOutsideField: '600000',
                netValueAssetsOutside: 600000
            };
            const formdata = {};

            IhtPaper.action(ctx, formdata);

            expect(ctx).to.deep.equal({
                netValue: 400000
            });
        });

        it('test it cleans up context and formdata when netValue <= £250k', () => {
            const ctx = {
                netValue: 200000,
                lessThanOrEqualTo250k: true,
                grossValuePaper: 300000,
                netValuePaper: 200000
            };
            const formdata = {
                deceased: {
                    anyChildren: 'optionYes',
                    allChildrenOver18: 'optionYes',
                    anyDeceasedChildren: 'optionYes',
                    anyGrandchildrenUnder18: 'optionNo'
                }
            };

            IhtPaper.action(ctx, formdata);
            expect(ctx).to.deep.equal({
                netValue: 200000
            });
            assert.isUndefined(formdata.deceased.anyChildren);
            assert.isUndefined(formdata.deceased.allChildrenOver18);
            assert.isUndefined(formdata.deceased.anyDeceasedChildren);
            assert.isUndefined(formdata.deceased.anyGrandchildrenUnder18);
        });
    });
});
