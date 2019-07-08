'use strict';

const setJourney = require('app/middleware/setJourney');
const Step = require('app/core/steps/Step');
const OptionGetRunner = require('app/core/runners/OptionGetRunner');
const FieldError = require('app/components/error');
const {isEmpty, map, includes, get, unescape} = require('lodash');
const logger = require('app/components/logger')('Init');
const utils = require('app/components/step-utils');
const ExecutorsWrapper = require('app/wrappers/Executors');
const WillWrapper = require('app/wrappers/Will');
const FormatName = require('app/utils/FormatName');
const CheckAnswersSummaryJSONObjectBuilder = require('app/utils/CheckAnswersSummaryJSONObjectBuilder');
const checkAnswersSummaryJSONObjBuilder = new CheckAnswersSummaryJSONObjectBuilder();
const ServiceMapper = require('app/utils/ServiceMapper');
const Authorise = require('app/services/Authorise');
const config = require('app/config');

class Summary extends Step {

    runner() {
        return new OptionGetRunner();
    }

    static getUrl(redirect = '*') {
        return `/summary/${redirect}`;
    }

    * handlePost(ctx, errors, formdata, session, hostname) {
        const authorise = new Authorise(config.services.idam.s2s_url, ctx.sessionID);
        const serviceAuthResult = yield authorise.post();
        if (serviceAuthResult.name === 'Error') {
            logger.info(`serviceAuthResult Error = ${serviceAuthResult}`);
            const keyword = 'failure';
            const errors = [];
            errors.push(FieldError('authorisation', keyword, this.resourcePath, ctx));
            return [ctx, errors];
        }
        const result = yield this.validateFormData(formdata, ctx, serviceAuthResult);
        if (result.type === 'VALIDATION') {
            errors = [FieldError('businessError', 'validationError', this.resourcePath, ctx)];
        };
        return [ctx, errors];
    }

    * handleGet(ctx, formdata) {
        const executorsWrapper = new ExecutorsWrapper(formdata.executors);
        const executorsApplying = executorsWrapper.executorsApplying(true);

        ctx.executorsAlive = executorsWrapper.hasAliveExecutors();
        ctx.executorsWhoDied = executorsWrapper.deadExecutors().map(exec => exec.fullName);
        ctx.executorsDealingWithEstate = executorsApplying.map(exec => exec.fullName);
        ctx.executorsPowerReservedOrRenounced = executorsWrapper.hasRenunciatedOrPowerReserved();
        ctx.executorsWithOtherNames = executorsWrapper.executorsWithAnotherName().map(exec => exec.fullName);

        utils.updateTaskStatus(ctx, ctx, this.steps);
        return [ctx, null];
    }

    * validateFormData(data, ctx, serviceAuthResult) {
        const validateData = ServiceMapper.map(
            'ValidateData',
            [config.services.orchestrator.url, ctx.sessionID],
            ctx.journeyType
        );
        const result = yield validateData.put(data, ctx.authToken, serviceAuthResult);
        return result;
    }

    generateContent(ctx, formdata) {
        const content = {};

        Object.keys(this.steps)
            .filter((stepName) => stepName !== this.name)
            .forEach((stepName) => {
                const step = this.steps[stepName];
                content[stepName] = step.generateContent(formdata[step.section], formdata);
                content[stepName].url = step.constructor.getUrl();
            });
        content[this.name] = super.generateContent(ctx, formdata);
        content[this.name].url = Summary.getUrl();
        return content;
    }

    generateFields(ctx, errors, formdata) {
        const fields = {};
        Object.keys(this.steps)
            .filter((stepName) => stepName !== this.name)
            .forEach((stepName) => {
                const step = this.steps[stepName];
                if (isEmpty(fields[step.section])) {
                    fields[step.section] = step.generateFields(formdata[step.section], errors, formdata);
                }
            });
        fields[this.section] = super.generateFields(ctx, errors, formdata);

        if (ctx) {
            fields.featureToggles = {};
            fields.featureToggles.value = ctx.featureToggles;

            if (ctx.journeyType === 'intestacy') {
                fields[this.section].deceasedMaritalStatusQuestion.value = unescape(fields[this.section].deceasedMaritalStatusQuestion.value);
                fields[this.section].deceasedDivorcePlaceQuestion.value = unescape(fields[this.section].deceasedDivorcePlaceQuestion.value);
                fields[this.section].deceasedAnyChildrenQuestion.value = unescape(fields[this.section].deceasedAnyChildrenQuestion.value);
                fields[this.section].deceasedAnyOtherChildrenQuestion.value = unescape(fields[this.section].deceasedAnyOtherChildrenQuestion.value);
                fields[this.section].deceasedAnyDeceasedChildrenQuestion.value = unescape(fields[this.section].deceasedAnyDeceasedChildrenQuestion.value);
                fields[this.section].deceasedAllChildrenOver18Question.value = unescape(fields[this.section].deceasedAllChildrenOver18Question.value);
                fields[this.section].deceasedSpouseNotApplyingReasonQuestion.value = unescape(fields[this.section].deceasedSpouseNotApplyingReasonQuestion.value);

                if (fields.applicant && fields.applicant.spouseNotApplyingReason) {
                    fields.applicant.spouseNotApplyingReason.value = unescape(fields.applicant.spouseNotApplyingReason.value);
                }
            }
        }

        return fields;
    }

