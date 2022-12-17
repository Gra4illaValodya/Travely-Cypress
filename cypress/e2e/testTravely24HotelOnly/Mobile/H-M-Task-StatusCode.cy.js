
describe('TEST',()=> {


    it('visit',()=> {
        cy.viewport(525,425)
cy.visit('https://www.travely24.com/de/tours/1317?period=1&adults=2&children=3&hid=12378&fa=ORD&sDate=2022-12-10&eDate=2022-12-12&productType=hotelonly&roomType=Z6+U&boardType=OV&PT=hotelonly&ff=0,1439|0,1439',
{timeout:30000})
    })

    it('find button check',()=> {
        cy.viewport(525,425)
        cy.wait(12000)
        cy.intercept({
          method:'GET',
          url: 'https://connector.traffics.de/v3/rest/offers/*?adults=*&optionAlternativeFlightOfferList=true&children=*'
        }).as('verify')
        cy.get('[data-cy="BlueButtonShowCheckMob"]',{timeout:20000}).click({force: true})
       cy.wait(3000)
          cy.wait('@verify',{timeout:25000}).then( element => {
            cy.wait(3000)
            cy.checkTrafficsHotelonlyTotalPriceMOBILE(element.response.body.totalPrice.value ,element.response.body.statusCode)

            
           })
          })
})
