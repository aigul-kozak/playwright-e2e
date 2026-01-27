const { expect } = require('@playwright/test');
class OnboardingPage {
  constructor(page) {
    this.page = page;
    // Onboarding page elements
    this.onboardingTitle = page.locator(
      'flt-semantics[flt-semantics-identifier="onboarding_title"]',
    );
    this.onboardingPage = page.locator(
      'flt-semantics[flt-semantics-identifier="onboarding_page_view"]',
    );

    this.indicator = page.locator(
      'flt-semantics[flt-semantics-identifier="onboarding_page_indicator"]',
    );
    // Join Adventure card
    this.joinAdventureCard = page.locator(
      'flt-semantics[flt-semantics-identifier="card_join_adventure_tap"]',
    );
    // Images inside Join Adventure card
    this.selfieSample = page.locator(
      'flt-semantics[flt-semantics-identifier="selfie_sample_image"]',
    );
    this.resultArrow = page.locator('flt-semantics[flt-semantics-identifier="result_arrow_image"]');
    this.avatarSample = page.locator(
      'flt-semantics[flt-semantics-identifier="avatar_sample_image"]',
    );
    this.leftFunSparks = page.locator(
      'flt-semantics[flt-semantics-identifier="left_fun_sparks_image"]',
    );
    this.rightFunSparks = page.locator(
      'flt-semantics[flt-semantics-identifier="right_fun_sparks_image"]',
    );

    // How Stories Develop card
    this.howStoriesDevelopCard = page.locator(
      'flt-semantics[flt-semantics-identifier="card_how_stories_develop_tap"]',
    );
    this.roadSign = page.locator('flt-semantics[flt-semantics-identifier="road_sign_image"]');
    this.sindibad = page.locator('flt-semantics[flt-semantics-identifier="sindibad_image"]');

    // Values and Virtues card
    this.valuesAndVirtuesCard = page.locator(
      'flt-semantics[flt-semantics-identifier="card_values_virtues_tap"]',
    );
    this.markSign = page.locator('flt-semantics[flt-semantics-identifier="mark_sign_image"]');
    this.heartSign = page.locator('flt-semantics[flt-semantics-identifier="heart_sign_image"]');
    // Page indicator
    this.pageIndicator = page.locator(
      'flt-semantics[flt-semantics-identifier="onboarding_page_indicator"]',
    );

    this.indicatorStep0 = page.locator(
      'flt-semantics[flt-semantics-identifier="onboarding_indicator_step_0"]',
    );
    this.indicatorStep1 = page.locator(
      'flt-semantics[flt-semantics-identifier="onboarding_indicator_step_1"]',
    );
    this.indicatorStep2 = page.locator(
      'flt-semantics[flt-semantics-identifier="onboarding_indicator_step_2"]',
    );

    this.letsStartButton = page.locator(
      'flt-semantics[flt-semantics-identifier="onboarding_start_button"]',
    );
    this.login = page.locator('flt-semantics[flt-semantics-identifier="login_subtitle"]');
  }

  async onboardingPageCommonVisibiltyCheck() {
    await expect(this.onboardingPage).toBeVisible({ timeout: 5000 });
  }

  async joinAdventureCardCheck() {
    await expect(this.joinAdventureCard).toBeVisible({ timeout: 1000 });
    await expect(this.selfieSample).toBeVisible({ timeout: 1000 });
    await expect(this.resultArrow).toBeVisible({ timeout: 1000 });
    await expect(this.avatarSample).toBeVisible({ timeout: 2000 });
    await expect(this.leftFunSparks).toBeVisible({ timeout: 1000 });
    await expect(this.rightFunSparks).toBeVisible({ timeout: 1000 });
    await this.joinAdventureCard.click();
  }
  async howStoriesDevelopCardCheck() {
    await this.howStoriesDevelopCard.click();
    await this.roadSign.waitFor({ state: 'visible', timeout: 1000 });
    await this.sindibad.waitFor({ state: 'visible', timeout: 1000 });
  }
  async valuesAndVirtuesCardCheck() {
    await this.valuesAndVirtuesCard.click();
    await expect(this.markSign).toBeVisible({ timeout: 1000 });
    await expect(this.heartSign).toBeVisible({ timeout: 1000 });
  }

  async howStoriesDevelopCardClickAndMovemnent() {
    await expect.soft(this.howStoriesDevelopCard).toBeVisible({ timeout: 5000 });
    const before = await this.howStoriesDevelopCard.boundingBox();
    await this.howStoriesDevelopCard.click();
    // let Flutter finish animation
    await this.page.waitForTimeout(1000);
    const after = await this.howStoriesDevelopCard.boundingBox();
    expect.soft(after).not.toEqual(before);
  }
  async valuesAndVirtuesCardClickAndMovemnent() {
    await expect.soft(this.valuesAndVirtuesCard).toBeVisible({ timeout: 5000 });
    const before = await this.valuesAndVirtuesCard.boundingBox();
    await this.valuesAndVirtuesCard.click();
    // let Flutter finish animation
    await this.page.waitForTimeout(1000);
    const after = await this.valuesAndVirtuesCard.boundingBox();
    expect.soft(after).not.toEqual(before);
  }
  async joinAdventureCardClickAndMovemnent() {
    await expect.soft(this.joinAdventureCard).toBeVisible({ timeout: 5000 });
    const before = await this.joinAdventureCard.boundingBox();
    await this.joinAdventureCard.click();
    // let Flutter finish animation
    await this.page.waitForTimeout(1000);
    const after = await this.joinAdventureCard.boundingBox();
    expect.soft(after).not.toEqual(before);
  }

  async howStoriesDevelopCardClick() {
    await this.howStoriesDevelopCard.click();
  }
  async valuesAndVirtuesCardClick() {
    await this.valuesAndVirtuesCard.click();
  }
  async joinAdventureCardClick() {
    await this.joinAdventureCard.click();
  }

  // return current active indicator boundingBox
  // async getActiveIndicatorBoundingBox() {
  //   const active = this.page.locator('flt-semantics[aria-current="true"]');
  //   return await active.boundingBox();
  // }

  // check that indicator moved
  // async expectIndicatorMoved(prevBox) {
  //   const newBox = await this.getActiveIndicatorBoundingBox();
  //   expect.soft(newBox).not.toEqual(prevBox);
  //   return newBox;
  // }

  // returns current active indicator index
  // async getActiveIndicatorIndex() {
  //   const active = this.page.locator('flt-semantics[aria-current="true"]');
  //   const identifier = await active.getAttribute('flt-semantics-identifier'); // e.g. 'onboarding_indicator_step_2'
  //   return parseInt(identifier.replace('onboarding_indicator_step_', ''), 10);
  // }

  // check that current active indicator index changed
  // async expectIndicatorChanged(prevIndex) {
  //   const newIndex = await this.getActiveIndicatorIndex();
  //   expect(newIndex).not.toBe(prevIndex);
  //   return newIndex;
  // }

  // async expectActiveIndicator(index) {
  //   const active = this.page.locator('flt-semantics[aria-current="true"]');

  //   await expect
  //     .soft(active)
  //     .toHaveAttribute('flt-semantics-identifier', `onboarding_indicator_step_${index}`);
  // }

  async clickLetsStartButton() {
    await this.letsStartButton.click();
    // Wait for expected URL and Login page
    await expect(this.page).toHaveURL('https://play.dev.shubeklubek.com/auth/login', {
      timeout: 5000,
    });
    await expect(this.login).toBeVisible({ timeout: 10000 });
  }
}

module.exports = { OnboardingPage };
