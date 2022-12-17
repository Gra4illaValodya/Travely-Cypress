// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('checkTrafficsHotelonlyTotalPriceMOBILE',  (totalPrice,status) => {
	const totalPriceRoom = totalPrice
	if(status === 'OK'){
		expect(status).to.include('OK');
		console.log("IS OKAY look down totalValue and room prise value ");
		cy.wait(3000)
cy.get('[data-cy="totalCount"]',{timeout:15000}).then(totalInSite => {
		const totalSite = parseInt(totalInSite.get(0).innerText)
	console.log('totalPriceRoom Price',totalSite);
	console.log('totalPriceRoom',totalPriceRoom);
	expect(totalPriceRoom).to.have.contains(totalSite) 
	cy.get('[data-cy="BlueButtonShowCheckMob"]',{timeout:20000}).click({force: true})
	cy.wait(2000)
	cy.get('[data-cy="BlueButtonShowCheckMob"]',{timeout:20000}).click({force: true})
	
	cy.url().should('eq','https://www.travely24.com/de/tours/1317/booking?activeStep=1')
})
	}
	else if (status === 'XX'){
		expect(status).to.include('XX');
		cy.get('[data-cy="BlueButtonShowCheckMob"]',{timeout:20000}).invoke('attr','class').should('include','btn-blue disabled')
		console.log("SORRY YOU CAN NOT GO NEXT");

	}
})
Cypress.Commands.add('checkTrafficsHotelonlyTotalPrice',  (totalPrice,status) => {
	const totalPriceRoom = totalPrice
	if(status === 'OK'){
		expect(status).to.include('OK');
		console.log("IS OKAY look down totalValue and room prise value ");
		
cy.get('[data-cy="totalCount"]',{timeout:15000}).then(totalInSite => {
		const totalSite = parseInt(totalInSite.get(0).innerText)
	console.log('totalPriceRoom Price',totalSite);
	console.log('totalPriceRoom',totalPriceRoom);
	expect(totalPriceRoom).to.have.contains(totalSite) 
	cy.get('[data-cy="BlueButtonCheck"]',{timeout:20000}).click({force: true})
	cy.wait(2000)
	cy.get('[data-cy="BlueButtonCheck"]',{timeout:20000}).click({force: true})
	
	cy.url().should('eq','https://www.travely24.com/de/tours/1510/booking?activeStep=1')
})
	}
	else if (status === 'XX'){
		expect(status).to.include('XX');
		cy.get('[data-cy="BlueButtonCheck"]',{timeout:20000}).invoke('attr','class').should('include','btn-blue disabled')
		console.log("SORRY YOU CAN NOT GO NEXT");

	}
})



Cypress.Commands.add('login', (email, pw) => {
    console.log('email',email);
    console.log('pw',pw);
})
 
Cypress.Commands.add('checkTrafficsHotelonlyRooms', (rooms) => {
  let status = true 

  cy.get('[data-cy="btnShowMoreRooms"]',{timeout:15000}).click({force:true})
  cy.get('.show-more-rooms').click({multiple:true,force:true})
  let existingHotelonly = {}
				const filteredAllHotelonly = rooms.filter(el => {
					let roomOriginalCode = el.hotelOffer.roomType.originalCode
					let roomServiceOffer =
						el.serviceOffer && el.serviceOffer.code ? el.serviceOffer.code : ''
					let roomTransferOffer =
						el.transferOffer && el.transferOffer.code ? el.transferOffer.code : ''
					if (
						typeof existingHotelonly[
							roomOriginalCode + roomServiceOffer + roomTransferOffer
						] == 'undefined'
					) {
						existingHotelonly[
							roomOriginalCode + roomServiceOffer + roomTransferOffer
						] = 1  
						return true
					} else {
						return false
					}
				})
                console.log('filteredAllHotelonly',filteredAllHotelonly);
        filteredAllHotelonly.forEach(element => {
       
//  cy.get('.roomTypes-wrapper:not(.pauschal) .room-wrapper').find('.roomName').contains(element.hotelOffer.roomType.originalName)
 cy.get('.roomTypes-wrapper:not(.pauschal) .room-wrapper').find('.option-price').contains(element.totalPrice.value)

    });
    return undefined
  
})
