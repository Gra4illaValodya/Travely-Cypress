import {
  FD_URL_FROM,
  FA_URL_TO,
  FROM_DEFAULT,
  TO_DEFAULT,
  NEW_FROM_DEFAULT,
  PERIOD_DEFAULT,
  HID_DEFAULT,
  FROM_DATE_DEFAULT,
  TO_DATE_DEFAULT,

} from '../../../constants/main';

import {
  customApiAER,
  customApiProductType,
  customURL,
} from '../../../customFunction/main';

describe('TEST MOBILE API',()=> {
  const sizeFetchTypeAER = Array.from(Array(5).keys());
  let arrayAERFareList = [];
  it(`Visit site travely24 - standard from ${FD_URL_FROM} to ${FA_URL_TO} airport`, () => {
    cy.viewport(525, 425);
    // cy.visit(customURL({ fdUrlFrom: FD_URL_FROM, fdUrlTo: FA_URL_TO }), {timeout:100000});
    cy.visit('https://www.travely24.com/de/tours/777?hid=62836&period=2&adults=2&children=3,11&fa=JFK&sDate=2023-01-12&eDate=2023-01-14&productType=flight&roomType=DF1F&boardType=UF&PT=pauschal&fd=ZAG',{timeout:20000})
   
    //cy.visit('https://www.travely24.com/de/tours/777?hid=17953&productType=flight&period=1&adults=2&children&fa=JFK&sDate=2022-11-25&eDate=2022-11-26')
  })

  context('PRODUCT TYPE',()=>{
    it('get ProductType',()=>{
      cy.viewport(525, 425);
      cy.visit(customURL({ fdUrlFrom: FROM_DEFAULT, fdUrlTo: TO_DEFAULT }));
      
      cy.intercept({
        method: "GET",
        url : 'https://connector.traffics.de/v3/rest/offers/?productType=flight**'
            }).as('ProductType') 
      cy.wait('@ProductType',{timeout:20000}).then(item => {
        const statusCode = item.response.statusCode
      expect(statusCode).to.eq(200)
      })
    })
  })


  context(
    `Working this API-es  - standard from ${FD_URL_FROM} to ${FA_URL_TO} airport`,
    () => {
      it(`Visit site travely24 - standard from ${FD_URL_FROM} to ${FA_URL_TO} airport`, () => {

        cy.viewport(525, 425);
        cy.visit(customURL({fdUrlFrom: FD_URL_FROM,fdUrlTo: FA_URL_TO}))

      })
      

    
      it(`Added names API-es and data collection - standard from ${FD_URL_FROM} to ${FA_URL_TO} airport`, () => {
        cy.viewport(525, 425);
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
          cy.wait(`@getAER_${i + 1}`, { timeout: 15000 })
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
        cy.wait(`@getProductType`, { timeout: 15000 })
          .its('status')
          .should('eq', 200);
      });
    
      it(`Test date exist from and to this url - standard from ${FD_URL_FROM} to ${FA_URL_TO} airport`, () => {
        cy.viewport(525, 425);
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
        cy.viewport(525, 425);
        cy.get('[data-cy="buttonFlightChoose"]', {
          timeout: 25000,
        }).click({
          force: true,
        });
        cy.wait(5000)
        cy.get(
          '[data-cy="firstDepartureAir"]',
          {
            timeout: 15000,
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
    });
  })

