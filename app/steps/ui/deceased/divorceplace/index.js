'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class DivorcePlace extends ValidationStep {

    static getUrl() {
        return '/deceased-divorce-or-separation-place';
    }

    getContextData(req) {
        const contentMaritalStatus = require(`app/resources/${req.session.language}/translation/deceased/maritalstatus`);
        const ctx = super.getContextData(req);
        const formdata = req.session.form;

        if (formdata.deceased && formdata.deceased.maritalStatus) {
            ctx.legalProcess = formdata.deceased.maritalStatus === 'optionDivorced' ? contentMaritalStatus.divorce : contentMaritalStatus.separation;
        }

        return ctx;
    }

    generateFields(ctx, errors) {
        const commonContent = require(`app/resources/${ctx.language}/translation/common`);
        const content = require(`app/resources/${ctx.language}/translation/deceased/divorceplace`);
        const fields = super.generateFields(ctx, errors);

        fields.title = `${content.title} - ${commonContent.serviceName}`;

        if (ctx && ctx.legalProcess) {
            fields.title = fields.title.replace('{legalProcess}', ctx.legalProcess);

            if (fields.divorcePlace && fields.divorcePlace.error) {
                errors[0].msg.summary = fields.divorcePlace.errorMessage.summary.replace('{legalProcess}', ctx.legalProcess);
                errors[0].msg.message = fields.divorcePlace.errorMessage.message.replace('{legalProcess}', ctx.legalProcess);
            }
        }

        return fields;
    }

    nextStepUrl(req, ctx) {
        if (ctx.legalProcess === 'divorce') {
            return this.next(req, ctx).constructor.getUrl('divorcePlace');
        }

        return this.next(req, ctx).constructor.getUrl('separationPlace');
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'divorcePlace', value: 'optionYes', choice: 'inEnglandOrWales'},
            ]
        };
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.legalProcess;
        return [ctx, formdata];
    }
}

module.exports = DivorcePlace;
