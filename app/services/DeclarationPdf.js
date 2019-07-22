'use strict';

const Pdf = require('./Pdf');

class DeclarationPdf extends Pdf {

    post(req) {
        const pdfTemplate = this.config.pdf.template.declaration;
        const logMessage = 'Post probate declaration pdf';
        return super.post(pdfTemplate, req.session.legalDeclaration, logMessage, req);
    }
}

module.exports = DeclarationPdf;
