const { expect } = require('@playwright/test');
class LoginPage {
  constructor(page) {
    this.page = page;
    // === Login page main sections ===
    this.loginInstructionsArea = page.locator(
      'flt-semantics[flt-semantics-identifier="login_subtitle"]',
    ); // Group containing instructions under the title
    this.SindibadAndRawiLogoImage = page.locator(
      'flt-semantics[flt-semantics-identifier="login_logo_image"]',
    ); // Main logo image
    this.SindibadAndRawiLogoName = page.locator(
      'flt-semantics[flt-semantics-identifier="login_logo_text"]',
    ); // Logo text image
    this.loginSubtitle = page.locator('flt-semantics[flt-semantics-identifier="login_subtitle"]');
    this.loginTitle = page.locator('[flt-semantics-identifier="login_title"]'); // Main heading (h2)

    // === User input fields ===
    // Country selector
    this.countryDropdown = page.getByRole('button', { name: /\+ 964/ });
    // Phone number input
    this.phoneNumberField = page.locator(
      'flt-semantics[flt-semantics-identifier="phone_number_input"]',
    );
    this.phoneInput = page.locator('#tel');
    // PIN input
    this.pinField = page.locator('flt-semantics[flt-semantics-identifier="pin_input"]');
    this.pinInput = page.locator('#current-password');
    this.togglePinVisibility = page.locator(
      'flt-semantics[flt-semantics-identifier="toggle_pin_visibility"]',
    ); // Toggle PIN visibility
    this.whatIsPinLink = page.locator('flt-semantics[flt-semantics-identifier="what_is_pin_link"]'); // "What is PIN?" link
    // Remember me checkbox
    this.rememberMeCheckbox = page.locator(
      'flt-semantics[flt-semantics-identifier="remember_me_checkbox"]',
    ); // Remember me checkbox

    // === Legal section ===
    this.legalTextContainer = page.locator(
      'flt-semantics[flt-semantics-identifier="login_legal_text"]',
    ); // Container for Terms/Privacy links
    this.termsLink = page.locator('a[flt-semantics-identifier="terms_link"]'); // Terms of Service link
    this.privacyLink = page.locator('a[flt-semantics-identifier="privacy_link"]'); // Privacy Policy link

    // === Action buttons ===
    this.loginButton = page.locator('flt-semantics[flt-semantics-identifier="login_button"]'); // Login CTA
    this.notaMemberYetImage = page.locator(
      'flt-semantics[flt-semantics-identifier="login_not_a_member"]',
    ); // Section including text and subscribe button
    this.subscribeButton = page.locator(
      'flt-semantics[flt-semantics-identifier="subscribe_button"]',
    ); // Subscribe button

    // === Validation messages ===
    this.validationMessage1 = page.getByText('Invalid mobile phone number'); // Phone number validation
    this.validationMessage2 = page.getByText('Required phone number'); // Phone number validation

    this.validationMessage3 = page.getByText('PIN is invalid'); // Phone number validation
    this.validationMessage4 = page.getByText('Required PIN'); // Phone number validation

    // === "What is PIN?" modal ===
    this.whatIsPinModal = page.locator(
      'flt-semantics[flt-semantics-identifier="what_is_pin_modal"]',
    ); // Modal container
    this.moonImageOnPinModal = page.locator(
      'flt-semantics[flt-semantics-identifier="moon_icon_on_pin_modal"]',
    ); // Moon icon
    this.sindibadAndRawyImageOnPinModal = page.locator(
      'flt-semantics[flt-semantics-identifier="sindibad_rawi_illustration"]',
    ); // Sindibad & Rawi illustration
    this.closePinModalButton = page.locator(
      'flt-semantics[flt-semantics-identifier="close_what_is_pin_modal"]',
    ); // Close "What is PIN?" modal button
    this.whatIsPinText = page.locator('flt-semantics[flt-semantics-identifier="what_is_pin_text"]');
    // Modal title text
    this.ifYouAreAlreadyAMember = page.locator(
      'flt-semantics[flt-semantics-identifier="if_you_are_already_a_member"]',
    ); // Supporting text
    this.toLoginYouNeedText = page.locator(
      'flt-semantics[flt-semantics-identifier="to_login_you_need_text"]',
    );
    // Instructions
    this.resetPinButton = this.whatIsPinModal.locator(
      'flt-semantics[flt-semantics-identifier="reset_pin_button"]',
    ); // Reset PIN button
    this.ifYouAreNotAMemberYetText = page.locator(
      'flt-semantics[flt-semantics-identifier="if_you_are_not_a_member_yet"]',
    );
    // Info text for non-members
    this.subscribeToAccessAllSuperStoriesText = page.locator(
      'flt-semantics[flt-semantics-identifier="subscribe_to_access_all_text"]',
    );
    // Call-to-action text
    this.subscribeNowButton = page.locator(
      'flt-semantics[flt-semantics-identifier="subscribe_button"]',
    ); // Subscribe Now button in modal
  }

