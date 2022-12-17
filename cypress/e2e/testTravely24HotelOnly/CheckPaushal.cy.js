
describe('TEST',()=> {

    it('visit',()=> {
        cy.viewport(1600,1600)
    
        
cy.visit('https://www.travely24.com/de/tours/1510?hid=1022350&period=2&adults=2&children&fa=MAD&sDate=2023-01-15&eDate=2023-01-17&productType=hotelonly&roomType=CFX++G&boardType=UF&PT=hotelonly&flight=UX1515|UX1516|',
{timeout:20000})

cy.wait(15000)
    })
it('Click',()=>{
cy.viewport(1600,1600)
cy.get('.btns-wrapper',{timeout:30000}).click({force:true})
})

it('2',()=>{
    cy.viewport(1600,1600)
    cy.get('.block-option-room.pauschal',{timeout : 30000}).click()
    cy.get('.btn-blue.add-option.active',{timeout:30000})
})
})    