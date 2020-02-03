'use strict';

const router = require('express').Router();
const multipleApplications = require('app/middleware/multipleApplications');
const {get} = require('lodash');
const ExecutorsWrapper = require('app/wrappers/Executors');

router.get('/', (req, res) => {
    res.redirect('/dashboard');
});

router.get('/dashboard', (req, res, next) => multipleApplications.initDashboard(req, res, next));
router.get('/get-case/*', (req, res, next) => multipleApplications.getCase(req, res, next));

router.get('/task-list', (req, res, next) => {
    const formdata = req.session.form;
    const executorsWrapper = new ExecutorsWrapper(formdata.executors);
    const hasMultipleApplicants = executorsWrapper.hasMultipleApplicants();

    if ((get(formdata, 'declaration.declarationCheckbox', false)).toString() === 'true' && hasMultipleApplicants) {
        multipleApplications.getCase(req, res, next);
    } else {
        next();
    }
});

module.exports = router;
