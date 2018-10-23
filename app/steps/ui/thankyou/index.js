'use strict';

const Step = require('app/core/steps/Step');

class ThankYou extends Step {

    static getUrl () {
        return '/thankyou';
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        ctx.ccdReferenceNumber = req.session.form.ccdCase.id;
        return ctx;
    }

    handleGet(ctx, formdata) {
        ctx.softStop = this.anySoftStops(formdata, ctx);
        return [ctx];
    }
}

module.exports = ThankYou;
