const { expect } = require('@playwright/test');
class WelcomePage {
  constructor(page) {
    this.page = page;
    // Language selector
    this.languageDropdown = page.locator(
      'flt-semantics[flt-semantics-identifier="language_selector"]',
    );
    this.languageModal = page.locator(
      'flt-semantics[flt-semantics-identifier="language_selector_modal"]',
    );

    this.englishButton = page.locator(
      'flt-semantics[flt-semantics-identifier="language_option_en"]',
    );
    this.arabicButton = page.locator(
      'flt-semantics[flt-semantics-identifier="language_option_ar"]',
    );
    this.kurdishButton = page.locator(
      'flt-semantics[flt-semantics-identifier="language_option_ku"]',
    );
    // Welcome page elements
    this.welcomePage = page.locator('flt-semantics[flt-semantics-identifier="welcome_page"]');
    this.heroImage = this.welcomePage.locator(':scope > flt-semantics[role="img"]');
    this.contentGroup = this.welcomePage.locator('flt-semantics[role="group"]');
    this.smallIcon = this.contentGroup.locator('flt-semantics[role="img"]');
    this.welcomeMessage = this.contentGroup.locator(
      'flt-semantics[flt-semantics-identifier="welcome_message"]',
    );
    this.appSlogan = this.welcomePage.locator(
      'flt-semantics[flt-semantics-identifier="app_slogan"]',
    );
    this.aboutAppText = this.welcomePage.locator(
      'flt-semantics[flt-semantics-identifier="about_app_text"]',
    );
    this.continueButton = page.locator(
      'flt-semantics[flt-semantics-identifier="continue_button"][flt-tappable]',
    );
    // Onboarding page for navigation check
    this.onboardingPage = page.locator('flt-semantics[flt-semantics-identifier="onboarding_page"]');
  }

  async openWelcomePage() {
    await this.page.goto('https://play.dev.shubeklubek.com');
  }

  async goBack() {
    await this.page.goBack();
  }

  async selectArabic() {
    await this.languageDropdown.click();
    await this.page
      .locator('flt-semantics[flt-semantics-identifier="language_option_ar"]')
      .click({ timeout: 5000 });
  }

  async selectKurdish() {
    await this.languageDropdown.click();
    await this.page
      .locator('flt-semantics[flt-semantics-identifier="language_option_ku"]')
      .click({ timeout: 5000 });
  }

  async selectEnglish() {
    await this.languageDropdown.click();
    await this.page
      .locator('flt-semantics[flt-semantics-identifier="language_option_en"]')
      .click({ timeout: 5000 });
  }

  async welcomePageVisibilityCheck() {
    await expect(this.welcomePage).toBeVisible({ timeout: 10000 });
    await expect(this.heroImage).toBeVisible({ timeout: 10000 });
    await expect(this.smallIcon).toBeVisible({ timeout: 10000 });
    await expect(this.welcomeMessage).toBeVisible({ timeout: 10000 });
    await expect(this.appSlogan).toBeVisible({ timeout: 10000 });
    await expect(this.aboutAppText).toBeVisible({ timeout: 10000 });
    await expect(this.continueButton).toBeVisible({ timeout: 10000 });
  }
  async continueButtonClick() {
    await this.continueButton.click();
    // Wait for expected URL and onboarding page
    await expect(this.page).toHaveURL('https://play.dev.shubeklubek.com/auth/onboarding', {
      timeout: 5000,
    });
    await expect(this.onboardingPage).toBeVisible({ timeout: 5000 });
  }
}
module.exports = { WelcomePage };
