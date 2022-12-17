
describe('TEST',() =>{

    it('visit',()=>{
        cy.visit(
               "https://www.travely24.com/de/tours/1382?period=3&adults=2&children&hid=18101&fa=JFK&sDate=2023-01-09&eDate=2023-01-12&productType=hotelonly&roomType=DZ+U&boardType=OV&PT=pauschal&flight=AA6932%3C-BA2738|AA6760-%3EAA6938|",
               { timeout: 30000 }
             );
       cy.url().then( el => {
        console.log(el);
       })
     
   })
})