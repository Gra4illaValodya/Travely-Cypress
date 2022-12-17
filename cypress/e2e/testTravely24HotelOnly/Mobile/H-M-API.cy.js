

// import { customURLHotelOnly } from '../../customFunction/main';
//import { verifyDateFunction } from '../../customFunction/date';
// import {
//   FROM_DATE_DEFAULT,
//   TO_DATE_DEFAULT,
//   CHILDREN_DEFAULT,
//   ADULTS_DEFAULT,
//   PRODUCT_TYPE_HOTEL,
// } from '../../constants/main';



describe('VISIT , FIND LOW COST ROOMS ,COMPARE PRICE ROOM AND TOTAL PRICE',()=> {
let titleName = ''
	it('visit', () => {
        cy.viewport(525,425)
      cy.visit('https://www.travely24.com/de/tours/1317?period=1&adults=2&children=3,11&hid=24276&fa=ORD&sDate=2022-12-17&eDate=2022-12-18&productType=hotelonly&roomType=QUA.2D-CV&boardType=RO&PT=hotelonly&ff=0,1439|0,1439',{timeout:25000} )
      });
//   context('HOTEL BlOCK',()=>{

      it('title room', ()=> {
    cy.viewport(525,425)
       
   
    cy.visit('https://www.travely24.com/de/tours/1317?period=1&adults=2&children=3,11&hid=24276&fa=ORD&sDate=2022-12-17&eDate=2022-12-18&productType=hotelonly&roomType=QUA.2D-CV&boardType=RO&PT=hotelonly&ff=0,1439|0,1439',{timeout:25000} )
    

        cy.intercept({
          method: 'GET',
          url:
         'https://www.travely24.com/api/?r=hb&**',
        }).as('titleName')

        cy.wait('@titleName', { timeout: 10000 }).then( dataName => {
        let a =  JSON.parse(dataName.response.body.trim());
        console.log(a);
        console.log(a.hotel.name.content);
        titleName = a.hotel.name.content
        cy.wait(2000)
        console.log('titleName in ',titleName);
        cy.wait(2000)
       cy.get('.block-single-tour-mobile-title',{timeout:10000}).then( text => {
        const title = text.get(0).innerText 
        console.log(title);
        expect(title).to.include(titleName)
       })
    })
});
    //   })


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
      

      it.only('Test', () => {
        cy.viewport(525,1025)
        cy.visit(
          `https://www.travely24.com/de/tours/777?hid=114091&productType=hotelonly&period=1&adults=2&children&ff=0,1439|0,1439&fa=EWR&sDate=2022-12-19&eDate=2022-12-20&roomType=DXAU&boardType=OV&PT=hotelonly`,
          { timeout: 35000 }
        );
        // cy.get('.totalPriceBlock' , {timeout:14000})
        cy.wait(3000)

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
      url: 'https://connector.traffics.de/v3/rest/offers/X78PH_Q1AyNF9IX0RFUl9MX0RBVEFfUE1JMTIxMjBCX0RCMVVfMTkxMjIyXzFfX1BNSV8yLCwsLCxfMTAxNjI1MV9fX19fX19fXzBfMF8wX19fXzcyXzcyXzcy?adults=2&optionAlternativeFlightOfferList=true'
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

    //     cy.wait('@hotelsBeds', { timeout: 50000 }).then( hotelBeds => {
    //         cy.wait(3000)
    //       console.log('HOTEL BEDS - ' ,hotelBeds);
    //       cy.wait(3000)
    // let a = JSON.parse(hotelBeds.response.body.trim());
    //       console.log('a   ', a);
    //       cy.wait(3000)
    //       let roomsArr = a.hotels.hotels[0].rooms;
    
    //       console.log('roomsArr   ', roomsArr);
        
    //       roomsArr.forEach((element) => {
          

    //         element.rates.forEach((rate) => {
    //           console.log('rate.sellingRate', rate.sellingRate);
    //           const a = rate.sellingRate
    //           lowPriceBeds =
    //             lowPriceBeds > rate.sellingRate ? rate.sellingRate : lowPriceBeds;
    //             console.log('lowPriceBeds', lowPriceBeds);

    //         });
           
    //       });

    //     })
        
          total = Math.min(lowPriceBeds , lowPriseProductType );
          console.log('total', total);




          cy.get('[data-cy="totalCount"]',{timeout:10000}).then(price => {
      
          const text = price.get(0).innerText 
          console.log('text', text);
        //   let priceText = lowPriceBeds + ' €';
        cy.wait(3000)
          cy.get('[data-cy="buttonHotelChoose"]').click({force: true})
          cy.wait(3000)

          cy.get('[data-cy="btnChooseRoom"]',{timeout:10000}).click({force: true})
          cy.wait(3000)
          cy.get('.show-more-rooms',{timeout:10000}).first().click({force:false,multiple:true})
      
          cy.wait(3000) 
          cy.get('.price-add-block-option .price-add-block',{timeout:10000}).then(priceRoom => {
            const textRoom = parseInt(priceRoom.get(0).innerText) + ' €'
            console.log('textRoom',textRoom);
            // const a = parseFloat(textRoom) x
            // console.log('a',a);
            expect(textRoom).to.include(text);      // working test
           
            // expect(a).to.include(v); // template
           })
          })
          
        })
//           cy.get('.option-price').first().then(priceRoom => {
//             const textRoom = priceRoom.get(0).innerText
//             const a = textRoom.replace(',','.')
//  expect(text).to.include(a);
//           })
          
cy.wait(2000)

       cy.get('[data-cy="addOption"]').first().click({force:true})

       cy.wait(2000)

    cy.get('[data-cy="changeAccommodation"]').click({force:true})
        // cy.get('.block-contents-wrapper', { timeout: 20000 }).click({
        //   force: true,
        //   multiple: true,
        // });
        cy.wait(2000)

        cy.get('.searchAutocompleteInput', { timeout: 15000 })
          .click({ force: true })
          .type('Hotel Soller Plaza');
          cy.wait(2000)
        cy.get('#1016251', { timeout: 15000 })
          .contains('Hotel Soller Plaza', { timeout: 15000 })
          .click({ force: true });
          cy.wait(2000)
        cy.get('[data-cy="addOption"]').first().click({force:true})
        cy.get('.show-more-rooms', { timeout: 15000 }).click({
          force: true,
          multiple: true,
        });



        cy.get('[data-cy="btnChooseRoom"]').click({force: true})
        cy.get('.show-more-rooms').click({multiple:true,force:true})
 
    cy.wait('@verify',{timeout : 15000}).then( text1 => {
   

      const price = text1.response.body.totalPrice.value + ' €'
    console.log('price',price);
        cy.get('.price-add-block-option > .price-add-block').first().then(priceRoom => {
          console.log('priceRoom',priceRoom);
          const textRoom = priceRoom.get(0).innerText
          console.log('textRoom',textRoom);
          const a = parseInt(textRoom) + ' €'
          console.log('a',a);
         
          expect(price).to.include(a);         // working test
        })
      })
 ///////////////////////////////
    
        // cy.get('.drop-tour-apartments-content-right', {
        //   timeout: 10000,
        // }).click({ force: true, multiple: true });
        // cy.wait(2000)
        // cy.get('.btn-blue.add-option',{timeout:10000}).first().click({force:true})
        //   cy.wait(2000)

    
        cy.get('.btn-blue.add-option',{timeout:10000}).first().click({force:true})
          .invoke('attr', 'class')
          .should('include', 'active')
          .then((classValue) => {
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
    
    });
   
      it.only('TEST POPUP CANCELATION', () => {
        cy.visit('https://www.travely24.com/de/tours/777?hid=114091&productType=hotelonly&period=1&adults=2&children&ff=0,1439|0,1439&fa=EWR&sDate=2022-12-19&eDate=2022-12-20&roomType=DXAU&boardType=OV&PT=hotelonly',{timeout:15000})
        // cy.visit(customURLHotelOnly({}));
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



  



