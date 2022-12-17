describe('wqw',()=> {

    it('22',()=>{

        cy.viewport(525, 425)
		cy.visit(
			'https://www.travely24.com/de/tours/1414?period=18&adults=2&children&ff=0,1439|0,1439&hid=29248&fa=AYT&sDate=2022-12-02&eDate=2022-12-20&productType=flight&flight=PC5029|PC5030|',
			{ timeout: 60000 }
		);
        cy.wait(2000)
        cy.get('[data-cy="buttonFlightChoose"]',{timeout: 40000}).click({force: true})
            cy.wait(10000)
            cy.get('.otherFlights',{timeout: 40000})
})
})