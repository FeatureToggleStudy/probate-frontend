'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const FormatName = require('app/utils/FormatName');
const logger = require('app/components/logger')('Init');
const InviteLink = require('app/services/InviteLink');
const config = require('app/config');

class ExecutorsInvite extends ValidationStep {

    static getUrl() {
        return '/executors-invite';
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        ctx.inviteSuffix = ctx.executorsNumber > 2 ? '-multiple' : '';
        ctx.authToken = req.authToken;
        ctx.serviceAuthorization = req.session.serviceAuthorization;
        return ctx;
    }

    nextStepUrl(req, ctx) {
        return this.next(req, ctx).constructor.getUrl();
    }

    * handlePost(ctx, errors, formdata, session) {
        const inviteLink = new InviteLink(config.services.orchestrator.url, ctx.sessionID);
        const executorsToNotifyList = ctx.list
            .filter(exec => exec.isApplying && !exec.isApplicant)
            .map(exec => {
                return {
                    executorName: exec.fullName,
                    firstName: formdata.deceased.firstName,
                    lastName: formdata.deceased.lastName,
                    email: exec.email,
                    phoneNumber: exec.mobile,
                    formdataId: session.regId,
                    leadExecutorName: FormatName.format(formdata.applicant)
                };
            });

        yield inviteLink.post(executorsToNotifyList, ctx.authToken, ctx.serviceAuthorization)
            .then(result => {
                if (result.name === 'Error') {
                    logger.error(`Error while sending executor email invites: ${result}`);
                    throw new ReferenceError('Error while sending co-applicant invitation emails.');
                } else {
                    result.invites.forEach((execResult) => {
                        const result = {
                            inviteId: execResult.inviteId,
                            emailSent: true
                        };

                        Object.assign(ctx.list.find(execList => execList.email === execResult.email), result);
                    });
                }
            });

        // yield ctx.list
        //     .filter(exec => exec.isApplying && !exec.isApplicant)
        //     .map(exec => {
        //         const data = {
        //             executorName: exec.fullName,
        //             firstName: formdata.deceased.firstName,
        //             lastName: formdata.deceased.lastName,
        //             email: exec.email,
        //             phoneNumber: exec.mobile,
        //             formdataId: session.regId,
        //             leadExecutorName: FormatName.format(formdata.applicant)
        //         };
        //         return inviteLink.post(data, exec, ctx.authToken, ctx.serviceAuthorization).then(result => {
        //             if (result.name === 'Error') {
        //                 throw new ReferenceError('Error while sending co-applicant invitation email.');
        //             } else {
        //                 exec.inviteId = result;
        //                 exec.emailSent = true;
        //                 return exec;
        //             }
        //         });
        //     });

        ctx.invitesSent = 'true';
        return [ctx, errors];
    }

    isComplete(ctx) {
        return [ctx.invitesSent, 'inProgress'];
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.inviteSuffix;
        delete ctx.serviceAuthorization;
        delete ctx.authToken;
        return [ctx, formdata];
    }
}

module.exports = ExecutorsInvite;
