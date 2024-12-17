# LinkedIn Job Application Automation

This project automates the process of applying to LinkedIn jobs using Cypress.

## Prerequisites

- Node.js & NPM: Install from https://nodejs.org
- Cypress: Will be installed via npm

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with your LinkedIn credentials:
   ```
   LINKEDIN_USER=your_email@example.com
   LINKEDIN_PASS=your_password
   ```

   Replace `your_email@example.com` and `your_password` with your actual LinkedIn credentials.

   Note: The `.env` file is automatically ignored by git for security. Never commit your actual credentials!

## Configuration

The default configuration in `cypress.config.js` includes:
- Base URL: https://www.linkedin.com
- Viewport: 1366x768
- Default timeout: 10 seconds

You can modify the job search parameters in `cypress/e2e/apply_jobs.cy.js`:
- `jobKeyword`: The job title or keyword to search for
- `jobLocation`: The location to search in

## Running the Tests

Run in headless mode:
```bash
npm test
```

Run with Cypress GUI:
```bash
npm run cypress:open
```

## Features

- Automated LinkedIn login
- Job search with customizable keywords and location
- Automated "Easy Apply" application submission
- Handles both simple one-click applications and multi-step forms
- Built-in error handling and logging
- Configurable application limit (default: 5 applications)

## Notes

- The script will only attempt to apply to jobs with the "Easy Apply" button
- Complex application forms that require custom responses may be skipped
- Make sure your LinkedIn profile is complete to maximize successful applications 