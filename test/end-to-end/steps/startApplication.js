'use strict';

module.exports = function (screenersToggle) {
    const I = this;
    const deathCertificateStopPage = 'deathCertificate';
    const englandOrWalesStopPage = 'notInEnglandOrWales';
    const ihtCompletedStopPage = 'ihtNotCompleted';
    const originalWillStopPage = 'notOriginal';
    const applicantIsExecutorStopPage = 'notExecutor';
    const mentalCapacityStopPage = 'mentalCapacity';

    if (screenersToggle) {
        I.startScreeners();

        I.selectDeathCertificate('No');
        I.seeStopPage(deathCertificateStopPage);
        I.selectDeathCertificate('Yes');

        I.selectDeceasedDomicile('No');
        I.seeStopPage(englandOrWalesStopPage);
        I.selectDeceasedDomicile('Yes');

        I.selectIhtCompleted('No');
        I.seeStopPage(ihtCompletedStopPage);
        I.selectIhtCompleted('Yes');

        I.selectPersonWhoDiedLeftAWill('Yes');

        I.selectOriginalWill('No');
        I.seeStopPage(originalWillStopPage);
        I.selectOriginalWill('Yes');

        I.selectApplicantIsExecutor('No');
        I.seeStopPage(applicantIsExecutorStopPage);
        I.selectApplicantIsExecutor('Yes');

        I.selectMentallyCapable('No');
        I.seeStopPage(mentalCapacityStopPage);
        I.selectMentallyCapable('Yes');

        I.applyAfterScreeners();
    }

    I.signIn(screenersToggle);
};
