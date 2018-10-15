#!groovy

@Library("Infrastructure")

String product = "probate"
String component = "frontend"


List<LinkedHashMap<String, Object>> secrets = [
        secret('testIdamBaseUrl', 'IDAM_API_URL'),
        secret('testIdamLoginUrl', 'IDAM_LOGIN_URL'),
        secret('testUseIdam', 'USE_IDAM'),
        secret('testInviteIdListUrl', 'INVITE_ID_LIST_URL'),
        secret('testPinUrl', 'PIN_URL'),
        secret('testInvitationUrl', 'INVITATION_URL'),
        secret('testIdamAddUserUrl', 'IDAM_ADD_USER_URL'),
        secret('testIdamRole', 'IDAM_CITIZEN_ROLE'),
        secret('testIdamUserGroup', 'IDAM_USER_GROUP'),
        secret('testCitizenDomain', 'CITIZEN_EMAIL_DOMAIN'),
        secret('testEnvEmailAddress', 'TEST_EMAIL_ADDRESS'),
        secret('testEnvMobileNumber', 'TEST_MOBILE_NUMBER'),
        secret('testTerms', 'TERMS_AND_CONDITIONS'),
        secret('testSurvey', 'SURVEY'),
        secret('testsurveyEndOfApplication', 'SURVEY_END_OF_APPLICATION'),
        secret('testUseGovPay', 'USE_GOV_PAY'),
        secret('testPostcodeServiceUrl', 'POSTCODE_SERVICE_URL'),
        secret('testPostCodeAddressToken', 'ADDRESS_TOKEN'),
        secret('testRunE2ETest', 'RUN_E2E_TEST')
]

static LinkedHashMap<String, Object> secret(String secretName, String envVar) {
    [ $class: 'AzureKeyVaultSecret',
      secretType: 'Secret',
      name: secretName,
      version: '',
      envVariable: envVar
    ]
}

withPipeline("nodejs", product, component) {
    after('build') {
        sh 'yarn setup'
    }

    loadVaultSecrets(secrets)
    //enableSlackNotifications('#probate-jenkins')
    after('functionalTest:aat') {
        publishHTML target: [

                reportDir            : "output/",
                reportFiles          : "mochawesome.html",
                reportName           : "SAAT Functional Tests",
                alwaysLinkToLastBuild: true
        ]
    }
}
