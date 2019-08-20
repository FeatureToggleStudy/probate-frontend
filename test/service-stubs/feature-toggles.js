'use strict';

const config = require('app/config');
const express = require('express');
const router = require('express').Router();
const logger = require('app/components/logger')('Init');
const app = express();
const featureTogglesPort = config.featureToggles.port;

const featureToggles = {
    'probate-fe-shutter': true,
    'probate-fees-api': true,
    'probate-webforms': true
};

Object.entries(featureToggles).forEach(([key, value]) => {
    router.get(`${config.featureToggles.path}/${key}`, (req, res) => {
        res.send(value.toString());
    });
});

app.use(router);

logger.info(`Listening on: ${featureTogglesPort}`);

const server = app.listen(featureTogglesPort);

module.exports = server;
