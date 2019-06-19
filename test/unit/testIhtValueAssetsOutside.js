'use strict';

const initSteps = require('app/core/initSteps');
const {expect, assert} = require('chai');
const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`]);
const ValueAssetsOutside = steps.ValueAssetsOutside;
const contentAnyChildren = require('app/resources/en/translation/deceased/anychildren');
const contentAllChildrenOver18 = require('app/resources/en/translation/deceased/allchildrenover18');
const contentAnyDeceasedChildren = require('app/resources/en/translation/deceased/anydeceasedchildren');
const contentAnyGrandChildrenUnder18 = require('app/resources/en/translation/deceased/anygrandchildrenunder18');

describe('ValueAssetsOutside', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ValueAssetsOutside.constructor.getUrl();
            expect(url).to.equal('/value-assets-outside-england-wales');
            done();
        });
    });

    describe('handlePost()', () => {
        let ctx;
        let errors;

        it('should return the ctx with the value of the assets outside england and wales', (done) => {
            ctx = {
                netValueAssetsOutsideField: '500000'
            };
            errors = [];
            [ctx, errors] = ValueAssetsOutside.handlePost(ctx, errors);
            expect(ctx).to.deep.equal({
                netValueAssetsOutside: 500000,
                netValueAssetsOutsideField: '500000'
            });
            done();
        });

        it('should return the ctx with the value of the assets outside england and wales (value containing decimals)', (done) => {
            ctx = {
                netValueAssetsOutsideField: '500000.12'
            };
            errors = [];
            [ctx, errors] = ValueAssetsOutside.handlePost(ctx, errors);
            expect(ctx).to.deep.equal({
                netValueAssetsOutside: 500000.12,
                netValueAssetsOutsideField: '500000.12'
            });
            done();
        });

        it('should return the ctx with the value of the assets outside england and wales (value containing 3 decimals and thousands separators)', (done) => {
            ctx = {
                netValueAssetsOutsideField: '500,000.345'
            };
            errors = [];
            [ctx, errors] = ValueAssetsOutside.handlePost(ctx, errors);
            expect(ctx).to.deep.equal({
                netValueAssetsOutside: 500000.35,
                netValueAssetsOutsideField: '500,000.345'
            });
            done();
        });

        it('should return the errors correctly', (done) => {
            ctx = {
                netValueAssetsOutsideField: '50a0000'
            };
            errors = [];
            [ctx, errors] = ValueAssetsOutside.handlePost(ctx, errors);
            expect(ctx).to.deep.equal({
                netValueAssetsOutside: 500000,
                netValueAssetsOutsideField: '50a0000'
            });
            expect(errors).to.deep.equal([
                {
                    msg: {
                        summary: 'Net value can only contain numbers',
                        message: 'Net value must be a whole number or a number with 2 decimal places'
                    },
                    param: 'netValueAssetsOutsideField'
                }
            ]);
            done();
        });
    });

    describe('action()', () => {
        it('test it cleans up formdata if netValue + netValueAssetsOutside <= £250k', () => {
            const ctx = {
                netValue: 150000,
                netValueAssetsOutside: 80000
            };
            const formdata = {
                deceased: {
                    anyChildren: contentAnyChildren.optionYes,
                    allChildrenOver18: contentAllChildrenOver18.optionYes,
                    anyDeceasedChildren: contentAnyDeceasedChildren.optionYes,
                    anyGrandchildrenUnder18: contentAnyGrandChildrenUnder18.optionNo
                }
            };

            ValueAssetsOutside.action(ctx, formdata);

            assert.isUndefined(formdata.deceased.anyChildren);
            assert.isUndefined(formdata.deceased.allChildrenOver18);
            assert.isUndefined(formdata.deceased.anyDeceasedChildren);
            assert.isUndefined(formdata.deceased.anyGrandchildrenUnder18);
        });
    });
});
