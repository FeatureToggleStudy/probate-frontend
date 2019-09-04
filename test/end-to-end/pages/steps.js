'use strict';

const requireDirectory = require('require-directory');
const pages = requireDirectory(module);
const steps = requireDirectory(module, '../steps');

module.exports = function () {
    return actor({
        // Stop page
        seeStopPage: pages.stoppage.stoppage,

        // Screener Pages
        startScreeners: pages.screeners.starteligibility,
        selectDeathCertificate: pages.screeners.deathcertificate,
        selectDeceasedDomicile: pages.screeners.deceaseddomicile,
        selectIhtCompleted: pages.screeners.ihtcompleted,
        selectPersonWhoDiedLeftAWill: pages.screeners.willleft,
        selectOriginalWill: pages.screeners.willoriginal,
        selectApplicantIsExecutor: pages.screeners.applicantexecutor,
        selectMentallyCapable: pages.screeners.mentalcapacity,
        selectDiedAfterOctober2014: pages.screeners.diedafteroctober2014,
        selectRelatedToDeceased: pages.screeners.relatedtodeceased,
        selectOtherApplicants: pages.screeners.otherapplicants,
        applyAfterScreeners: pages.screeners.startapply,

        // Sign In to IDAM
        signIn: pages.IDAM.signIn,

        // Start application
        selectATask: pages.tasklist.tasklist,

        // Deceased
        enterDeceasedName: pages.deceased.name,
        enterDeceasedDateOfBirth: pages.deceased.dob,
        enterDeceasedDateOfDeath: pages.deceased.dod,
        enterDeceasedAddress: pages.deceased.address,
        selectDocumentsToUpload: pages.documentupload.documentupload,
        selectInheritanceMethod: pages.iht.method,
        enterIHTPaperValues: pages.iht.paper,
        enterIHTIdentifier: pages.iht.identifier,
        enterIHTOnlineValues: pages.iht.value,
        selectDeceasedAlias: pages.deceased.alias,
        enterDeceasedAliases: pages.deceased.otherNames,
        selectDeceasedMarried: pages.deceased.married,
        selectCodicils: pages.will.codicils,
        selectNoOfCodicils: pages.will.codicilsnumber,
        enterAnyChildren: pages.deceased.anychildren,
        enterAnyOtherChildren: pages.deceased.anyotherchildren,

        // Executors
        enterApplicantName: pages.applicant.name,
        selectApplicantNameAsOnWill: pages.applicant.nameasonwill,
        enterApplicantAlias: pages.applicant.alias,
        enterApplicantAliasReason: pages.applicant.aliasreason,
        enterApplicantPhone: pages.applicant.phone,
        enterApplicantAddress: pages.applicant.address,
        enterTotalExecutors: pages.executors.number,

        // Multiple Executors
        enterExecutorNames: pages.executors.names,
        selectExecutorsAllAlive: pages.executors.allalive,
        selectExecutorsWhoDied: pages.executors.whodied,
        selectExecutorsWhenDied: pages.executors.whendied,
        selectExecutorsApplying: pages.executors.applying,
        selectExecutorsDealingWithEstate: pages.executors.dealingwithestate,
        selectExecutorsWithDifferentNameOnWill: pages.executors.alias,
        selectWhichExecutorsWithDifferentNameOnWill: pages.executors.othername,
        enterExecutorCurrentName: pages.executors.currentname,
        enterExecutorCurrentNameReason: pages.executors.currentnamereason,
        enterExecutorContactDetails: pages.executors.contactdetails,
        enterExecutorManualAddress: pages.executors.address,
        selectExecutorRoles: pages.executors.roles,
        selectHasExecutorBeenNotified: pages.executors.notified,

        // Summary page
        seeSummaryPage: pages.summary.summary,
        acceptDeclaration: pages.declaration.declaration,

        // Notify additional executors
        notifyAdditionalExecutors: pages.executors.invite,

        // Pin page for additional executor
        enterPinCode: pages.pin.signin,

        // Additional executors Agree/Disagree with Statement of Truth
        seeCoApplicantStartPage: pages.coapplicant.startPage,
        agreeDisagreeDeclaration: pages.coapplicant.declaration,
        seeAgreePage: pages.coapplicant.agree,

        // Asset pages
        selectOverseasAssets: pages.assets.overseas,

        // Copies pages
        enterUkCopies: pages.copies.uk,
        enterOverseasCopies: pages.copies.overseas,
        seeCopiesSummary: pages.copies.summary,

        // Payment
        seePaymentBreakdown: pages.payment.paymentbreakdown,
        enterGovUkPayment: pages.payment.govukpayment,
        seeGovUkConfirm: pages.payment.govukconfirmpayment,
        seePaymentStatus: pages.payment.paymentstatus,

        // Documents
        seeDocumentsPage: pages.documents.documents,

        // Thank You
        seeThankYouPage: pages.thankyou.thankyou,

        // Intestacy
        enterDeceasedDetails: pages.deceased.details,
        selectAssetsOutsideEnglandWales: pages.deceased.assetsoutsideenglandwales,
        enterValueAssetsOutsideEnglandWales: pages.deceased.valueassetsoutsideenglandwales,
        selectDeceasedMaritalStatus: pages.deceased.maritalstatus,
        selectDeceasedDivorcePlace: pages.deceased.divorceplace,
        selectRelationshipToDeceased: pages.applicant.relationshiptodeceased,
        selectSpouseNotApplyingReason: pages.applicant.spousenotapplyingreason,

        // Tasks
        completeEligibilityTask: pages.tasks.tasks.completeEligibilityTask,
        completeExecutorsTask: pages.tasks.tasks.completeExecutorsTask,

        // steps
        startApplicationProbate: steps.startApplication,
        completeDeceasedDetails: steps.deceasedDetails,
        completeApplicantDetails: steps.applicantDetails,
        completeLegalDeclaration: steps.legalDeclaration,
        completeCopiesDetails: steps.copies,
        completePayment: steps.payment
    });
};
