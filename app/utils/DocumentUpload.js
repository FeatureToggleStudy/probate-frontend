'use strict';

const fileType = require('file-type');
const config = require('app/config').documentUpload;
const content = require('app/resources/en/translation/common');

class DocumentUpload {
    initDocuments(formdata) {
        if (!formdata.documents) {
            formdata.documents = {};
        }
        return formdata;
    }

    addDocument(filename, url, uploads = []) {
        if (filename && url) {
            uploads.push({filename, url});
        }
        return uploads;
    }

    removeDocument(index, uploads = []) {
        if (!isNaN(index) && uploads.length > 0) {
            uploads.splice(index, 1);
        }
        return uploads;
    }

    findDocumentId(url = '') {
        return url.split('/').reduce((acc, val) => {
            acc = val;
            return acc;
        });
    }

    isDocument(document) {
        return typeof document === 'object';
    }

    isValidType(document = {}) {
        const validMimeTypes = config.validMimeTypes;

        if (!validMimeTypes.includes(document.mimetype)) {
            return false;
        }

        const uploadedDocumentType = fileType(document.buffer);

        if (!uploadedDocumentType) {
            return false;
        }

        return validMimeTypes.includes(uploadedDocumentType.mime);
    }

    isValidSize(document) {
        return document.size <= config.maxSizeBytes;
    }

    isValidNumber(uploads = []) {
        return uploads.length < config.maxFiles;
    }

    validate(document, uploads) {
        let error = null;

        if (!this.isDocument(document)) {
            error = this.mapError('nothingUploaded');
        }

        if (error === null && !this.isValidType(document)) {
            error = this.mapError('invalidFileType');
        }

        if (error === null && !this.isValidSize(document)) {
            error = this.mapError('maxSize');
        }

        if (error === null && !this.isValidNumber(uploads)) {
            error = this.mapError('maxFiles');
        }

        return error;
    }

<<<<<<< HEAD
    mapError(errorKey) {
=======
    errorKey(errorType) {
        const errorKey = Object.entries(config.error).filter((value) => {
            return value[1] === errorType ? value : null;
        });
        return errorKey[0] ? errorKey[0][0] : null;
    }

    mapError(errorType) {
        const errorKey = this.errorKey(errorType);
>>>>>>> PRO-3775: Update unit tests for the DocumentUpload util class
        return {
            js: content[`documentUpload-${errorKey}`],
            nonJs: errorKey
        };
    }
}

module.exports = DocumentUpload;
