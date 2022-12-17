

describe('Compare aer map',()=> {

    it('visit',()=> {
        cy.viewport(625, 625);

        cy.visit('https://www.travely24.com/de/tours/1509?hid=21543&period=8&adults=2&children&fa=DPS&ff=0,1439|0,1439&sDate=2023-01-24&eDate=2023-02-01&productType=flight&roomType=DXAF&boardType=UF&PT=hotelonly&flight=QR963%3C-QR69|QR72-%3EQR960|',
        {timeout:1000000})
    })
    
    it('find aer',()=>{
      
        cy.viewport(625, 625);
        cy.intercept({
            method: 'GET',
            url: `https://www.travely24.com/api/?r=aer&*&stype=1`
        }).as('AER_1')
        cy.wait('@AER_1', {timeout:60000})
      
cy.get('[data-cy="mapArrivalAirport"]', {timeout:1000000}).then( element  => {
  

    const aerCodeFromMap = JSON.parse(element.get(0).innerText)
   
    // console.log('parse',parsee);
    // const stringifyObj = JSON.parse(parsee.get(0).trim())
    // console.log('stringifyObj',stringifyObj);
 cy.get('[data-cy="buttonFlightChoose"]').click()
 cy.wait(8000)
            cy.get('#showedOtherFlights0 [data-cy="firstArrivalAir"]', {timeout:100000}).then( aer =>{
                const aerCode = aer.get(0).innerText.trim()
                console.log('aerCode',aerCode);
                expect(aerCodeFromMap.code).to.include(aerCode)
                })
             })
    })
})

