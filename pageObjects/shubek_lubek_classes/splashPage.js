const { expect } = require('@playwright/test');
class SplashPage {
  constructor(page) {
    this.page = page;
    this.welcomePage = page.locator('flt-semantics[flt-semantics-identifier="welcome_page"]');
    this.splash = page.locator('#splash');
    this.splashBranding = page.locator('#splash-branding');
  }

  async open() {
    await this.page.goto('https://play.dev.shubeklubek.com');
    await expect(this.splash).toBeVisible({ timeout: 5000 });
    await expect(this.splash).toHaveCount(0, { timeout: 15000 }); // wait to disappear
    await expect(this.splashBranding).toHaveCount(0, { timeout: 15000 });
  }

  async waitForRedirectToWelcome() {
    // wait for main element to be visible on Welcome Page
    await expect(this.welcomePage).toBeVisible({ timeout: 20000 });

    // additionally wait for expected URL
    await expect(this.page).toHaveURL('https://play.dev.shubeklubek.com/auth/welcome', {
      timeout: 5000,
    });
  }
}

module.exports = { SplashPage };
