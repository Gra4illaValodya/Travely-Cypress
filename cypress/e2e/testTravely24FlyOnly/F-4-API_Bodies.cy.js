import {
  FD_URL_FROM,
  FA_URL_TO,
  CHILDREN_DEFAULT,
  ADULTS_DEFAULT,
} from '../../constants/main';
import {
  customApiAER,
  customApiProductType,
  customURL,
} from '../../customFunction/main';

const randomChildren = () => {
  const sizeChildren = Math.floor(Math.random() * 5 + 1);
  const emptyArray = Array.from(Array(sizeChildren).keys());
  const addedAgeChildren = emptyArray.map(() =>
    String(Math.floor(Math.random() * 14 + 1))
  );
  return addedAgeChildren;
};

describe('Test #3-2-2 _ API test bodies and other --- 10.10.2022', () => {
  const sizeFetchTypeAER = Array.from(Array(5).keys());

  const arrayRandomChildren = randomChildren();
  const sizeRandomAdults = Math.floor(Math.random() * 5 + 1);

  Cypress.on('fail', (error, runnable) => {
    //debugger; //on debugger
    console.log(`Error test name: ${runnable.title}`);
    console.log(error);
    console.log(runnable);
    throw error;
  });

  context(
    `Test standard adults=${ADULTS_DEFAULT} and children=${CHILDREN_DEFAULT}`,
    () => {
      it(`Visit site travely24 - standard adults=${ADULTS_DEFAULT} and children=${CHILDREN_DEFAULT}`, () => {
        cy.viewport(1200, 900);
        cy.visit(customURL({ fdUrlFrom: FD_URL_FROM, fdUrlTo: FA_URL_TO }));
      });

      it(`Catch and test get APIes - standard adults=${ADULTS_DEFAULT} and children=${CHILDREN_DEFAULT}`, () => {
        cy.server();
        cy.route(
          'GET',
          customApiProductType({ fdUrlFrom: FD_URL_FROM, fdUrlTo: FA_URL_TO })
        ).as(`getProductType`);
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

        cy.wait(`@getProductType`, { timeout: 100000 })
          .its('status')
          .should('eq', 200);
        sizeFetchTypeAER.forEach((_item, i) => {
          cy.wait(`@getAER_${i + 1}`, { timeout: 100000 })
            .its('status')
            .should('eq', 200);
        });
      });

      it(`Catch and test get API AER - standard adults=${ADULTS_DEFAULT} and children=${CHILDREN_DEFAULT}`, () => {
        cy.server();
      });

      it(`Test size bodies on site - standard adults=${ADULTS_DEFAULT} and children=${CHILDREN_DEFAULT}`, () => {
        cy.get('.travelers > span', {
          timeout: 100000,
        }).then((textSizeBodies) => {
          const innerText = textSizeBodies.get(0).innerText;
          const numberSizeBodiesSite = parseInt(innerText);
          const numberSizeAdults = Number(ADULTS_DEFAULT);
          const numberSizeChildren = CHILDREN_DEFAULT.split(',').length;
          expect(numberSizeBodiesSite).to.equal(
            numberSizeAdults + numberSizeChildren
          );
        });
      });

      it(`Click setting bodies on site`, () => {
        cy.get('[data-cy="amountTravelers"]', {
          timeout: 100000,
        }).click({
          force: true,
        });
      });

      it(`Test size adults on site - standard adults=${ADULTS_DEFAULT}`, () => {
        cy.get(':nth-child(1) > .block-plus-minus > .block-plus-minus__count', {
          timeout: 100000,
        }).then((textSizeAdults) => {
          const innerText = textSizeAdults.get(0).innerText;
          const numberSizeAdultsSite = parseInt(innerText);
          const numberSizeAdults = Number(ADULTS_DEFAULT);
          expect(numberSizeAdultsSite).to.equal(numberSizeAdults);
        });
      });

      it(`Test size children on site - standard  children=${CHILDREN_DEFAULT}`, () => {
        cy.get(':nth-child(2) > .block-plus-minus > .block-plus-minus__count', {
          timeout: 100000,
        }).then((textSizeChildren) => {
          const innerText = textSizeChildren.get(0).innerText;
          const numberSizeChildrenSite = parseInt(innerText);
          const numberSizeChildren = CHILDREN_DEFAULT.split(',').length;
          expect(numberSizeChildrenSite).to.equal(numberSizeChildren);
        });
      });

      CHILDREN_DEFAULT.split(',').forEach((child, i) => {
        it(`Test child #${
          i + 1
        } on site - standard  children=${CHILDREN_DEFAULT}`, () => {
          cy.get(`.age-child-list > :nth-child(${i + 1})`, {
            timeout: 100000,
          }).then((inputAgeChild) => {
            const innerText = inputAgeChild.val();
            const ageChildSite = parseInt(innerText);
            expect(Number(child)).to.equal(ageChildSite);
          });
        });
      });
    }
  );

  context(
    `Test random adults=${String(sizeRandomAdults)} and children=${String(
      arrayRandomChildren
    )}`,
    () => {
      it(`Visit site travely24 - random adults=${String(
        sizeRandomAdults
      )} and children=${String(arrayRandomChildren)}`, () => {
        cy.viewport(1200, 900);
        cy.visit(
          customURL({
            fdUrlFrom: FD_URL_FROM,
            fdUrlTo: FA_URL_TO,
            adults: String(sizeRandomAdults),
            children: String(arrayRandomChildren),
          })
        );
      });

      it(`Catch and test get APIes - random adults=${String(
        sizeRandomAdults
      )} and children=${String(arrayRandomChildren)}`, () => {
        cy.server();
        cy.route(
          'GET',
          customApiProductType({
            fdUrlFrom: FD_URL_FROM,
            fdUrlTo: FA_URL_TO,
            adults: String(sizeRandomAdults),
            children: String(arrayRandomChildren),
          })
        ).as(`getProductType`);
        sizeFetchTypeAER.forEach((_item, i) => {
          cy.route(
            'GET',
            customApiAER({
              numberCatch: i + 1,
              fdUrlFrom: FD_URL_FROM,
              fdUrlTo: FA_URL_TO,
              adults: String(sizeRandomAdults),
              children: String(arrayRandomChildren),
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

      it(`Test size bodies on site - random adults=${String(
        sizeRandomAdults
      )} and children=${String(arrayRandomChildren)}`, () => {
        cy.get('[data-cy="amountTravelers"]', {
          timeout: 100000,
        }).then((textSizeBodies) => {
          const innerText = textSizeBodies.get(0).innerText;
          const numberSizeBodiesSite = parseInt(innerText);
          const numberSizeAdults = Number(String(sizeRandomAdults));
          const numberSizeChildren = String(arrayRandomChildren).split(',')
            .length;
          expect(numberSizeBodiesSite).to.equal(
            numberSizeAdults + numberSizeChildren
          );
        });
      });

      // it(`Click setting bodies on site`, () => {
      //   }).click({
      //     force: true,
      //   });
      // });

      it(`Test size adults on site - random adults=${String(
        sizeRandomAdults
      )}`, () => {
        cy.get(':nth-child(1) > .block-plus-minus > .block-plus-minus__count', {
          timeout: 100000,
        }).then((textSizeAdults) => {
          const innerText = textSizeAdults.get(0).innerText;
          const numberSizeAdultsSite = parseInt(innerText);
          const numberSizeAdults = Number(sizeRandomAdults);
          console.log('numberSizeAdults',numberSizeAdults);
          expect(numberSizeAdultsSite).to.have.tring(numberSizeAdults);
        });
      });

      it(`Test size children on site - random  children=${String(
        arrayRandomChildren
      )}`, () => {
        cy.get(':nth-child(2) > .block-plus-minus > .block-plus-minus__count', {
          timeout: 100000,
        }).then((textSizeChildren) => {
          const innerText = textSizeChildren.get(0).innerText;
          const numberSizeChildrenSite = parseInt(innerText);
          const numberSizeChildren = String(arrayRandomChildren).split(',').length;
          expect(numberSizeChildrenSite).to.have.string(numberSizeChildren);
        });
      });

      arrayRandomChildren.forEach((child, i) => {
        it(`Test child #${i + 1} on site - random  children=${String(
          arrayRandomChildren
        )}`, () => {
          cy.get(`.age-child-list > :nth-child(${i + 1})`, {
            timeout: 100000,
          }).then((inputAgeChild) => {
            const innerText = inputAgeChild.val();
            const ageChildSite = parseInt(innerText);
            expect(Number(child)).to.equal(ageChildSite);
          });
        });
      });
    }
  );
  })
