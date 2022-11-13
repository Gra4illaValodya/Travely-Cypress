import {
  FD_URL_FROM,
  FA_URL_TO,
  FROM_DEFAULT,
  TO_DEFAULT,
  NEW_FROM_DEFAULT,
} from '../../constants/main';
import {
  customApiAER,
  customApiProductType,
  customURL,
} from '../../customFunction/main';

describe('Test #3-2-1 _ API from/to airport --- 10.10.2022', () => {
  const sizeFetchTypeAER = Array.from(Array(5).keys());
  let arrayAERFareList = [];

  Cypress.on('fail', (error, runnable) => {
    //debugger; //on debugger
    console.log(`Error test name: ${runnable.title}`);
    console.log(error);
    console.log(runnable);
    throw error;
  });

  context(`Test payload ProductType`, () => {
    it(`Visit site travely24 - standard from ${FD_URL_FROM} to ${FA_URL_TO} airport`, () => {
      cy.viewport(1200, 900);
      cy.visit(customURL({ fdUrlFrom: FD_URL_FROM, fdUrlTo: FA_URL_TO }));
    });

    it(`Test GET ProductType`, () => {
      cy.server();
      cy.route(
        'GET',
        customApiProductType({ fdUrlFrom: FD_URL_FROM, fdUrlTo: FA_URL_TO })
      ).as(`getProductType`);
      cy.wait(`@getProductType`, { timeout: 100000 })
        .then((date) => {
          const urlPayload = date.url;
          console.log('date.url  ',date.url);
          const verifyFrom = urlPayload.indexOf(FD_URL_FROM) >= 0;
          const verifyTo = urlPayload.indexOf(FA_URL_TO) >= 0;
          assert.isTrue(
            verifyFrom,
            `Airport from "${FD_URL_FROM}" is exist in payload API /v3/rest/offers/?productType`
          );
          assert.isTrue(
            verifyTo,
            `Airport to "${FA_URL_TO}" is exist in payload API /v3/rest/offers/?productType`
          );
        })
        .its('status')
        .should('eq', 200);
    });
  });

  context(
    `Working this API-es  - standard from ${FD_URL_FROM} to ${FA_URL_TO} airport`,
    () => {
      it(`Visit site travely24 - standard from ${FD_URL_FROM} to ${FA_URL_TO} airport`, () => {
        cy.viewport(1200, 900);
        cy.visit(customURL({fdUrlFrom: FD_URL_FROM,fdUrlTo: FA_URL_TO,})
        );
      });

      it(`Added names API-es and data collection - standard from ${FD_URL_FROM} to ${FA_URL_TO} airport`, () => {
        cy.server();
        sizeFetchTypeAER.forEach((_item, i) => {
          cy.route(
            'GET',
            customApiAER({
              numberCatch: i + 1,
              fdUrlFrom: FD_URL_FROM,
              fdUrlTo: FA_URL_TO,
            })
          ).as(`getAER_${i + 1}`);
        });
        cy.route(
          'GET',
          `https://connector.traffics.de/v3/rest/hotels/62836/recommendations?productType=pauschal&adults=2`
        ).as(`getProductType`);
        sizeFetchTypeAER.forEach((_item, i) => {
          cy.wait(`@getAER_${i + 1}`, { timeout: 100000 })
            .its('status')
            .should('eq', 200);
          cy.get(`@getAER_${i + 1}`).then(({ response }) => {
            const {
              body: { availableFareList },
            } = response;
            console.log("availableFareList",availableFareList);
            availableFareList.forEach((item) => arrayAERFareList.push(item));
            console.log('arrayAERFareList',arrayAERFareList);
          });
        });
        cy.wait(`@getProductType`, { timeout: 100000 })
          .its('status')
          .should('eq', 200);
      });

      it(`Test date exist from and to this url - standard from ${FD_URL_FROM} to ${FA_URL_TO} airport`, () => {
        const verifyFrom =
          arrayAERFareList.filter(
            (item) =>
              item.legList[0].itineraryList[0].segmentList[0].departure.iata ===
              FD_URL_FROM
          ).length > 0;
        const verifyTo =
          arrayAERFareList.filter(
            (item) =>
              item.legList[1].itineraryList[0].segmentList[0].departure.iata ===
              FA_URL_TO
          ).length > 0;
        console.log("@@@" , { arrayAERFareList, FD_URL_FROM, FA_URL_TO });
        assert.isTrue(
          verifyFrom,
          `Airport from "${FD_URL_FROM}" is exist in Api require`
        );
        assert.isTrue(
          verifyTo,
          `Airport to "${FA_URL_TO}" is exist in Api require`
        );
      });

      it(`Test text exist from ${FD_URL_FROM} - standard from ${FD_URL_FROM} to ${FA_URL_TO} airport`, () => {
        cy.get('[disabled="false"] > .item-tour-form', {
          timeout: 100000,
        }).click({
          force: true,
        });
        cy.wait(5000)
        cy.get(
          '.departure-airport > .dropdown-list-selection > .selected-item',
          {
            timeout: 100000,
          }
        ).then((button) => {
          const innerText = button.get(0).innerText;
          const verifyFrom = innerText.indexOf(FD_URL_FROM) >= 0;
          assert.isTrue(
            verifyFrom,
            `Text ${FD_URL_FROM} is exist in site from airport`
          );
        });
      });
    }
  );

  context(
    `Working this API-es  - default from ${FROM_DEFAULT} to ${TO_DEFAULT} airport`,
    () => {
      arrayAERFareList = [];
      it('Visit site travely24 - not airport from and to this url', () => {
        cy.viewport(1200, 900);
        cy.visit(customURL({ fdUrlFrom: '1' }));
      });

      it(`Added names API-es and data collection - default from ${FROM_DEFAULT} to ${TO_DEFAULT} airport`, () => {
        cy.server();
        sizeFetchTypeAER.forEach((_item, i) => {
          cy.route('GET', customApiAER({ numberCatch: i + 1 })).as(
            `getAER_${i + 1}`
          );
        });
        sizeFetchTypeAER.forEach((_item, i) => {
          cy.wait(`@getAER_${i + 1}`, { timeout: 100000 })
            .its('status')
            .should('eq', 200);
          cy.get(`@getAER_${i + 1}`).then(({ response }) => {
            const {
              body: { availableFareList },
            } = response;
            availableFareList.forEach((item) => arrayAERFareList.push(item));
          });
        });
      });

      it(`Test date not exist from and to this url - default from ${FROM_DEFAULT} to ${TO_DEFAULT} airport`, () => {
        const verifyFrom =
          arrayAERFareList.filter(
            (item) =>
              item.legList[0].itineraryList[0].segmentList[0].departure.iata ===
              FROM_DEFAULT
          ).length > 0;
        const verifyTo =
          arrayAERFareList.filter(
            (item) =>
              item.legList[1].itineraryList[0].segmentList[0].departure.iata ===
              TO_DEFAULT
          ).length > 0;
        //if (arrayAERFareList.length > 0) {
        assert.isTrue(
          verifyFrom,
          `Airport from "${FROM_DEFAULT}" is exist in Api require`
        );
        assert.isTrue(
          verifyTo,
          `Airport to "${TO_DEFAULT}" is exist in Api require`
        );
        //} else console.log('Not air!!!!')
      });

      it(`Test text exist from empty - default from ${FROM_DEFAULT} to ${TO_DEFAULT} airport`, () => {
        cy.viewport(1600, 1200);
        cy.get('[disabled="false"] > .item-tour-form', {
          timeout: 100000,
        }).click({
          force: true,
        });
        cy.contains(
          '.departure-airport > .dropdown-list-selection > .selected-item'
        ).should('not.exist');
        cy.wait(2000);
      });

      it(`Test enter new text/from in input from - default from ${FROM_DEFAULT} to ${TO_DEFAULT} airport`, () => {
        cy.viewport(1600, 1600);
        cy.get('.dropdown-list-search', {
          timeout: 100000,
        })
          .should((input) => {
            const val = input.val();
            expect(val).to.not.have.string();
          })
          .type(NEW_FROM_DEFAULT)
          .should((input) => {
            const val = input.val();
            expect(val).to.have.string(NEW_FROM_DEFAULT);
          });
        cy.get(
          ':nth-child(1) > .drop-user-room-list-item-title > .title-wrapper > .city',
          {
            timeout: 100000,
          }
        ).click({
          force: true,
        });
      });

      it(`Test new text/from in text site from - default from ${FROM_DEFAULT} to ${TO_DEFAULT} airport`, () => {
        cy.get(
          '.departure-airport > .dropdown-list-selection > .selected-item',
          {
            timeout: 100000,
          }
        ).then((button) => {
          const innerText = button.get(0).innerText;
          const verifyFrom = innerText.indexOf(NEW_FROM_DEFAULT) >= 0;
          assert.isTrue(
            verifyFrom,
            `Text ${NEW_FROM_DEFAULT} is exist in site from airport`
          );
        });
      });
    }
  );
});
