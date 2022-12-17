describe('choose flight and it should be show in a closed accordion',()=> {

    it('find fly block with id=currentFlight',()=>{

cy.visit('https://www.travely24.com/de/tours/1592?period=1&adults=2&children&ff=0,1439|0,1439&hid=247620&fa=CUN&sDate=2022-12-06&eDate=2022-12-07&productType=flight&flight=DE2117|DE2114|',{timeout:30000})
        cy.get('.block-fly-content',{timeout:30000}).then( id =>{
            cy.wrap(id).invoke('attr','id').should('equal','currentFlight')
        })
    })
    it('click button and open accordion',()=> {
cy.wait(6000)
        cy.get('[data-cy="btnShowMoreFlight"]',{timeout:30000}).click( {force: true})
        cy.get('.popup.drop-tour-form-fly.active').then ( id => {
            cy.wrap(id).invoke('attr','id').should('equal','form-fly-dropdown')
        })
        cy.get('#drop-tour-form-fly-list-ticket-id #showedOtherFlights1 #btnOtherFlights1').click({force: true})

        cy.get('.block-fly-content',{timeout:30000}).then( id =>{
            cy.wrap(id).invoke('attr','id').should('not.equal','form-fly-dropdown')
            cy.wrap(id).invoke('attr','id').should('equal','currentFlight')
        })
    })
})