const { expect } = require('@playwright/test');
class ResetPINSuccessPage {
  constructor(page) {
    this.page = page;
    this.keyImage = page.locator(
      'flt-semantics[flt-semantics-identifier="reset_success_key_image"]',
    );
    this.resetSuccessTitle = page.locator('h2[flt-semantics-identifier="reset_success_title"]');
    this.resetSuccessMessage = page.locator(
      'flt-semantics[flt-semantics-identifier="reset_success_message"]',
    );
    this.backToLoginButton = page.locator(
      'flt-semantics[flt-semantics-identifier="back_to_login_button"]',
    );
    this.login = page.locator('flt-semantics[flt-semantics-identifier="login_subtitle"]');
  }

  async resetPINSuccessPageVisibiltyCheck() {
    await expect(this.keyImage).toBeVisible({ timeout: 5000 });
    await expect(this.resetSuccessTitle).toBeVisible({ timeout: 5000 });
    await expect(this.resetSuccessMessage).toBeVisible({ timeout: 5000 });
    await expect(this.backToLoginButton).toBeVisible({ timeout: 5000 });
  }

  async clickBackToLoginButton() {
    await this.backToLoginButton.click();

    // additionally wait for expected URL
    await expect(this.page).toHaveURL('https://play.dev.shubeklubek.com/auth/login', {
      timeout: 5000,
    });
    await expect(this.login).toBeVisible();
  }
}

module.exports = { ResetPINSuccessPage };
