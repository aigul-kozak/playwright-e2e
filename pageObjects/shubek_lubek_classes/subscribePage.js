const { expect } = require('@playwright/test');
class SubscribePage {
  constructor(page) {
    this.page = page;

    this.subscribePage = page.locator(
      'flt-semantics[flt-semantics-identifier="subscribe_web_page"]',
    );
    this.successMessage = page.locator('flt-semantics[flt-semantics-identifier="success_message"]');
    this.sindibadSendingSmsImage = this.subscribePage.getByRole('img').first();
    this.subscribeTitle = page.locator('flt-semantics[flt-semantics-identifier="subscribe_title"]');
    this.rawiImage = this.subscribeTitle.getByRole('img').first();
    this.instructionText = page.locator(
      'flt-semantics[flt-semantics-identifier="instruction_text"]',
    );
    this.login = page.locator('flt-semantics[flt-semantics-identifier="login_subtitle"]');
    this.loginWithPin = page.locator('flt-semantics[flt-semantics-identifier="what_is_pin_modal"]');
  }

  async subscribePageElementsVisibilityCheck() {
    await expect(this.subscribePage).toBeVisible();
    await expect(this.successMessage).toBeVisible();
    await expect(this.sindibadSendingSmsImage).toBeVisible();
    await expect(this.subscribeTitle).toBeVisible();
    await expect(this.rawiImage).toBeVisible();
    await expect(this.instructionText).toBeVisible();
  }
  async goBackToLogin() {
    await this.page.goBack();
    await expect(this.page).toHaveURL('https://play.dev.shubeklubek.com/auth/login');
    await expect(this.login).toBeVisible();
  }

  async goBackToLoginWithPINModal() {
    await this.page.goBack();
    await expect(this.page).toHaveURL('https://play.dev.shubeklubek.com/auth/login');
    await expect(this.loginWithPin).toBeVisible();
  }
}

module.exports = { SubscribePage };
