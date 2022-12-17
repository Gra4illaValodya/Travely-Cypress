



describe('Test API',()=>{
    it('TEST API cancelation', () => {
        cy.viewport(1900, 2200)
        cy.intercept({
            method: 'GET',
            url :'https://www.travely24.com/api/?r=hb&hotels=1&hid=29248&hotelDetails=0&period=2&startDate=1667606400&adults=2&children=0'
          }).as('getPopapPrice')
          cy.wait('@getPopapPrice',{timeout:16000}).then(onePopap => {
            console.log('onePopap.innerText,onePopap.innerText');
          })
             cy.contains('Alle Zimmerangebote zeigen ',{timeout : 15000}).click({force:true})
           cy.get('.drop-tour-apartments-content-right  .collapseCategory',{timeout: 10000}).click({force:true ,  multiple: true })
            cy.get('.cancellation').first().trigger('mouseover',{force: true})
            cy.get('.popper > div > span').each(element => {
              const price = element[0].firstChild.innerHTML
              const textPopap = element[0].outerText
              console.log('price',price)
              console.log('textPopap',textPopap)
              expect(textPopap).to.include(price)    
    })    
})
})