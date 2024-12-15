
describe('Automated LinkedIn Job Applications', () => {
  const linkedInUser = Cypress.env('LINKEDIN_USER');
  const linkedInPass = Cypress.env('LINKEDIN_PASS');

  // Adjust these according to your search preferences
  const jobKeyword = 'Software Engineer';
  const jobLocation = 'San Francisco Bay Area';

  before(() => {
    if (!linkedInUser || !linkedInPass) {
      throw new Error('Please set LINKEDIN_USER and LINKEDIN_PASS environment variables.');
    }
  });

  it('Logs into LinkedIn', () => {
    cy.visit('/login');
    cy.get('#username').type(linkedInUser, { log: false });
    cy.get('#password').type(linkedInPass, { log: false });
    cy.get('.btn__primary--large').click();

    // Check we are logged in by ensuring the home feed loads
    cy.url().should('include', '/feed');
  });

  it('Searches for jobs', () => {
    cy.visit('/jobs'); 
    cy.get('input[aria-label="Search by title, skill, or company"]').clear().type(jobKeyword);
    cy.get('input[aria-label="City, state, or zip code"]').clear().type(jobLocation);
    cy.get('button[aria-label="Search"]').click();

    // Wait for results to load
    cy.get('.jobs-search-results-list').should('be.visible');
  });

  it('Iterates over job postings and applies', () => {
    // We'll iterate through a few jobs on the page
    cy.get('.jobs-search-results-list li')
      .each(($job, index) => {
        if (index > 5) {
          return false; // Limit the number of applications
        }

        // Click on the job
        cy.wrap($job).find('a.result-card__full-card-link').first().click({ force: true });

        // Wait for the job detail sidebar to load
        cy.get('.jobs-details-top-card').should('exist');

        // Check if the "Easy Apply" button exists
        cy.get('button.jobs-apply-button')
          .then($btn => {
            if ($btn.text().includes('Easy Apply')) {
              cy.wrap($btn).click({force: true});
              cy.wait(2000);

              // Handle the application modal
              cy.get('div.jobs-easy-apply-modal').should('exist');
              submitApplicationForm();
            } else {
              cy.log('No Easy Apply option for this job.');
            }
          })
          .catch(() => {
            cy.log('No apply button found for this job.');
          });
      });
  });
});

function submitApplicationForm() {
  function nextStepOrSubmit() {
    cy.get('button[aria-label="Submit application"], button[aria-label="Review your application"]', { timeout: 5000 })
      .then($submitBtn => {
        if ($submitBtn.length > 0) {
          cy.wrap($submitBtn).click({force: true});
          cy.wait(2000);

          cy.get('div[data-test-easy-apply-success]')
            .then(() => {
              cy.log('Application submitted successfully!');
              cy.get('button[aria-label="Dismiss"]').click({ force: true });
            })
            .catch(() => {
              nextStepOrSubmit();
            });
        } else {
          cy.get('button[aria-label="Continue to next step"], button[aria-label="Next"]', {timeout: 5000})
            .then($nextBtn => {
              if ($nextBtn.length > 0) {
                cy.wrap($nextBtn).click({force: true});
                cy.wait(2000);
                nextStepOrSubmit();
              } else {
                cy.log('No next or submit button found. Possibly a form we can\'t handle automatically.');
              }
            })
            .catch(() => {
              cy.log('No next or submit button found. Possibly a form we can\'t handle automatically.');
            });
        }
      })
      .catch(() => {
        cy.log('Error finding submit/next button, form may be more complex than expected.');
      });
  }

  nextStepOrSubmit();
} 