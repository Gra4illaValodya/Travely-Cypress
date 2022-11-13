
describe('Mobile testing ,HOTELONLY',() => {
 
    it.only('VISIT SITE', ()=> {
        cy.viewport(1600, 1600);
        cy.visit('https://www.travely24.com/de/tours/1414?period=3&adults=2&children&hid=29248&fa=PMI&sDate=2022-11-04&eDate=2022-11-07&productType=hotelonly&roomType=DZZF&boardType=UF&PT=hotelonly&flight=IB3917|U21513|',{timeout:20000})
cy.wait(5000)
        cy.get('.btn-blue.add-option.active').click({force:true,multiple: true})

    })

    it('CHECKBOX ONLYHOTEL',() => {
        cy.viewport(525, 425);
        cy.get('#block-stay [type="checkbox"]',{timeout:10000}).should('be.checked')
        cy.get('#block-flight [type="checkbox"]',{timeout:10000}).should('be.not.checked')
    })
    it('CHANGE ROOM',() => {
        cy.viewport(525, 425);
      cy.get('#block-stay ',{timeout:20000}).contains('Wählen ').click()
    //   cy.contains('Wählen ').click({force:true })
     cy.contains('Zimmer wählen').click({force: true})
     cy.get('.block-options-room-mobile-wrapper > .block-option-room > .block-contents-wrapper').first()
     cy.get('.btn-blue.add-option').first().click({force: true})
        cy.get('.name-room').should('have.text','Doppelzimmer Balkon/Ter')
    })
    
    it('ADD ADULT AND CHANGE ROOM',()=>{
            
    })
})