    getContextData(req) {
        const formdata = req.session.form;
        formdata.summary = {'readyToDeclare': includes(req.url, 'declaration')};
        const ctx = super.getContextData(req);
        const willWrapper = new WillWrapper(formdata.will);
        const deceasedName = FormatName.format(formdata.deceased);
        const content = this.generateContent(ctx, formdata);
        const hasCodicils = willWrapper.hasCodicils();
        ctx.journeyType = setJourney.getJourneyName(req.session);
        ctx.ihtTotalNetValue = get(formdata, 'iht.netValue', 0);

        ctx.deceasedAliasQuestion = content.DeceasedAlias.question
            .replace('{deceasedName}', deceasedName ? deceasedName : content.DeceasedAlias.theDeceased);
        if (ctx.journeyType === 'gop') {
            ctx.deceasedMarriedQuestion = (hasCodicils ? content.DeceasedMarried.questionWithCodicil : content.DeceasedMarried.question)
                .replace('{deceasedName}', deceasedName);
        } else {
            ctx.deceasedMaritalStatusQuestion = content.DeceasedMaritalStatus.question
                .replace('{deceasedName}', deceasedName ? deceasedName : content.DeceasedMaritalStatus.theDeceased);
            ctx.deceasedDivorcePlaceQuestion = content.DivorcePlace.question
                .replace('{legalProcess}', (formdata.deceased && formdata.deceased.maritalStatus === content.DeceasedMaritalStatus.optionDivorced) ? content.DeceasedMaritalStatus.divorce : content.DeceasedMaritalStatus.separation);
            ctx.deceasedAnyChildrenQuestion = content.AnyChildren.question
                .replace('{deceasedName}', deceasedName ? deceasedName : content.AnyChildren.theDeceased);
            ctx.deceasedAnyOtherChildrenQuestion = content.AnyOtherChildren.question
                .replace('{deceasedName}', deceasedName ? deceasedName : content.AnyOtherChildren.theDeceased);
            ctx.deceasedAnyDeceasedChildrenQuestion = content.AnyDeceasedChildren.question
                .replace('{deceasedName}', deceasedName ? deceasedName : content.AnyDeceasedChildren.theDeceased)
                .replace('{deceasedDoD}', (formdata.deceased && formdata.deceased.dod_formattedDate) ? formdata.deceased.dod_formattedDate : '');
            ctx.deceasedAllChildrenOver18Question = content.AllChildrenOver18.question
                .replace('{deceasedName}', deceasedName ? deceasedName : content.AllChildrenOver18.theDeceased);
            ctx.deceasedSpouseNotApplyingReasonQuestion = content.SpouseNotApplyingReason.question
                .replace('{deceasedName}', deceasedName ? deceasedName : content.SpouseNotApplyingReason.theDeceased);

            if (ctx.journeyType === 'intestacy' && formdata.iht && formdata.iht.assetsOutside === content.AssetsOutside.optionYes) {
                ctx.ihtTotalNetValue += formdata.iht.netValueAssetsOutside;
            }
            ctx.ihtTotalNetValueGreaterThan250k = (ctx.ihtTotalNetValue > config.assetsValueThreshold);
        }

        if (formdata.documents && formdata.documents.uploads) {
            ctx.uploadedDocuments = formdata.documents.uploads.map(doc => doc.filename);
        }

        ctx.softStop = this.anySoftStops(formdata, ctx);
        ctx.alreadyDeclared = this.alreadyDeclared(req.session);
        ctx.session = req.session;
        ctx.authToken = req.authToken;
        return ctx;
    }

    renderPage(res, html) {
        res.req.session.checkAnswersSummary = checkAnswersSummaryJSONObjBuilder.build(html);
        res.send(html);
    }
}

module.exports = Summary;
