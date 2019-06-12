'use strict';

const pageUnderTest = require('app/steps/ui/summary/index');

module.exports = function (sectionNumber) {
    const I = this;

    I.seeCurrentUrlEquals(pageUnderTest.getUrl());
    switch (sectionNumber) {
    case '1':
        I.see('Deceased First Name', '#content > table:nth-child(5) > tbody > tr:nth-child(1) > td.check-your-answers__answer');
        I.see('Deceased Last Name', '#content > table:nth-child(5) > tbody > tr:nth-child(2) > td.check-your-answers__answer');
        I.see('Yes', '#content > table:nth-child(5) > tbody > tr:nth-child(3) > td.check-your-answers__answer');
        I.see('alias_firstnames_1 alias_lastnames_1', '#content > table:nth-child(5) > tbody > tr:nth-child(4) > td.check-your-answers__answer > div:nth-child(1)');
        I.see('alias_firstnames_2 alias_lastnames_2', '#content > table:nth-child(5) > tbody > tr:nth-child(4) > td.check-your-answers__answer > div:nth-child(2)');
        I.see('No', '#content > table:nth-child(5) > tbody > tr:nth-child(5) > td.check-your-answers__answer');
        I.see('1 January 1950', '#content > table:nth-child(5) > tbody > tr:nth-child(6) > td.check-your-answers__answer');
        I.see('1 January 2017', '#content > table:nth-child(5) > tbody > tr:nth-child(7) > td.check-your-answers__answer');
        I.see('test address for deceased', '#content > table:nth-child(5) > tbody > tr:nth-child(8) > td.check-your-answers__answer');
        I.see('Yes', '#content > table:nth-child(5) > tbody > tr:nth-child(9) > td.check-your-answers__answer');
        I.see('3', '#content > table:nth-child(5) > tbody > tr:nth-child(10) > td.check-your-answers__answer');
        I.see('bmp_test_file_for_document_upload.bmp', '#content > table:nth-child(7) > tbody > tr > td.check-your-answers__answer > div:nth-child(1)');
        I.see('jpg_test_file_for_document_upload.jpg', '#content > table:nth-child(7) > tbody > tr > td.check-your-answers__answer > div:nth-child(2)');
        I.see('pdf_test_file_for_document_upload.pdf', '#content > table:nth-child(7) > tbody > tr > td.check-your-answers__answer > div:nth-child(3)');
        I.see('png_test_file_for_document_upload.png', '#content > table:nth-child(7) > tbody > tr > td.check-your-answers__answer > div:nth-child(4)');
        I.see('tiff_test_file_for_document_upload.tiff', '#content > table:nth-child(7) > tbody > tr > td.check-your-answers__answer > div:nth-child(5)');
        I.see('By post', '#content > table:nth-child(9) > tbody > tr:nth-child(1) > td.check-your-answers__answer');
        I.see('IHT 205 - there was no inheritance tax to pay', '#content > table:nth-child(9) > tbody > tr:nth-child(2) > td.check-your-answers__answer');
        I.see('600000', '#content > table:nth-child(9) > tbody > tr:nth-child(3) > td.check-your-answers__answer');
        I.see('300000', '#content > table:nth-child(9) > tbody > tr:nth-child(4) > td.check-your-answers__answer');
        break;
    case '2':
        I.see('1', '#content > table:nth-child(11) > tbody > tr > td.check-your-answers__answer');
        I.see('Applicant First Name', '#content > table:nth-child(13) > tbody > tr:nth-child(1) > td.check-your-answers__answer');
        I.see('Applicant Last Name', '#content > table:nth-child(13) > tbody > tr:nth-child(2) > td.check-your-answers__answer');
        I.see('No', '#content > table:nth-child(13) > tbody > tr:nth-child(3) > td.check-your-answers__answer');
        I.see('Applicant Alias', '#content > table:nth-child(13) > tbody > tr:nth-child(4) > td.check-your-answers__answer');
        I.see('Applicant_alias_reason', '#content > table:nth-child(13) > tbody > tr:nth-child(5) > td.check-your-answers__answer');
        I.see('123456789', '#content > table:nth-child(13) > tbody > tr:nth-child(6) > td.check-your-answers__answer');
        I.see('test address', '#content > table:nth-child(13) > tbody > tr:nth-child(7) > td.check-your-answers__answer');
        break;
    default:
        // Continue
    }

    I.waitForNavigationToComplete('.button');
};
