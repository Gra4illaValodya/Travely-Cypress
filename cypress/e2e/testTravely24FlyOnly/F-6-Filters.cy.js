import {
  customApiAER,
  customApiProductType,
  customURL,
} from '../../customFunction/main';

describe('Test #3-3-1-Filters air test --- 08.10.2022', () => {
  const sizeFetchTypeAER = Array.from(Array(5).keys());

  Cypress.on('fail', (error, runnable) => {
    //debugger; //on debugger
    console.log(`Error test name: ${runnable.title}`);
    console.log(error);
    console.log(runnable);
    throw error;
  });

  it('Visit site travely24', () => {
    cy.viewport(1600, 1600);
    cy.visit(customURL({}),{timeout:10000});
    cy.wait(4000)
  });

  context(`Search filters air`, () => {
    it(`Click - options air`, () => {
      cy.viewport(1600, 1600);

      cy.get('[disabled="false"] > .item-tour-form', {
        timeout: 20000,
      }).click({
        force: true,
      });
    });

    it(`Click - filters air`, () => {
      cy.viewport(1600, 1600);
      cy.get('.other-options', {
        timeout: 20000,
      }).click({
        force: true,
      });
    });

    it('  dew', () => {

      cy.viewport(1600, 1600);
      cy.visit(customURL({}));
      cy.wait(2000)
      cy.intercept({
        method:'GET',
        url: 'https://connector.traffics.de/v3/rest/offers/?productType=flight**'
      }).as(
        `getProductTypeDirektflug`
      );

      // cy.get('#flights-check0', {
      //   timeout: 20000,
      // }).click({
      //   force: true,
      // });
      // cy.get('#flights-check0').should('be.checked');
      cy.wait(`@getProductTypeDirektflug`, { timeout: 20000 }).then( el => {
        expect(el.response.statusCode).to.eq(200)
      })
    });

    it('Check - Business, test check and test APIes', () => {
      cy.viewport(1600, 1600);
      cy.server();
      cy.route(
        'GET',
        customApiProductType({
          directness: true,
          business: true,
        })
      ).as(`getProductTypeBusiness`);

      cy.get('#flights-check1', {
        timeout: 20000,
      }).click({
        force: true,
      });
      cy.get('#flights-check1').should('be.checked');
      cy.wait(`@getProductTypeBusiness`, { timeout: 20000 })
        .its('status')
        .should('eq', 200);
      cy.wait(5000);
    });

    it('Price enter from 2000 to 3000', () => {
      cy.viewport(1600, 1600);
      cy.get(
        '[data-v-3eec4b0d=""][data-v-d967ea44=""] > .option > .max > .max-value',
        {
          timeout: 20000,
        }
      ).click({
        force: true,
      });
      cy.get(
        '[data-v-3eec4b0d=""][data-v-d967ea44=""] > .option > .max > .max-input',
        {
          timeout: 20000,
        }
      ).type('3000');

      cy.get(
        '[data-v-3eec4b0d=""][data-v-d967ea44=""] > .option > .min > .min-value',
        {
          timeout: 20000,
        }
      ).click({
        force: true,
      });

      cy.get(
        '[data-v-3eec4b0d=""][data-v-d967ea44=""] > .option > .min > .min-input',
        {
          timeout: 20000,
        }
      ).type('2000');
      cy.get(
        '[data-v-3eec4b0d=""][data-v-d967ea44=""] > .option > .max > .max-value',
        {
          timeout: 20000,
        }
      ).click({
        force: true,
      });
    });

    it('Outbound flight enter max time 22:40', () => {
      cy.viewport(1600, 1600);
      cy.get(
        ':nth-child(5) > .block-user-dropdown > .option > .max > .max-value',
        {
          timeout: 20000,
        }
      ).click({
        force: true,
      });
      cy.get(
        ':nth-child(5) > .block-user-dropdown > .option > .max > .max-input',
        {
          timeout: 20000,
        }
      )
        .type('22:40')
        .type('Cypress.io{esc}');
      cy.wait(2000);
    });

    it('Outbound flight enter min time 01:10', () => {
      cy.viewport(1600, 1600);
      cy.get(
        ':nth-child(5) > .block-user-dropdown > .option > .min > .min-value',
        {
          timeout: 20000,
        }
      ).click({
        force: true,
      });
      cy.get(
        ':nth-child(5) > .block-user-dropdown > .option > .min > .min-input',
        {
          timeout: 20000,
        }
      ).type('01:10');
      cy.wait(2000);
      cy.get(
        ':nth-child(5) > .block-user-dropdown > .option > .min > .min-input',
        {
          timeout: 20000,
        }
      ).type('Cypress.io{esc}');
    });

    it('Return flight enter min time 01:10', () => {
      cy.viewport(1600, 1600);
      cy.get(
        ':nth-child(7) > .block-user-dropdown > .option > .min > .min-value',
        {
          timeout: 20000,
        }
      ).click({
        force: true,
      });
      cy.get(
        ':nth-child(7) > .block-user-dropdown > .option > .min > .min-input',
        {
          timeout: 20000,
        }
      )
        .type('01:10')
        .type('Cypress.io{esc}');
      cy.wait(2000);
    });

    it('Return flight enter max time 22:40 and max test APIes', () => {
      cy.viewport(1600, 1600);
      cy.server();
      cy.route(
        'GET',
        customApiProductType({
          directness: true,
          business: true,
          minTotalPrice: 2000,
          maxTotalPrice: 3000,
          minDepartureTime: '01:10',
          maxDepartureTime: '22:40',
          minReturnTime: '01:10',
          maxReturnTime: '22:40',
        })
      ).as(`getProductTypePrice`);
      sizeFetchTypeAER.forEach((_item, i) => {
        cy.route(
          'GET',
          customApiAER({
            numberCatch: i + 1,
            directness: true,
            business: true,
            minTotalPrice: 2000,
            maxTotalPrice: 3000,
            minDepartureTime: '01:10',
            maxDepartureTime: '22:40',
            minReturnTime: '01:10',
            maxReturnTime: '22:40',
          })
        ).as(`getAER_Price_${i + 1}`);
      });
      cy.get(
        ':nth-child(7) > .block-user-dropdown > .option > .max > .max-value',
        {
          timeout: 20000,
        }
      ).click({
        force: true,
      });
      cy.get(
        ':nth-child(7) > .block-user-dropdown > .option > .max > .max-input',
        {
          timeout: 20000,
        }
      ).type('22:40');
      cy.wait(2000);
      cy.get(
        ':nth-child(7) > .block-user-dropdown > .option > .max > .max-input',
        {
          timeout: 20000,
        }
      ).type('Cypress.io{esc}');

      cy.get(
        ':nth-child(7) > .block-user-dropdown > .option > .min > .min-value',
        {
          timeout: 20000,
        }
      ).click({
        force: true,
      });
      sizeFetchTypeAER.forEach((_item, i) => {
        cy.wait(`@getAER_Price_${i + 1}`, { timeout: 20000 })
          .its('status')
          .should('eq', 200);
      });
      cy.wait(`@getProductTypePrice`, { timeout: 20000 })
        .its('status')
        .should('eq', 200);
    });
  });
});
