

//DOTN WORK BECAUSE IT IS NOT FIXED

 it('TEST ROOM MUWST TO HAVE FIRST PLACE IN ACCORDEON',()=>{
    cy.visit(
        "https://www.travely24.com/de/tours/1382?period=3&adults=2&children&hid=18101&fa=JFK&sDate=2023-01-09&eDate=2023-01-12&productType=hotelonly&roomType=DZ+U&boardType=OV&PT=pauschal&flight=AA6932%3C-BA2738|AA6760-%3EAA6938|",
        { timeout: 30000 }
)
        cy.get('[data-cy="btnShowMoreRooms"]',{timeout:15000}).click({force:true})
        cy.get('.show-more-rooms').click({multiple:true,force:true})

        cy.get('.drop-tour-apartments-content-right > :nth-child(3) .btn-blue.add-option',{timeout:15000}).then(el => {
            expect(el).to.have.attr('class', 'btn-blue add-option active')
        })
    

    })