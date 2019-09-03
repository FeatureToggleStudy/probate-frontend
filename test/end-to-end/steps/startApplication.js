'use strict';

module.exports = function (screenersToggle) {
    const I = this;
    const deathCertificateStopPage = 'deathCertificate';
    const englandOrWalesStopPage = 'notInEnglandOrWales';
    const ihtCompletedStopPage = 'ihtNotCompleted';
    const originalWillStopPage = 'notOriginal';
    const applicantIsExecutorStopPage = 'notExecutor';
    const mentalCapacityStopPage = 'mentalCapacity';
    const yes = '';
    const no = '-2';

    if (screenersToggle) {
        I.startScreeners();

        I.selectDeathCertificate(no);
        I.seeStopPage(deathCertificateStopPage);
        I.selectDeathCertificate(yes);

        I.selectDeceasedDomicile(no);
        I.seeStopPage(englandOrWalesStopPage);
        I.selectDeceasedDomicile(yes);

        I.selectIhtCompleted(no);
        I.seeStopPage(ihtCompletedStopPage);
        I.selectIhtCompleted(yes);

        I.selectPersonWhoDiedLeftAWill(yes);

        I.selectOriginalWill(no);
        I.seeStopPage(originalWillStopPage);
        I.selectOriginalWill(yes);

        I.selectApplicantIsExecutor(no);
        I.seeStopPage(applicantIsExecutorStopPage);
        I.selectApplicantIsExecutor(yes);

        I.selectMentallyCapable(no);
        I.seeStopPage(mentalCapacityStopPage);
        I.selectMentallyCapable(yes);

        I.applyAfterScreeners();
    }

    I.signIn(screenersToggle);
};
