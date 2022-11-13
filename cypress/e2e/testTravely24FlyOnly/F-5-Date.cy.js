import {
  FROM_DATE_DEFAULT,
  FROM_DEFAULT,
  TO_DATE_DEFAULT,
  TO_DEFAULT,
} from '../../constants/main';
import { minusDate, randomDate } from '../../customFunction/date';
import {
  customApiAER,
  customApiProductType,
  customURL,
} from '../../customFunction/main';

describe('Test #3-2-3 _ API test date --- 10.10.2022', () => {
  const sizeFetchTypeAER = Array.from(Array(5).keys());
  const randomAddDay = Math.floor(Math.random() * 5 + 1);
  const randomDateObject = randomDate(randomAddDay);

  Cypress.on('fail', (error, runnable) => {
    //debugger; //on debugger
    console.log(`Error test name: ${runnable.title}`);
    console.log(error);
    console.log(runnable);
    throw error;
  });

  context(
    `Test standard date = from ${FROM_DATE_DEFAULT} to ${TO_DATE_DEFAULT}`,
    () => {
      it(`Visit site travely24 - standard`, () => {
        cy.viewport(1200, 900);
        cy.visit(customURL({}));
      });

      it(`Catch and test get APIes - random date from=${FROM_DATE_DEFAULT} and to=${TO_DATE_DEFAULT}`, () => {
        cy.server();
        cy.route('GET', customApiProductType({})).as(`getProductType`);
        sizeFetchTypeAER.forEach((_item, i) => {
          cy.route('GET', customApiAER({ numberCatch: i + 1 })).as(
            `getAER_${i + 1}`
          );
        });

        cy.wait(`@getProductType`, { timeout: 100000 })
          .its('status')
          .should('eq', 200);
        sizeFetchTypeAER.forEach((_item, i) => {
          cy.wait(`@getAER_${i + 1}`, { timeout: 100000 })
            .its('status')
            .should('eq', 200);
        });
      });
    }
  );

  context(
    `Test random date = from ${randomDateObject.from} to ${randomDateObject.to}`,
    () => {
      it(`Visit site travely24 - random date `, () => {
        cy.viewport(1200, 900);
        cy.visit(
          customURL({
            fromDate: randomDateObject.from,
            toDate: randomDateObject.to,
          })
        );
      });

      it(`Catch and test get APIes - random date from=${randomDateObject.from} and to=${randomDateObject.to}`, () => {
        cy.server();
        cy.route(
          'GET',
          customApiProductType({
            fromDate: minusDate(randomDateObject.from),
            toDate: minusDate(randomDateObject.to),
            fdUrlFrom: FROM_DEFAULT,
            fdUrlTo: TO_DEFAULT,
          })
        ).as(`getProductType`);
        sizeFetchTypeAER.forEach((_item, i) => {
          cy.route(
            'GET',
            customApiAER({
              numberCatch: i + 1,
              fromDate: randomDateObject.from,
              toDate: randomDateObject.to,
            })
          ).as(`getAER_${i + 1}`);
        });

        cy.wait(`@getProductType`, { timeout: 100000 })
          .its('status')
          .should('eq', 200);
        sizeFetchTypeAER.forEach((_item, i) => {
          cy.wait(`@getAER_${i + 1}`, { timeout: 100000 })
            .its('status')
            .should('eq', 200);
        });
      });
    }
  );
});
