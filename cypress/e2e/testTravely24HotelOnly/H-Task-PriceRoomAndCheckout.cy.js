


describe('visit ,Catch API hotel,compare current price room and block checkout',()=> {

    it('visit',()=>{
        cy.viewport(1600,1600)

        cy.visit('https://www.travely24.com/de/tours/1317?period=1&adults=2&children&ff=0,1439|0,1439&hid=24276&fa=ORD&sDate=2022-12-07&eDate=2022-12-08&productType=hotelonly&roomType=DBL.CV-KG&boardType=RO&PT=hotelonly&flight=BA1543%3C-BA902|AA705-%3EAA815|',
        {timeout:30000}
        )
    })

    it('Catch API',()=>{
        cy.viewport(1600,1600)

      cy.intercept({
        method: 'GET',
        url:'https://connector.traffics.de/v3/rest/offers/?*&productType=hotelonly'
      }).as('HotelBeds')
      cy.wait('@HotelBeds', {timeout:30000}).then( offer => {
        console.log('offer',offer);
    
        offer.offerList.forEach(roomElement => {
            const room = roomElement.totalPrice.value
            console.log('room',room);
        });
      })
    
    })
})