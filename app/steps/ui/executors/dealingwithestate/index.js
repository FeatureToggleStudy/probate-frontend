'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const {includes, some, tail} = require('lodash');
const ExecutorsWrapper = require('app/wrappers/Executors');
const FormatName = require('app/utils/FormatName');

class ExecutorsDealingWithEstate extends ValidationStep {

    static getUrl() {
        return '/executors-dealing-with-estate';
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        if (ctx.list) {
            ctx.options = (new ExecutorsWrapper(ctx)).aliveExecutors()
                .map(executor => {
                    if (executor.isApplicant) {
                        const optionValue = executor.alias ? executor.alias : FormatName.format(executor);
                        return {option: optionValue, checked: true, disabled: true};
                    }
                    return {option: executor.fullName, checked: executor.isApplying === true};
                });
        }
        return ctx;
    }

    pruneExecutorData(data) {
        if (data.isApplying) {
            delete data.isDead;
            delete data.diedBefore;
            delete data.notApplyingReason;
            delete data.notApplyingKey;
        } else {
            delete data.isApplying;
            delete data.address;
            delete data.currentName;
            delete data.currentNameReason;
            delete data.email;
            delete data.freeTextAddress;
            delete data.hasOtherName;
            delete data.mobile;
            delete data.postcode;
            delete data.postcodeAddress;
        }
        return data;
    }

    handlePost(ctx, errors) {
        for (let i = 1; i < ctx.executorsNumber; i++) {
            ctx.list[i].isApplying = includes(ctx.executorsApplying, ctx.list[i].fullName);
            ctx.list[i] = this.pruneExecutorData(ctx.list[i]);
        }
        return [ctx, errors];
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.options;
        delete ctx.executorsApplying;
        return [ctx, formdata];
    }

    isComplete(ctx) {
        return [some(tail(ctx.list), exec => exec.isApplying === true), 'inProgress'];
    }
}

module.exports = ExecutorsDealingWithEstate;
