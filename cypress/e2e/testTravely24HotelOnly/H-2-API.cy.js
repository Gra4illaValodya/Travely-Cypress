

import { customURLHotelOnly } from '../../customFunction/main';
import { verifyDateFunction } from '../../customFunction/date';
import {
  FROM_DATE_DEFAULT,
  TO_DATE_DEFAULT,
  CHILDREN_DEFAULT,
  ADULTS_DEFAULT,
  PRODUCT_TYPE_HOTEL,
} from '../../constants/main';



describe('VISIT , FIND LOW COST ROOMS ,COMPARE PRICE ROOM AND TOTAL PRICE',()=> {
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
         'https://www.travely24.com/api/?r=hb&**',
        }).as('titleName')
        cy.wait('@titleName', { timeout: 20000 }).then( dataName => {
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

      context('TEST LowPriceHotelBeds, ProductType  AND MATCHING IN total-price BLOCK , and change hotel and compare price in checkout price and first price active room in  accordion  ',()=>{
        let lowPriceBeds = 999999;
        let lowPriseProductType = 99999;
        let total = 0;
      

      it('Test', () => {
        cy.visit(
          `https://www.travely24.com/de/tours/1317?period=1&adults=2&children=3&hid=12378&fa=ORD&sDate=2022-12-10&eDate=2022-12-11&productType=hotelonly&roomType=QUA.2Q-CV&boardType=RO&PT=hotelonly&ff=0,1439|0,1439`,
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
            'https://www.travely24.com/api/?r=hb&hotels=1&hid=*&**',
        }).as('hotelsBeds');
    
    cy.intercept({
      method:'GET',
      url: 'https://connector.traffics.de/v3/rest/offers/*?adults=*&optionAlternativeFlightOfferList=true&children=*'
    }).as('verify')
        cy.wait('@traficsHotelOnly', { timeout: 50000 }).then((hotels) => {
          const b = hotels.response.body.offerList;
    console.log('b',b);
    
    
    b.forEach((element) => {
    
    console.log(element.totalPrice.value);
    lowPriseProductType =
    lowPriseProductType > element.totalPrice.value
      ? element.totalPrice.value
      : lowPriseProductType;
    });
    
    console.log('lowPriseProductType', lowPriseProductType);
    
    console.log('total', total);
    
    
    cy.wait(3000)
        cy.wait('@hotelsBeds', { timeout: 50000 }).then( hotelBeds => {
            cy.wait(3000)
          console.log('HOTEL BEDS - ' ,hotelBeds);
          cy.wait(3000)
    let a = JSON.parse(hotelBeds.response.body.trim());
          console.log('a   ', a);
          
          let roomsArr = a.hotels.hotels[0].rooms;
    
          console.log('roomsArr   ', roomsArr);
        
          roomsArr.forEach((element) => {
          

            element.rates.forEach((rate) => {
              console.log('rate.sellingRate', rate.sellingRate);
              const a = rate.sellingRate
              lowPriceBeds =
                lowPriceBeds > rate.sellingRate ? rate.sellingRate : lowPriceBeds;
                console.log('lowPriceBeds', lowPriceBeds);

            });
           
          });

        })
          total = Math.min(lowPriceBeds , lowPriseProductType );
          console.log('total', total);




          cy.get('[data-cy="totalCount"]',{timeout:10000}).then(price => {
      
          const text = price.get(0).innerText;
          // console.log('text', text);
          // let priceText = lowPriceBeds + ' €';
          cy.get('.option-price').first().then(priceRoom => {
            const textRoom = priceRoom.get(0).innerText
            const a = textRoom.replace(',','.')
 expect(text).to.include(a);
          })
          
         
       
    
        cy.get('.block-contents-wrapper', { timeout: 20000 }).click({
          force: true,
          multiple: true,
        });
        cy.wait(2000)
        cy.get('[placeholder="Search"]', { timeout: 15000 })
          .click({ force: true })
          .type('Hotel Soller Plaza');
          cy.wait(2000)
        cy.get('#1016251', { timeout: 15000 })
          .contains('Hotel Soller Plaza', { timeout: 15000 })
          .click({ force: true });
          cy.wait(2000)
        cy.get('.show-more-rooms', { timeout: 15000 }).click({
          force: true,
          multiple: true,
        });

 
    
        cy.get('.drop-tour-apartments-content-right', {
          timeout: 10000,
        }).click({ force: true, multiple: true });
        cy.wait(2000)
        cy.get('.btn-blue.add-option',{timeout:10000}).first().click({force:true})
          cy.wait(6000)

    
        cy.get('.btn-blue.add-option',{timeout:20000}).first().click({force:true})
          .invoke('attr', 'class')
          .should('include', 'active')
          .then((classValue) => {
            console.log('classValue',classValue);
            expect(classValue).to.include('btn-blue add-option active');
          });

        
          
     cy.wait('@traficsHotelOnly', { timeout: 50000 }).then((hotels) => {
          const b = hotels.response.body.offerList;
    console.log('b',b);
    
    
    b.forEach((element) => {
    
    console.log(element.totalPrice.value);
    lowPriseProductType =
    lowPriseProductType > element.totalPrice.value
      ? element.totalPrice.value
      : lowPriseProductType;
    });
    
    console.log('lowPriseProductType', lowPriseProductType);
    
    console.log('total', total);
    
    
    cy.wait(3000)
        cy.wait('@hotelsBeds', { timeout: 50000 }).then( hotelBeds => {
            cy.wait(3000)
          console.log('HOTEL BEDS - ' ,hotelBeds);
          cy.wait(3000)
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
          total = Math.min(lowPriceBeds , lowPriseProductType );
          console.log('total', total);
    
        })
    
    
      })
      cy.wait('@verify').then(verify => {
        console.log('verify',verify);
        
        const newTotalPrice = verify.response.body.totalPrice.value  
        console.log('newTotalPrice',newTotalPrice);

        cy.get('.option-price',{timeout:10000}).then(el => {
          const text = el.get(0).innerText
          console.log('text',text);
          expect(text).to.include(newTotalPrice)
        })
      })

       
         
          // .should(($el) => {
          //   let title = ' Gewählte Option';
          //   let price = total + ',00' + ' € ';
          //   let priceText = price + '' + title;
          //   console.log('priceText', priceText);
          //   let spliceText = priceText.slice(title, price);
          //   spliceText = price;
          //   console.log('spliceText', spliceText);
          //   const text = $el.get(0);
          //   console.log('text', text);
          //   expect(text).to.have.text(priceText);
          // });

      });
      })

      }) 
      it('TEST POPUP CANCELATION', () => {
        cy.visit(customURLHotelOnly({}));
        cy.intercept({
          method: 'GET',
          url:
            'https://www.travely24.com/api/?r=hb&**',
        }).as('getPopapPrice');
        // cy.wait('@getPopapPrice', { timeout: 20000 }).then((onePopap) => {
        //   console.log('onePopap.innerText,onePopap.innerText', onePopap);
        // });
    
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



