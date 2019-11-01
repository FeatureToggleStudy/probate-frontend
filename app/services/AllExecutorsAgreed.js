'use strict';

const Service = require('./Service');

class AllExecutorsAgreed extends Service {
    get(authToken, serviceAuthorisation, ccdCaseId) {
        const headers = {
            'Content-Type': 'application/json',
            'Session-Id': this.sessionId,
            'Authorization': authToken,
            'ServiceAuthorization': serviceAuthorisation
        };
        this.log('Get all executors agreed');
        const url = this.formatUrl.format(this.endpoint, `/invite/allAgreed/${ccdCaseId}`);
        const fetchOptions = this.fetchOptions({}, 'GET', headers);
        return this.fetchText(url, fetchOptions);
    }
}

module.exports = AllExecutorsAgreed;
