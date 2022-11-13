

import { customURLHotelOnly } from '../../customFunction/main';
import { verifyDateFunction } from '../../customFunction/date';
import {
  FROM_DATE_DEFAULT,
  TO_DATE_DEFAULT,
  CHILDREN_DEFAULT,
  ADULTS_DEFAULT,
  PRODUCT_TYPE_HOTEL,
} from '../../constants/main';



describe('TEST API',()=> {
let titleName = ''
	it('visit', () => {
        cy.viewport(1600, 1600);
      cy.visit(customURLHotelOnly({},{timeout:15000}) )
      });
  context('HOTEL BlOCK',()=>{

      it('title room', ()=> {
        cy.viewport(1600, 1600);
       
        cy.intercept({
          method: 'GET',
          url:
         'https://www.travely24.com/api/?r=hb&hotels=1&hid=24276&hotelDetails=0&period=4&startDate=2022-11-15&adults=2&children=3,11',
        }).as('titleName')
        cy.wait('@titleName', { timeout: 10000 }).then((dataName) => {
        let a =  JSON.parse(dataName.response.body.trim());
        console.log(a);
        console.log(a.hotels.hotels[0].name);
        titleName = a.hotels.hotels[0].name
        
        console.log('titleName in ',titleName);
       
       cy.get('[data-cy="block-checkout-hotel"] > .block-fly-text-top',{timeout:10000}).eq(0).should('include.text', titleName)
    })
      })
    //   it('type room',()=>{
    //     cy.visit(
    //       customURLHotelOnly({}),
          
    //       );
    //       cy.get('[data-cy="mapSearchInput"]')
    //   cy.intercept({
    //     method: 'GET',
    //     url:
    //    'https://connector.traffics.de/v3/rest/hotels?productType=hotelonly&productSubType=*&navigation=1,50,1&searchDate=*&fromDate=*&toDate=*&duration=*&adults=*&sortBy=price&optionList=roomType,inclusiveCode&rating[source]=tripadvisor&tourOperatorList=*&children=*&giataIdList=*',
    //   }).as('hotelList')
    //   cy.wait('@hotelList',{timeout:10000}).then((list) => {
    //    console.log(list);
     
    //   })

    
    // })
    })
//     context('MAP BLOCK',()=>{
// let hotel = []
//       it('includes room in hotel list',()=>{
//         cy.viewport(1600, 1600)
//         cy.visit(
//           customURLHotelOnly({}),
          
//           );
//           cy.intercept({
//             method: 'GET',
//             url: "https://www.travely24.com/api/?r=hb&hotels=1&hotelDetails=0&period=4&startDate=2022-11-13&adults=2&hotelsStock=50&children=3,11&lat=41.893769&lng=-87.615165&radius=450"
//           }).as('hotelsList')
//           cy.wait('@hotelsList',{timeout:15000}).then( (list )=> {
//               const a = JSON.parse(list.response.body.trim())
//               const hotelsList = a.hotels
        
//             console.log(hotelsList);

                   
//               });
//           })
//       })

      context('TEST LowPriceHotelBeds, ProductType  AND MATCHING IN total-price BLOCK',()=>{
        let lowPriceBeds = 999999;
        let lowPriseProductType = 99999;
        let total = 0;
      

      it('Test', () => {
        cy.visit(
          "https://www.travely24.com/de/tours/1317?period=4&adults=2&children=3,11&hid=12378&fa=ORD&sDate=2022-11-14&eDate=2022-11-18&productType=hotelonly&roomType=Z7+U&boardType=OV&PT=hotelonly",
          { timeout: 30000 }
        );
        // cy.get('.totalPriceBlock' , {timeout:14000})
    
        cy.intercept({
          method: 'GET',
          url:
            '**/offers/?*&productType=hotelonly',
        }).as('traficsHotelOnly');
    
        cy.intercept({
          method: 'GET',
          url:
            'https://www.travely24.com/api/?r=hb&hotels=1&hid=12378&hotelDetails=0&period=4&startDate=2022-11-14&adults=2&children=3,11',
        }).as('hotelsBeds');


        cy.wait('@traficsHotelOnly', { timeout: 40000 }).then((hotels) => {
          const b = hotels.response.body.offerList;
  console.log('b',b);
    total = Math.min(lowPriseProductType, lowPriceBeds);
    console.log('lowPriceBeds',lowPriceBeds);
    console.log('lowPriseProductType',lowPriseProductType);
    console.log('total', total);
 b.forEach((element) => {
 
 console.log(element.totalPrice.value);
  lowPriseProductType =
    lowPriseProductType > element.totalPrice.value
      ? element.totalPrice.value
      : lowPriseProductType;
});

console.log('lowPriseProductType', lowPriseProductType);
console.log('lowPriceBeds',lowPriceBeds);
})



        cy.wait('@hotelsBeds', { timeout: 40000 }).then( hotelBeds => {
          console.log('HOTEL BEDS - ' ,hotelBeds);
    let a = JSON.parse(hotelBeds.response.body.trim());
          console.log('a   ', a);
          let roomsArr = a.hotels.hotels[0].rooms;
    
          console.log('roomsArr   ', roomsArr);
        
          roomsArr.forEach((element) => {
            element.rates.forEach((rate) => {
              console.log('rate.sellingRate', rate.sellingRate);
              lowPriceBeds =
                lowPriceBeds > rate.sellingRate ? rate.sellingRate : lowPriceBeds;
                console.log('lowPriceBeds', lowPriceBeds);

            });
          });
        })

    


cy.get('[data-cy="totalCount"]',{timeout:10000}).then(price => {
      
          const text = price.get(0).innerText;
          console.log('text', text);
          let priceText = lowPriceBeds + ' €';
          console.log('priceText', priceText);
          // expect(text).to.have.contain(priceText);
       
    
        cy.get('.block-contents-wrapper', { timeout: 20000 }).click({
          force: true,
          multiple: true,
        });
        cy.get('[placeholder="Search"]', { timeout: 15000 })
          .click({ force: true })
          .type('Hotel Soller Plaza')    ;
        cy.get('#1016251', { timeout: 15000 })
          .contains('Hotel Soller Plaza', { timeout: 15000 })
          .click({ force: true });
        cy.get('.show-more-rooms', { timeout: 15000 }).click({
          force: true,
          multiple: true,
        });
    
        cy.get('.drop-tour-apartments-content-right', {
          timeout: 10000,
        }).click({ force: true, multiple: true });
        cy.get('.option-price',{timeout:10000})
          .first()
          .should('have.text', total + ',00' + ' € ');
    
        cy.get('#btn00DBTBL-1hotelonly')
          .invoke('attr', 'class')
          .should('include', 'active')
          .then((classValue) => {
            expect(classValue).to.contain('active');
          });
        cy.get('#btn00DBTBL-1hotelonly',{timeout:10000})
          .contains(' Gewählte Option',{timeout:10000})
          .parent()
          .should(($el) => {
            let title = ' Gewählte Option';
            let price = total + ',00' + ' € ';
            let priceText = price + '' + title;
            console.log('priceText', priceText);
            let spliceText = priceText.slice(title, price);
            spliceText = price;
            console.log('spliceText', spliceText);
            const text = $el.get(0);
            console.log('text', text);
            expect(text).to.have.text(priceText);
          });
      });
      
      }) 
      it('TEST POPUP CANCELATION', () => {
        cy.visit(customURLHotelOnly({}));
        cy.intercept({
          method: 'GET',
          url:
            'https://www.travely24.com/api/?r=hb&hotels=1&hid=24276&hotelDetails=1',
        }).as('getPopapPrice');
        cy.wait('@getPopapPrice', { timeout: 20000 }).then((onePopap) => {
          console.log('onePopap.innerText,onePopap.innerText', onePopap);
        });
    
        cy.get('[data-cy="btnShowMoreRooms"]', { timeout: 15000 }).click({
          force: true,
        });
        cy.get('.collapseCategory', {
          timeout: 10000, 
        }).click({
          force: true,
          multiple: true,
        });
        cy.get('.cancellation').first().trigger('mouseover', { force: true });
        cy.get('.popper > div > span').each((element) => {
          const price = element[0].firstChild.innerHTML;
          const textPopap = element[0].outerText;
          console.log('price', price);
          console.log('textPopap', textPopap);
          expect(textPopap).to.include(price);
        });
      });
    
    })

    
  }); 



