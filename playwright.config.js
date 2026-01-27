// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration


/* ===== Screen sizes ===== */
const DEVICES = {
  mobileMin: { width: 360, height: 640 }, // real-world minimum // ensure that the UI doesn't break on the smallest screens
  mobileMid: { width: 390, height: 844 }, // Mobile — MID (mid-market) the bulk of users // (approximately iPhone 12 / Pixel 5)
  mobileLarge: { width: 430, height: 932 }, // Mobile — LARGE (phablet / Max) // iPhone 14 Pro Max / Galaxy S23 Ultra

  tabletSmall: { width: 768, height: 1024 }, // iPad baseline  // 99% tablet-UI logic // iPad Mini / iPad 9
  tabletLarge: { width: 1024, height: 1366 }, // Tablet — LARGE // iPad Pro 12.9

  desktop: { width: 1440, height: 900 },
};
/** @type {{ [key: string]: (v: {width:number, height:number}) => {width:number, height:number} }} */
const ORIENTATIONS = {
  portrait: (v) => ({ width: v.width, height: v.height }),
  landscape: (v) => ({ width: v.height, height: v.width }),
};
/* ===== Languages ===== */
const LANGUAGES = [
  { name: 'English', code: 'en' },
  { name: 'Arabic', code: 'ar' },
  { name: 'Kurdish', code: 'ku' },
];

/* ===== Browsers ===== */
const BROWSERS = [
  {
    name: 'chromium',
    use: {
      browserName: 'chromium',
      launchOptions: {
        args: [
          '--disable-features=PasswordManagerExtensionUI',
          '--disable-save-password-bubble',
          '--disable-popup-blocking',
          '--disable-features=PasswordLeakDetection',
        ],
      },
    },
  },
  {
    name: 'firefox',
    use: {
      browserName: 'firefox',
      firefoxUserPrefs: {
        'signon.rememberSignons': false,
        'signon.autofillForms': false,
        'signon.generation.enabled': false,
        'signon.management.page.enabled': false,
      },
    },
  },
  {
    name: 'webkit',
    use: {
      browserName: 'webkit', // Safari (desktop + mobile)
    },
  },
];

/* ===== Projects generation ===== */
/** @type {import('@playwright/test').Project[]} */
const projects = [];
// 📱 Mobile
/** @type {('portrait'|'landscape')[]} */
const orientations = ['portrait', 'landscape'];

/** @type {(keyof typeof DEVICES)[]} */
const mobileDevices = ['mobileMin', 'mobileMid', 'mobileLarge'];

for (const device of mobileDevices) {
  for (const orientation of orientations) {
    for (const browser of BROWSERS) {
      for (const lang of LANGUAGES) {
        /** @type {import('@playwright/test').Project} */
        const project = {
          name: `${device}-${orientation}-${browser.name}-${lang.code}`,
          use: {
            ...browser.use,
            viewport: ORIENTATIONS[orientation](DEVICES[device]),
            isMobile: true,
            hasTouch: true,
            locale: `${lang.code}-${lang.code.toUpperCase()}`, // for example en-US
            languageName: lang.name,
          },
        };
        projects.push(project);
      }
    }
  }
}

// 📱 Tablet
/** @type {(keyof typeof DEVICES)[]} */
const tabletDevices = ['tabletSmall', 'tabletLarge'];

for (const device of tabletDevices) {
  for (const orientation of orientations) {
    for (const browser of BROWSERS) {
      for (const lang of LANGUAGES) {
        /** @type {import('@playwright/test').Project} */
        const project = {
          name: `${device}-${orientation}-${browser.name}-${lang.code}`,
          use: {
            ...browser.use,
            viewport: ORIENTATIONS[orientation](DEVICES[device]),
            isMobile: true,
            hasTouch: true,
            locale: `${lang.code}-${lang.code.toUpperCase()}`,
            languageName: lang.name,
          },
        };
        projects.push(project);
      }
    }
  }
}

// 💻 Desktop
for (const browser of BROWSERS) {
  for (const lang of LANGUAGES) {
    projects.push({
      name: `desktop-${browser.name}-${lang.code}`,
      use: {
        ...browser.use,
        viewport: DEVICES.desktop,
        isMobile: false,
        hasTouch: false,
        locale: `${lang.code}-${lang.code.toUpperCase()}`,
        languageName: lang.name,
      },
    });
  }
}

export default defineConfig({
  testDir: './tests',
  retries: 1,
  timeout: 5 * 10000, // for all elements
  expect: { timeout: 5 * 10000 }, //for assertion validations

  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: !!process.env.CI,
    screenshot: 'on',
    trace: 'retain-on-failure', //off, on
    video: 'retain-on-failure',
  },
  projects,
});
