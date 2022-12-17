it('TEST COMPARE PRICE ROOM AND PRICE SITE',() => {

    cy.visit(
        "https://www.travely24.com/de/tours/1382?period=3&adults=2&children&hid=18101&fa=JFK&sDate=2023-01-09&eDate=2023-01-12&productType=hotelonly&roomType=DZ+U&boardType=OV&PT=pauschal&flight=AA6932%3C-BA2738|AA6760-%3EAA6938|",
        { timeout: 30000 }
      );
      cy.get('[data-cy="btnShowMoreRooms"]',{timeout:15000}).click({force:true})
      cy.get('.show-more-rooms').click({multiple:true,force:true})
      cy.get('.btn-blue.add-option.active',{timeout:15000}).parents().then(price => {
        const text = price.get(0).innerText.split(' ')
        console.log('text',text);
        let b = text[0].split(' ').join('').slice(-0,3)
        console.log(b)
        b = b + ' €' 
        cy.get('[data-cy="totalCount"]',{timeout:15000}).should('include.contain',b)
})
    cy.get('.drop-tour-apartments-content-right > :nth-child(5) .btn-blue.add-option',{timeout:15000}).first().click({force:true})
     
    cy.wait(5000)
      cy.get('.btn-blue.add-option.active',{timeout:15000}).parents().then(price => {
        const text = price.get(0).innerText.split(' ')
        console.log('text',text);
        let b = text[0].split(' ').join('').slice(-0,3)
        console.log(b)
        b = b + ' €' 
        cy.get('[data-cy="totalCount"]',{timeout:15000}).should('include.contain',b)
    })
})