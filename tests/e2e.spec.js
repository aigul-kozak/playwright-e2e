const { test, expect } = require('@playwright/test');
const { SplashPage } = require('../pageObjects/shubek_lubek_classes/splashPage.js');
const { WelcomePage } = require('../pageObjects/shubek_lubek_classes/welcomePage.js');
const { OnboardingPage } = require('../pageObjects/shubek_lubek_classes/onboardingPage.js');
const { LoginPage } = require('../pageObjects/shubek_lubek_classes/loginPage.js');
const { SubscribePage } = require('../pageObjects/shubek_lubek_classes/subscribePage.js');
const { ResetPINPage } = require('../pageObjects/shubek_lubek_classes/resetpinPage.js');
const {
  ResetPINSuccessPage,
} = require('../pageObjects/shubek_lubek_classes/resetpin_successPage.js');

const languageSelectors = {
  English: (welcomePage) => welcomePage.selectEnglish(),
  Arabic: (welcomePage) => welcomePage.selectArabic(),
  Kurdish: (welcomePage) => welcomePage.selectKurdish(),
};

test.describe('WEB Auth flow', () => {
  test('Web Auth flow', async ({ page }, testInfo) => {
    test.setTimeout(90_000);
    const languageName = testInfo.project.use.languageName;
    const selectLanguage = languageSelectors[languageName];

    if (!selectLanguage) {
      throw new Error(`No language selector defined for: ${languageName}`);
    }
    const splashPage = new SplashPage(page);
    const welcomePage = new WelcomePage(page);
    const onboardingPage = new OnboardingPage(page);
    const loginPage = new LoginPage(page);
    const subscribePage = new SubscribePage(page);
    const resetPINPage = new ResetPINPage(page);
    const resetPinSuccessPage = new ResetPINSuccessPage(page);

    // === Splash / Welcome ===
    await splashPage.open();
    await splashPage.waitForRedirectToWelcome();
    await welcomePage.welcomePageVisibilityCheck();
    await selectLanguage(welcomePage);
    await welcomePage.continueButtonClick();

    // === Onboarding ===
    await onboardingPage.onboardingPageCommonVisibiltyCheck();
    await onboardingPage.joinAdventureCardCheck();
    await onboardingPage.howStoriesDevelopCardCheck();
    await onboardingPage.valuesAndVirtuesCardCheck();

    await onboardingPage.howStoriesDevelopCardClickAndMovemnent();
    await onboardingPage.valuesAndVirtuesCardClickAndMovemnent();
    await onboardingPage.howStoriesDevelopCardClickAndMovemnent();
    await onboardingPage.joinAdventureCardClickAndMovemnent();
    await onboardingPage.clickLetsStartButton();

    // === Login ===
    await loginPage.loginPageElementsVisibilityCheck();
    await loginPage.enterPhoneNumber('012345');
    //await expect(loginPage.validationMessage1).toBeVisible();
    await loginPage.refreshLoginPage();

    await loginPage.enterPhoneNumber('0');
    await loginPage.clearPhoneNumber();
    //await expect(loginPage.validationMessage2).toBeVisible();
    await loginPage.refreshLoginPage();

    await loginPage.clickLoginButton();
    //await expect(loginPage.validationMessage2).toBeVisible();
    //await expect(loginPage.validationMessage4).toBeVisible();
    await loginPage.refreshLoginPage();

    await loginPage.enterPhoneNumber('7704302300');
    await loginPage.enterPIN('1234');

    await loginPage.expectPinHidden();
    await loginPage.togglePinVisibilityClick();
    await loginPage.expectPinVisible();
    await loginPage.togglePinVisibilityClick();
    await loginPage.expectPinHidden();

    await loginPage.rememberMeToBeChecked();
    await loginPage.clickRememberMeCheckbox();
    await loginPage.rememberMeToBeUnchecked();
    await loginPage.clickRememberMeCheckbox();
    await loginPage.rememberMeToBeChecked();

    // === What is PIN modal ===
    await loginPage.clickWhatIsPinLink();
    await loginPage.whatIsPINModalVisibiltyCheck();
    await loginPage.clickSubscribeButtonOnWhatIsPINModal();
    await subscribePage.goBackToLogin();

    // === Reset PIN ===
    await loginPage.clickWhatIsPinLink();
    await loginPage.clickResetPINOnWhatIsPINModal();
    await resetPINPage.resetPINPageElementsVisibilityCheck();

    await resetPINPage.enterPhoneNumber('2020');
    //await expect(resetPINPage.validationMessage1).toBeVisible();
    await resetPINPage.refreshResetPINPage();

    await resetPINPage.clickSendNewPinButtonFilledEmpty();
    //await expect(resetPINPage.validationMessage2).toBeVisible();
    await resetPINPage.refreshResetPINPage();

    await resetPINPage.enterPhoneNumber('0');
    await resetPINPage.clearPhoneNumber();
    //await expect(resetPINPage.validationMessage2).toBeVisible();
    await resetPINPage.goBackToLoginPage();

    await loginPage.clickWhatIsPinLink();
    await loginPage.clickResetPINOnWhatIsPINModal();
    await resetPINPage.enterPhoneNumber('7704302300');
    await resetPINPage.clickSendNewPinButtonFilled();

    // === Reset PIN Success ===
    await resetPinSuccessPage.resetPINSuccessPageVisibiltyCheck();
    await resetPinSuccessPage.clickBackToLoginButton();

    // === Subscribe ===
    await loginPage.clickWhatIsPinLink();
    await loginPage.closeWhatIsPINModal();
    await loginPage.clickSubscribeButton();
    await subscribePage.goBackToLogin();
  });
});
