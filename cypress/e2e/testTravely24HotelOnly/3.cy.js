it('TEST TOUR AND STATUS OK',()=>{
    cy.visit('https://www.travely24.com/de/tours/1382?period=3&adults=2&children&hid=18101&fa=JFK&sDate=2023-01-13&eDate=2023-01-16&productType=pauschal&roomType=DZ+U&boardType=OV&PT=pauschal&flight=DE2017%3C-LH1006|SN2607-%3EDE2016|'
    ,{timeout:25000})
    cy.intercept({
        method:'GET',
        url:'https://connector.traffics.de/v3/rest/offers/*?adults=2&optionAlternativeFlightOfferList=true'
    }).as('tour')

    //  cy.get('[data-cy="btnShowMoreRooms"]',{timeout:15000}).click({force:true})
    cy.get('.show-more-rooms',{timeout:15000}).click({multiple:true,force:true})
    cy.get('.drop-tour-apartments-content-right > :nth-child(3 ) .btn-blue.add-option',{timeout:15000}).first().click({force:true})
    cy.wait(3000)
    cy.get('.btn-blue.yellow',{timeout:15000}).click({force:true,multiple: true})
    cy.wait(3000) 
    cy.wait('@tour',{timeout:15000}).then(t =>{
        console.log('t',t);
      
        const ok3 = t.response.body.statusCode

        console.log('ok3',ok3);
        expect(ok3).to.have.text('OK')  
    })
})









