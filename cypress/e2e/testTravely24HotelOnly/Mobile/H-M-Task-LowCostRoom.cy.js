describe('TEST LowPriceHotelBeds, ProductType  AND MATCHING IN total-price BLOCK',()=>{
    let lowPriceBeds = 999999;
    let lowPriseProductType = 99999;
    let total = 0;
  

  it('visit', () => {
    cy.viewport(525,425)
    cy.visit("https://www.travely24.com/de/tours/1317?period=1&adults=2&children=3&hid=12378&fa=ORD&sDate=2022-12-10&eDate=2022-12-11&productType=hotelonly&roomType=QUA.2Q-CV&boardType=RO&PT=hotelonly&ff=0,1439|0,1439",
      { timeout: 50000 });
  })

  it('LowPriceHotelBeds, ProductType',() => {
    cy.viewport(525,425)
  
   
    cy.intercept({
      method: 'GET',
      url:
        '**/offers/?*&productType=hotelonly',
    }).as('traficsHotelOnly');

    cy.intercept({
      method: 'GET',
      url:
        'https://www.travely24.com/api/?r=hb&hotels=1&hid=12378&**',
    }).as('hotelsBeds');


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
  
})

it('Compare Price Block Checkout',()=> {
    cy.viewport(525,425)

    cy.get('[data-cy="totalCount"]', { timeout: 50000 }).then( text => {
        const totalCountCheckout = text.get(0).innerText
        expect(totalCountCheckout).to.include(total)
    })
})




})

