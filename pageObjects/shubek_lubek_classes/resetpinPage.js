const { expect } = require('@playwright/test');
class ResetPINPage {
  constructor(page) {
    this.page = page;
    this.login = page.locator('flt-semantics[flt-semantics-identifier="login_subtitle"]');
    this.resetPinTitle = page.locator('h2[flt-semantics-identifier="reset_pin_title"]');
    this.resetPinInstructions = page.locator(
      'flt-semantics[flt-semantics-identifier="reset_pin_instructions"]',
    );

    this.countrySelector = page.getByRole('button', { name: /\+ 964/ });
    // Phone number input field
    this.phoneNumberField = page.locator(
      'flt-semantics[flt-semantics-identifier="phone_number_input"]',
    );
    this.phoneInput = page.locator('#tel');
    // === Validation messages for Reset PIN form ===
    this.validationMessage1 = page.getByText('Invalid mobile phone number'); // Invalid phone number message
    this.validationMessage2 = page.getByText('Required phone number'); // Required phone number message

    // The only image on the Reset PIN page
    this.resetPinImage = page.getByRole('img').first();
    // Security note text on Reset PIN page
    this.securityNoteText = page.locator('flt-semantics[flt-semantics-identifier="security_note"]');
    // "Send me new PIN" button
    this.sendNewPinButton = page.locator(
      'flt-semantics[flt-semantics-identifier="send_new_pin_button"]',
    );
    // Legal Text
    this.legalText = page.locator('flt-semantics[flt-semantics-identifier="legal_text"]'); // Container for Terms/Privacy links

    // "Terms of Services" link
    this.termsLink = page.locator('a[flt-semantics-identifier="terms_link"]');
    // Text preceding the Privacy link
    //this.privacyText = page
    //.locator('flt-semantics', {
    //hasText: 'and our',
    //})
    //.first();

    // "Privacy Policy" link
    this.privacyLink = page.locator('a[flt-semantics-identifier="privacy_link"]');
  }

  // === Check visibility of all main elements on Reset PIN page ===
  async resetPINPageElementsVisibilityCheck() {
    await expect(this.resetPinTitle).toBeVisible();
    await expect(this.resetPinInstructions).toBeVisible();
    await expect(this.countrySelector).toBeVisible();
    await expect(this.phoneNumberField).toBeVisible();
    await expect(this.resetPinImage).toBeVisible();
    await expect(this.securityNoteText).toBeVisible();
    await expect(this.sendNewPinButton).toBeVisible();
    //await expect(this.legalText).toBeVisible();
    await expect(this.termsLink).toBeVisible();
    //await expect(this.privacyText).toBeVisible();
    await expect(this.privacyLink).toBeVisible();
  }

  // === Enter phone number ===
  async enterPhoneNumber(phoneNumber) {
    await this.phoneNumberField.click();

    // type by symbol (type() will find the active input inside)
    for (const char of phoneNumber) {
      await this.phoneInput.type(char, { delay: 50 });
    }
  }

  // === Refresh page to reset input field ===
  async refreshResetPINPage() {
    await this.page.reload();
    await expect(this.resetPinTitle).toBeVisible({ timeout: 20000 });
  }
  // === Clear phone number ===
  async clearPhoneNumber(phoneNumber) {
    await this.phoneNumberField.press('Backspace');
  }

  async clickSendNewPinButtonFilledEmpty() {
    await this.sendNewPinButton.click();
  }

  async clickSendNewPinButtonFilled() {
    await this.sendNewPinButton.click();
    await expect(this.page).toHaveURL('https://play.dev.shubeklubek.com/auth/reset-pin-success');
  }
  async goBackToLoginPage() {
    await this.page.goBack();
    await expect(this.page).toHaveURL('https://play.dev.shubeklubek.com/auth/login');
    await expect(this.login).toBeVisible();
  }
}

module.exports = { ResetPINPage };
