Playwright E2E Tests
This repository contains Playwright-based end-to-end (E2E) tests for the web application.

Quick Start
1 Clone the repository:

```bash
git clone https://github.com/your-org/your-repo.git
cd your-repo

```

2 Install dependencies:
npm ci
npx playwright install --with-deps
Make sure Node.js (v18+ or LTS) is installed

3 Run selected projects (nightly run):
npx playwright test \
 --project=mobileMid-portrait-chromium-ar \
 --project=mobileMid-landscape-chromium-ku \
 --project=tabletSmall-portrait-webkit-ar \
 --project=tabletSmall-landscape-webkit-ar \
 --project=desktop-chromium-en \
 --project=desktop-firefox-ar \
 --project=desktop-webkit-ku

4 Test Reports
Local run
After a local run, open the HTML report: npx playwright show-report
Nightly runs
Nightly tests run automatically at 02:00 UTC
HTML reports are published to the gh-pages branch
Each run is stored in a separate folder (by run ID)
A Slack notification is sent after every nightly run

5 CI Strategy
No tests are executed on push or pull requests
Only the selected Nightly test set is executed: on schedule (nightly) or via manual trigger (workflow_dispatch)

6 Project Structure
├── tests/ # Playwright tests
├── playwright.config.ts # Playwright configuration
├── .github/workflows/ # GitHub Actions workflows
├── README.md
└── package.json

Notes
Test artifacts (playwright-report, test-results) are excluded via .gitignore
The test set and coverage can be extended incrementally as the product evolves
