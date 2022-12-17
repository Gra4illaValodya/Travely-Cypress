
describe('TEST',()=> {


    it('visit',()=> {
        cy.viewport(1600,1600)
cy.visit('https://www.travely24.com/de/tours/1531?period=1&adults=2&children&ff=0,1439|0,1439&hid=658515&fa=TFS&sDate=2022-11-30&eDate=2022-12-01&productType=hotelonly&roomType=7TOU&boardType=OV&PT=hotelonly&flight=X32119|EW9558|',
{timeout:20000})
    })

    

    it.only('catch API statusCode OK and compare price ',()=>{
          cy.viewport(1600,1600)
cy.visit('https://www.travely24.com/de/tours/1531?period=1&adults=2&children&ff=0,1439|0,1439&hid=658515&fa=TFS&sDate=2022-12-10&eDate=2022-12-12&productType=hotelonly&roomType=7TOU&boardType=OV&PT=hotelonly&flight=X32119|EW9558|',
          {timeout:20000})
          cy.wait(8000)
          cy.intercept({
            method:'GET',
            url: 'https://connector.traffics.de/v3/rest/offers/*?adults=*&optionAlternativeFlightOfferList=true'
          }).as('verify')
cy.wait(8000)
         cy.get('[data-cy="BlueButtonCheck"]',{timeout:20000}).click({force: true})
       
          cy.wait('@verify',{timeout:20000}).then( element => {
            cy.checkTrafficsHotelonlyTotalPrice(element.response.body.totalPrice.value ,element.response.body.statusCode)
          })
            
           })
          })
