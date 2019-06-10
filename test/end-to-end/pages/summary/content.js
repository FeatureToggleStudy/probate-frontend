'use strict';

const pageUnderTest = require('app/steps/ui/summary/index');

module.exports = function (sectionNumber) {
    const I = this;

    I.seeCurrentUrlEquals(pageUnderTest.getUrl());

    switch (sectionNumber) {
    case '1':
        I.see('Deceased First Name', '#content > dl:nth-child(5) > div:nth-child(1) > dd.check-your-answers__answer');
        I.see('Deceased Last Name', '#content > dl:nth-child(5) > div:nth-child(2) > dd.check-your-answers__answer');
        I.see('Yes', '#content > dl:nth-child(5) > div:nth-child(3) > dd.check-your-answers__answer');
        I.see('alias_firstnames_1 alias_lastnames_1', '#content > dl:nth-child(5) > div:nth-child(4) > dd.check-your-answers__answer > div:nth-child(1)');
        I.see('alias_firstnames_2 alias_lastnames_2', '#content > dl:nth-child(5) > div:nth-child(4) > dd.check-your-answers__answer > div:nth-child(2)');
        I.see('No', '#content > dl:nth-child(5) > div:nth-child(5) > dd.check-your-answers__answer');
        I.see('1 January 1950', '#content > dl:nth-child(5) > div:nth-child(6) > dd.check-your-answers__answer');
        I.see('1 January 2017', '#content > dl:nth-child(5) > div:nth-child(7) > dd.check-your-answers__answer');
        I.see('test address for deceased', '#content > dl:nth-child(5) > div:nth-child(8) > dd.check-your-answers__answer');
        I.see('Yes', '#content > dl:nth-child(5) > div:nth-child(9) > dd.check-your-answers__answer');
        I.see('3', '#content > dl:nth-child(5) > div:nth-child(10) > dd.check-your-answers__answer');
        I.see('png_test_file_for_document_upload.png', '#content > dl:nth-child(7) > div > dd.check-your-answers__answer > div');
        I.see('By post', '#content > dl:nth-child(9) > div:nth-child(1) > dd.check-your-answers__answer');
        I.see('IHT 205 - there was no inheritance tax to pay', '#content > dl:nth-child(9) > div:nth-child(2) > dd.check-your-answers__answer');
        I.see('600000', '#content > dl:nth-child(9) > div:nth-child(3) > dd.check-your-answers__answer');
        I.see('300000', '#content > dl:nth-child(9) > div:nth-child(4) > dd.check-your-answers__answer');
        break;
    case '2':
        I.see('1', '#content > dl:nth-child(11) > div:nth-child(1) > dd.check-your-answers__answer');
        I.see('Applicant First Name', '#content > dl:nth-child(11) > div:nth-child(3) > dd.check-your-answers__answer');
        I.see('Applicant Last Name', '#content > dl:nth-child(11) > div:nth-child(4) > dd.check-your-answers__answer');
        I.see('No', '#content > dl:nth-child(11) > div:nth-child(5) > dd.check-your-answers__answer');
        I.see('Applicant Alias', '#content > dl:nth-child(11) > div:nth-child(6) > dd.check-your-answers__answer');
        I.see('Applicant_alias_reason', '#content > dl:nth-child(11) > div:nth-child(7) > dd.check-your-answers__answer');
        I.see('123456789', '#content > dl:nth-child(11) > div:nth-child(8) > dd.check-your-answers__answer');
        I.see('test address', '#content > dl:nth-child(11) > div:nth-child(9) > dd.check-your-answers__answer');
        break;
    default:
        // Continue
    }

    I.waitForNavigationToComplete('.button');
};
