'use strict';

const paymentData = require('app/components/payment-data');
const {assert, expect} = require('chai');

describe('payment-data.js', () => {
    describe('createPaymentData()', () => {
        it('should return no fees when there is no application fee, no uk copies and no overseas copies', (done) => {
            const data = {
                amount: 0,
                description: 'Ffioedd Profiant',
                ccdCaseId: '123',
                applicationFee: 0,
                copies: {
                    uk: {
                        number: 0
                    },
                    overseas: {
                        number: 0
                    }
                }
            };
            const result = paymentData.createPaymentData(data, 'cy');
            expect(result).to.deep.equal({
                amount: 0,
                description: 'Ffioedd Profiant',
                ccd_case_number: '123',
                service: 'PROBATE',
                currency: 'GBP',
                site_id: 'P223',
                fees: [],
                language: 'CY'
            });
            done();
        });

        it('should return the application fee when applicationFee > 0', (done) => {
            const data = {
                amount: 215,
                description: 'Ffioedd Profiant',
                ccdCaseId: '123',
                applicationFee: 215,
                copies: {
                    uk: {
                        number: 0,
                        cost: 0
                    },
                    overseas: {
                        number: 0,
                        cost: 0
                    }
                },
                userId: '11111'
            };
            const result = paymentData.createPaymentData(data, 'cy');
            expect(result).to.deep.equal({
                amount: 215,
                description: 'Ffioedd Profiant',
                ccd_case_number: '123',
                service: 'PROBATE',
                currency: 'GBP',
                site_id: 'P223',
                fees: [{
                    calculated_amount: 215,
                    ccd_case_number: '123',
                    code: 'FEE0226',
                    memo_line: 'Probate Fees',
                    reference: '11111',
                    version: '1',
                    volume: 1
                }],
                language: 'CY'
            });
            done();
        });

        it('should return the uk copies when uk.copies.number > 0', (done) => {
            const data = {
                amount: 1.50,
                description: 'Ffioedd Profiant',
                ccdCaseId: '123',
                applicationFee: 0,
                copies: {
                    uk: {
                        number: 1,
                        cost: 1.50
                    },
                    overseas: {
                        number: 0,
                        cost: 0
                    }
                },
                userId: '11111'
            };
            const result = paymentData.createPaymentData(data, 'cy');
            expect(result).to.deep.equal({
                amount: 1.50,
                description: 'Ffioedd Profiant',
                ccd_case_number: '123',
                service: 'PROBATE',
                currency: 'GBP',
                site_id: 'P223',
                fees: [{
                    calculated_amount: 1.50,
                    ccd_case_number: '123',
                    code: 'FEE0003',
                    memo_line: 'Additional UK copies',
                    reference: '11111',
                    version: '3',
                    volume: 1
                }],
                language: 'CY'
            });
            done();
        });

        it('should return the overseas copies when overseas.copies.number > 0', (done) => {
            const data = {
                amount: 3,
                description: 'Ffioedd Profiant',
                ccdCaseId: '123',
                applicationFee: 0,
                copies: {
                    uk: {
                        number: 0,
                        cost: 0
                    },
                    overseas: {
                        number: 2,
                        cost: 3
                    }
                },
                userId: '11111'
            };
            const result = paymentData.createPaymentData(data, 'cy');
            expect(result).to.deep.equal({
                amount: 3,
                description: 'Ffioedd Profiant',
                ccd_case_number: '123',
                service: 'PROBATE',
                currency: 'GBP',
                site_id: 'P223',
                fees: [{
                    calculated_amount: 3,
                    ccd_case_number: '123',
                    code: 'FEE003',
                    memo_line: 'Additional overseas copies',
                    reference: '11111',
                    version: '3',
                    volume: 2
                }],
                language: 'CY'
            });
            done();
        });

        it('should return all fees when there is an application fee, uk copies and overseas copies', (done) => {
            const data = {
                amount: 219.50,
                description: 'Ffioedd Profiant',
                ccdCaseId: '123',
                applicationFee: 215,
                copies: {
                    uk: {
                        number: 1,
                        cost: 1.50
                    },
                    overseas: {
                        number: 2,
                        cost: 3
                    }
                },
                userId: '11111'
            };
            const result = paymentData.createPaymentData(data, 'cy');
            expect(result).to.deep.equal({
                amount: 219.50,
                description: 'Ffioedd Profiant',
                ccd_case_number: '123',
                service: 'PROBATE',
                currency: 'GBP',
                site_id: 'P223',
                fees: [{
                    calculated_amount: 215,
                    ccd_case_number: '123',
                    code: 'FEE0226',
                    memo_line: 'Probate Fees',
                    reference: '11111',
                    version: '1',
                    volume: 1
                }, {
                    calculated_amount: 1.50,
                    ccd_case_number: '123',
                    code: 'FEE0003',
                    memo_line: 'Additional UK copies',
                    reference: '11111',
                    version: '3',
                    volume: 1
                }, {
                    calculated_amount: 3,
                    ccd_case_number: '123',
                    code: 'FEE003',
                    memo_line: 'Additional overseas copies',
                    reference: '11111',
                    version: '3',
                    volume: 2
                }],
                language: 'CY'
            });
            done();
        });

        it('should return all fees when there is an application fee, uk copies and overseas copies, but an empty language flag when english selected', (done) => {
            const data = {
                amount: 219.50,
                description: 'Probate Fees',
                ccdCaseId: '123',
                applicationFee: 215,
                copies: {
                    uk: {
                        number: 1,
                        cost: 1.50
                    },
                    overseas: {
                        number: 2,
                        cost: 3
                    }
                },
                userId: '11111'
            };
            const result = paymentData.createPaymentData(data, 'en');
            expect(result).to.deep.equal({
                amount: 219.50,
                description: 'Probate Fees',
                ccd_case_number: '123',
                service: 'PROBATE',
                currency: 'GBP',
                site_id: 'P223',
                fees: [{
                    calculated_amount: 215,
                    ccd_case_number: '123',
                    code: 'FEE0226',
                    memo_line: 'Probate Fees',
                    reference: '11111',
                    version: '1',
                    volume: 1
                }, {
                    calculated_amount: 1.50,
                    ccd_case_number: '123',
                    code: 'FEE0003',
                    memo_line: 'Additional UK copies',
                    reference: '11111',
                    version: '3',
                    volume: 1
                }, {
                    calculated_amount: 3,
                    ccd_case_number: '123',
                    code: 'FEE003',
                    memo_line: 'Additional overseas copies',
                    reference: '11111',
                    version: '3',
                    volume: 2
                }],
                language: ''
            });
            done();
        });
    });

    describe('createPaymentFees()', () => {
        it('should return the correct data', () => {
            const params = {
                amount: 4.50,
                ccdCaseId: 'CASEREF123',
                code: 'CODE123',
                memoLine: 'Additional overseas copies',
                reference: 123,
                version: 3,
                volume: 3
            };
            const paymentFees = paymentData.createPaymentFees(params);
            assert.deepEqual(paymentFees, {
                calculated_amount: params.amount,
                ccd_case_number: params.ccdCaseId,
                code: params.code,
                memo_line: params.memoLine,
                reference: params.reference,
                version: params.version,
                volume: params.volume
            });
        });
    });
});
