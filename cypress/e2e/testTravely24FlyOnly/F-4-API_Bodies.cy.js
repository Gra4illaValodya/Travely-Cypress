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
       cy.viewport(1600, 1600);
        cy.visit(customURL({ fdUrlFrom: FD_URL_FROM, fdUrlTo: FA_URL_TO }));
      });

      it(`Catch and test get APIes - standard adults=${ADULTS_DEFAULT} and children=${CHILDREN_DEFAULT}`, () => {
      
        cy.intercept({
          method: 'GET',
          url:  'https://connector.traffics.de/v3/rest/offers/?productType=flight**'
         }).as(`getProductType`);
        sizeFetchTypeAER.forEach((_item, i) => {
          cy.intercept({
           method: 'GET',
           url:customApiAER({
              numberCatch: i + 1,
              fdUrlFrom: FD_URL_FROM,
              fdUrlTo: FA_URL_TO,
            })
          }).as(`getAER_${i + 1}`);
        });

        cy.wait(`@getProductType`, { timeout: 10000 })
          // .its('status')
          // .should('eq', 200);
        sizeFetchTypeAER.forEach((_item, i) => {
          cy.wait(`@getAER_${i + 1}`, { timeout: 10000 })
            // .its('status')
            // .should('eq', 200);
        });
      });

      // it(`Catch and test get API AER - standard adults=${ADULTS_DEFAULT} and children=${CHILDREN_DEFAULT}`, () => {
      //   cy.server();
      // });

      it(`Test size bodies on site - standard adults=${ADULTS_DEFAULT} and children=${CHILDREN_DEFAULT}`, () => {
        cy.get('.travelers > span', {
          timeout: 10000,
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
          timeout: 10000,
        }).click({
          force: true,
        });
      });

      it(`Test size adults on site - standard adults=${ADULTS_DEFAULT}`, () => {
        cy.get(':nth-child(1) > .block-plus-minus > .block-plus-minus__count', {
          timeout: 10000,
        }).then((textSizeAdults) => {
          const innerText = textSizeAdults.get(0).innerText;
          const numberSizeAdultsSite = parseInt(innerText);
          const numberSizeAdults = Number(ADULTS_DEFAULT);
          expect(numberSizeAdultsSite).to.equal(numberSizeAdults);
        });
      });

      it(`Test size children on site - standard  children=${CHILDREN_DEFAULT}`, () => {
        cy.get(':nth-child(2) > .block-plus-minus > .block-plus-minus__count', {
          timeout: 10000,
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
            timeout: 10000,
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
       cy.viewport(1600, 1600);
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
        cy.intercept({
          method:'GET',
          url:  `https://connector.traffics.de/v3/rest/offers/?productType=flight**`
         } ).as(`getProductType`);

        cy.intercept({
          method: 'GET',
          url: `https://www.travely24.com/api/?r=aer*&stype=1`
        }).as('AER_1');
    
        cy.intercept({
          method: 'GET',
          url: `https://www.travely24.com/api/?r=aer*&stype=2`
        }).as('AER_2');
    
        cy.intercept({
          method: 'GET',
          url: `https://www.travely24.com/api/?r=aer*&stype=3`
        }).as('AER_3');
    
        cy.intercept({
          method: 'GET',
          url: `https://www.travely24.com/api/?r=aer*&stype=4`
        }).as('AER_4');
    
        cy.intercept({
          method: 'GET',
          url: `https://www.travely24.com/api/?r=aer*&stype=5`
        }).as('AER_5');
    


         cy.wait(`@getProductType`, { timeout: 50000 }).then( el => {
          expect(el.response.statusCode).to.eq(200)
      
        })

         cy.wait(['@AER_1', '@AER_2', '@AER_3', '@AER_4', '@AER_5'], { timeout: 60000 }).spread(
          (AER_1, AER_2, AER_3, AER_4, AER_5) => {

            expect(AER_1.response.statusCode).to.eq(200)
            expect(AER_2.response.statusCode).to.eq(200)
            expect(AER_3.response.statusCode).to.eq(200)
            expect(AER_4.response.statusCode).to.eq(200)
            expect(AER_5.response.statusCode).to.eq(200)
          });
       
      });

      it(`Test size bodies on site - random adults=${String(
        sizeRandomAdults
      )} and children=${String(arrayRandomChildren)}`, () => {
        cy.get('[data-cy="amountTravelers"]', {
          timeout: 10000,
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
          timeout: 10000,
        }).then((textSizeAdults) => {
          const innerText = textSizeAdults.get(0).innerText;
          const numberSizeAdultsSite = parseInt(innerText);
          const numberSizeAdults = Number(sizeRandomAdults);
          console.log('numberSizeAdults',numberSizeAdults);
          cy.wait(2000)
          expect(numberSizeAdultsSite).to.be.equal(numberSizeAdults);
        });
      });

      it(`Test size children on site - random  children=${String(
        arrayRandomChildren
      )}`, () => {
        cy.get(':nth-child(2) > .block-plus-minus > .block-plus-minus__count', {
          timeout: 10000,
        }).then((textSizeChildren) => {
          const innerText = textSizeChildren.get(0).innerText;
          const numberSizeChildrenSite = parseInt(innerText);
          console.log('numberSizeChildrenSite',numberSizeChildrenSite);
          const numberSizeChildren = String(arrayRandomChildren).split(',').length;
          expect(numberSizeChildrenSite).to.be.eq(numberSizeChildren);
        });
      });

      arrayRandomChildren.forEach((child, i) => {
        it(`Test child #${i + 1} on site - random  children=${String(
          arrayRandomChildren
        )}`, () => {
          cy.get(`.age-child-list > :nth-child(${i + 1})`, {
            timeout: 10000,
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
