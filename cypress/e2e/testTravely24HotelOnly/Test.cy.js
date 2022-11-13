

describe('dsd',()=> {
    it('wedw',()=>{
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

          cy.wait('@traficsHotelOnly', { timeout: 40000 }).then((hotels) => {
            const b = hotels.response.body.offerList;
    console.log('b',b);

          })
    })
})