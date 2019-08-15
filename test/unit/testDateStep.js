'use strict';

const expect = require('chai').expect;
const DateStep = require('app/core/steps/DateStep');
const moment = require('moment');
const config = require('app/config');
const sinon = require('sinon');

describe('DateStep', () => {
    const steps = {};
    const section = 'deceased';
    const resourcePath = 'deceased/dob';
    const i18next = {};
    const schema = require('app/steps/ui/deceased/dob/schema');
    const dateStep = new DateStep(steps, section, resourcePath, i18next, schema);

    describe('dateName()', () => {
        it('should return null', (done) => {
            const dateName = dateStep.dateName();

            expect(dateName).to.equal(null);
            done();
        });
    });

    describe('getContextData()', () => {
        it('should return the correct ctx with a parsed date', (done) => {
            const req = {
                session: {
                    form: {
                        deceased: {
                            'firstName': 'Dee',
                            'lastName': 'Ceased',
                            'dob-day': '15',
                            'dob-month': '12',
                            'dob-year': '1956',
                            'dod-day': '4',
                            'dod-month': '6',
                            'dod-year': '2018'
                        }
                    }
                }
            };
            const parseDateStub = sinon.stub(dateStep, 'parseDate').returns({
                'firstName': 'Dee',
                'lastName': 'Ceased',
                'dob-day': 15,
                'dob-month': 12,
                'dob-year': 1956,
                'dob-date': '1956-12-15T00:00:00.000Z',
                'dob-formattedDate': '15 December 1956',
                'dod-day': 4,
                'dod-month': 6,
                'dod-year': 2018,
                'dod-date': '2018-06-04T23:00:00.000Z',
                'dod-formattedDate': '4 June 2018'
            });
            const dateNameStub = sinon.stub(dateStep, 'dateName').returns(['dob', 'dod']);
            const ctx = dateStep.getContextData(req);

            expect(ctx).to.deep.equal({
                'firstName': 'Dee',
                'lastName': 'Ceased',
                'dob-day': 15,
                'dob-month': 12,
                'dob-year': 1956,
                'dob-date': '1956-12-15T00:00:00.000Z',
                'dob-formattedDate': '15 December 1956',
                'dod-day': 4,
                'dod-month': 6,
                'dod-year': 2018,
                'dod-date': '2018-06-04T23:00:00.000Z',
                'dod-formattedDate': '4 June 2018'
            });
            parseDateStub.restore();
            dateNameStub.restore();
            done();
        });
    });

    describe('parseDate()', () => {
        it('should parse an invalid date and store it in the context as null', (done) => {
            const dateNames = ['dob', 'dod'];
            const testCtx = {
                'dob-day': '15',
                'dob-month': '13',
                'dob-year': '1956',
                'dod-day': '4',
                'dod-month': '6',
                'dod-year': '2018'
            };
            const ctx = dateStep.parseDate(testCtx, dateNames);
            expect(ctx).to.deep.equal({
                'dob-day': 15,
                'dob-month': 13,
                'dob-year': 1956,
                'dob-date': '',
                'dod-day': 4,
                'dod-month': 6,
                'dod-year': 2018,
                'dod-date': '2018-06-04T00:00:00.000Z',
                'dod-formattedDate': '4 June 2018'
            });
            done();
        });

        it('should parse a valid date and store it in the context', (done) => {
            const dateNames = ['dob', 'dod'];
            const testCtx = {
                'dob-day': '15',
                'dob-month': '12',
                'dob-year': '1956',
                'dod-day': '4',
                'dod-month': '6',
                'dod-year': '2018'
            };
            const ctx = dateStep.parseDate(testCtx, dateNames);
            expect(ctx).to.deep.equal({
                'dob-day': 15,
                'dob-month': 12,
                'dob-year': 1956,
                'dob-date': '1956-12-15T00:00:00.000Z',
                'dob-formattedDate': '15 December 1956',
                'dod-day': 4,
                'dod-month': 6,
                'dod-year': 2018,
                'dod-date': '2018-06-04T00:00:00.000Z',
                'dod-formattedDate': '4 June 2018'
            });
            done();
        });
    });

    describe('formattedDate()', () => {
        it('should return a formatted date', (done) => {
            const testDate = moment('12/12/2018', config.dateFormat);
            const returnDate = dateStep.formattedDate(testDate);

            expect(returnDate).to.equal('12 December 2018');
            done();
        });
    });
});
