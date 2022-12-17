// HOTELONLY
// change hotel
// Catch API  hotel beds and product type
// find low cost 
// compare active room price with price checkout


describe('VISIT , change another hotel, catch API',()=> {
 
    it('visit',()=> {
        cy.viewport(1600, 1600);
       
        cy.visit('https://www.travely24.com/de/tours/1509?hid=21543&period=8&adults=2&children&fa=DPS&ff=0,1439|0,1439&sDate=2023-01-24&eDate=2023-02-01&productType=hotelonly&roomType=DXAF&boardType=UF&PT=hotelonly',
        {timeout : 60000})
    })
    
    it('change another hotel',()=>{
        cy.viewport(1600, 1600);
        cy.get('[data-cy="mapSearchInput"]',{timeout : 60000}).type('Melia Bali',{force : true})
        cy.get('.list-hotel.list',{timeout : 60000}).then( firstElement => {
          const first =  firstElement.get(0)
          cy.wrap(first).click({force : true})
        })
        cy.wait(4000)
        cy.get('[data-cy="btnShowMoreRooms"]',{timeout : 60000}).click({force : true})
        // cy.get('.collapseCategory.show-more-rooms',{timeout : 60000}).click({force : true , multiple: true})
        cy.get('.btn-blue.add-option',{timeout : 60000}).first().click({force : true})
    })

    it('LowPriceHotelBeds, ProductType',() => {
        cy.viewport(1600, 1600);
      
        cy.intercept({
          method: 'GET',
          url:
            '**/offers/?*&productType=hotelonly',
        }).as('traficsHotelOnly');
    
        cy.intercept({
          method: 'GET',
          url:
            'https://www.travely24.com/api/?r=hb&hotels=1&hid=215438&**',
        }).as('hotelsBeds');
    
    
        cy.wait('@traficsHotelOnly', { timeout: 50000 }).then(hotels=> {
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
    
    
    
        cy.wait('@hotelsBeds', { timeout: 50000 }).then( hotelBeds => {
           
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
          total = Math.min(lowPriceBeds , lowPriseProductType );
          console.log('total', total);
    
        })
    
    
      })
      
    })
    
})