  // === Check visibility of all main elements on Login page ===
  async loginPageElementsVisibilityCheck() {
    await expect(this.loginInstructionsArea).toBeVisible();
    await expect(this.SindibadAndRawiLogoImage).toBeVisible();
    await expect(this.SindibadAndRawiLogoName).toBeVisible();
    await expect(this.loginTitle).toBeVisible();
    await expect(this.countryDropdown).toBeVisible();
    await expect(this.countryDropdown).toBeVisible();
    await expect(this.phoneNumberField).toBeVisible();
    await expect(this.pinField).toBeVisible();
    await expect(this.togglePinVisibility).toBeVisible();
    await expect(this.whatIsPinLink).toBeVisible();
    await expect(this.rememberMeCheckbox).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    await expect(this.termsLink).toBeVisible();
    await expect(this.privacyLink).toBeVisible();
    await expect(this.notaMemberYetImage).toBeVisible();
    await expect(this.subscribeButton).toBeVisible();
  }

  // === Enter phone number ===
  async enterPhoneNumber(phoneNumber) {
    // click on the field to have focus
    await this.phoneNumberField.click();

    // type text per charachter with small delay to mimic real user input
    for (const char of phoneNumber) {
      await this.phoneInput.type(char, { delay: 50 });
    }
  }
  // === Clear phone number ===
  async clearPhoneNumber() {
    await this.phoneInput.press('Backspace');
    await expect(this.loginSubtitle).toBeVisible({ timeout: 10000 });
  }

  // === Enter PIN ===
  async enterPIN(PIN) {
    // click on the field to have focus
    await this.pinField.click();

    // type text per charachter with small delay to mimic real user input
    for (const char of PIN) {
      await this.pinField.type(char, { delay: 50 });
    }
  }

  // === Refresh page to reset input field ===
  async refreshLoginPage() {
    await this.page.reload();
    await expect(this.loginSubtitle).toBeVisible({ timeout: 20000 });
  }

  async expectPinHidden() {
    await expect(this.pinInput).toHaveAttribute('type', 'password');
  }
  async expectPinVisible() {
    await expect(this.pinInput).toHaveAttribute('type', 'text');
  }

  async togglePinVisibilityClick() {
    await this.togglePinVisibility.click();
  }

  async clickRememberMeCheckbox() {
    await this.rememberMeCheckbox.click();
  }
  async rememberMeToBeChecked() {
    await expect(this.rememberMeCheckbox).toHaveAttribute('aria-checked', 'true');
  }
  async rememberMeToBeUnchecked() {
    await expect(this.rememberMeCheckbox).toHaveAttribute('aria-checked', 'false');
  }

  // === Click Login button ===
  async clickLoginButton() {
    await this.loginButton.click();
  }

  // === Click What is PIN link ===
  async clickWhatIsPinLink() {
    await this.whatIsPinLink.click();
    await expect(this.whatIsPinModal).toBeVisible(); // Modal container to be visible
  }

  // === Check visibility of all elements on What is PIN modal ===
  async whatIsPINModalVisibiltyCheck() {
    await expect(this.moonImageOnPinModal).toBeVisible();
    await expect(this.sindibadAndRawyImageOnPinModal).toBeVisible();
    await expect(this.closePinModalButton).toBeVisible();
    await expect(this.whatIsPinText).toBeVisible();
    await expect(this.ifYouAreAlreadyAMember).toBeVisible();
    await expect(this.toLoginYouNeedText).toBeVisible();
    await expect(this.resetPinButton).toBeVisible();
    await expect(this.ifYouAreNotAMemberYetText).toBeVisible();
    await expect(this.subscribeToAccessAllSuperStoriesText).toBeVisible();
    await expect(this.subscribeNowButton).toBeVisible();
  }

  // === Click SubscribeNow on What is PIN modal ===
  async clickSubscribeButtonOnWhatIsPINModal() {
    await this.subscribeNowButton.click();
    await expect(this.page).toHaveURL('https://play.dev.shubeklubek.com/auth/subscribe', {
      timeout: 5000,
    });
  }

  // === Click Reset PIN on What is PIN modal ===
  async clickResetPINOnWhatIsPINModal() {
    await expect(this.resetPinButton).toBeVisible({ timeout: 5000 });
    await this.resetPinButton.click();
    await expect(this.page).toHaveURL('https://play.dev.shubeklubek.com/auth/reset-pin', {
      timeout: 5000,
    });
  }

  // === Close What is PIN modal ===
  async closeWhatIsPINModal() {
    await this.closePinModalButton.click();
    await expect(this.loginSubtitle).toBeVisible(); // Group containing instructions under the title to be visible // Later better to be changed with input fields visibility
  }

  // === Click Subscribe button and wait for Subscribe page ===
  async clickSubscribeButton() {
    await this.subscribeButton.click();
    await expect(this.page).toHaveURL('https://play.dev.shubeklubek.com/auth/subscribe', {
      timeout: 5000,
    });
  }
}

module.exports = { LoginPage };
