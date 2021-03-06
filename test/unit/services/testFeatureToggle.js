'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const FeatureToggle = require('app/services/FeatureToggle');
const config = require('app/config');

describe('FeatureToggleService', () => {
    describe('get()', () => {
        it('should call log() and fetchText()', (done) => {
            const endpoint = 'http://localhost';
            const featureToggleKey = 'probate-document-download';
            const fetchOptions = {method: 'GET'};
            const featureToggle = new FeatureToggle(endpoint, 'abc123');
            const logSpy = sinon.spy(featureToggle, 'log');
            const fetchTextSpy = sinon.spy(featureToggle, 'fetchText');
            const fetchOptionsStub = sinon.stub(featureToggle, 'fetchOptions').returns(fetchOptions);

            featureToggle.get(featureToggleKey);

            expect(featureToggle.log.calledOnce).to.equal(true);
            expect(featureToggle.log.calledWith('Get feature toggle')).to.equal(true);
            expect(featureToggle.fetchText.calledOnce).to.equal(true);
            expect(featureToggle.fetchText.calledWith(`${endpoint}${config.featureToggles.path}/${featureToggleKey}`, fetchOptions)).to.equal(true);

            logSpy.restore();
            fetchTextSpy.restore();
            fetchOptionsStub.restore();
            done();
        });
    });
});
