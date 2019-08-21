'use strict';

const TestConfigurator = new (require('test/end-to-end/helpers/TestConfigurator'))();

Feature('Single Executor flow').retry(TestConfigurator.getRetryFeatures());

// eslint complains that the Before/After are not used but they are by codeceptjs
// so we have to tell eslint to not validate these
// eslint-disable-next-line no-undef
Before(() => {
    TestConfigurator.getBefore();
});

Scenario(TestConfigurator.idamInUseText('Single Executor Journey'), function (I) {

});
