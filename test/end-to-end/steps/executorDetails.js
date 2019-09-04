'use strict';

module.exports = function () {
    const I = this;

    I.selectATask();
    
};

function convertToLocator(option) {

    return option ? '' : '-2';
}
