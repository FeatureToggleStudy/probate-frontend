'use strict';

const EligibilityValidationStep = require('app/core/steps/EligibilityValidationStep');
const content = require('app/resources/en/translation/screeners/willoriginal');
const EligibilityCookie = require('app/utils/EligibilityCookie');
const eligibilityCookie = new EligibilityCookie();
const pageUrl = '/will-original';
const fieldKey = 'original';

class WillOriginal extends EligibilityValidationStep {

    static getUrl() {
        return pageUrl;
    }

    handlePost(ctx, errors, formdata, session) {
        delete session.form;
        return [ctx, errors];
    }

    getContextData(req, res) {
        return super.getContextData(req, res, pageUrl, fieldKey);
    }

    nextStepUrl(req, ctx) {
        return this.next(req, ctx).constructor.getUrl('notOriginal');
    }

    nextStepOptions() {
        return {
            options: [
                {key: fieldKey, value: content.optionYes, choice: 'isOriginal'}
            ]
        };
    }

    persistFormData() {
        return {};
    }

    setEligibilityCookie(req, res, nextStepUrl) {
        eligibilityCookie.setCookie(req, res, nextStepUrl);
    }
}

module.exports = WillOriginal;
