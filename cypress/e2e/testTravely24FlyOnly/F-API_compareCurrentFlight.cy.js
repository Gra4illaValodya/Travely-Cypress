

describe('FUNC',()=>{
    it('Catch Api AER and PRODUCT',()=>{
        cy.viewport(1600, 1200);
        cy.visit('https://www.travely24.com/de/tours/1618?period=6&adults=2&children&ff=0,1439|0,1439&hid=24613&fa=ZNZ&sDate=2023-01-18&eDate=2023-01-24&productType=flight&roomType=7AD++U&boardType=OV&PT=pauschal&flight=TC105%3C-QR1499|QR69%3C-QR70-%3EQR1491|',
        {timeout: 30000})

             cy.intercept({
            method: 'GET',
            url: 'https://connector.traffics.de/v3/rest/offers/?productType=flight**'
             }).as('ProductAPI')
     
            cy.intercept({
                method: 'GET',
                url: `https://www.travely24.com/api/?r=aer&*&stype=1`
            }).as('AER_1')

            cy.intercept({
                method: 'GET',
                url: `https://www.travely24.com/api/?r=aer&*&stype=2`
            }).as('AER_2')

            cy.intercept({
                method: 'GET',
                url: `https://www.travely24.com/api/?r=aer&*&stype=3`
            }).as('AER_3')

            cy.intercept({
                method: 'GET',
                url: `https://www.travely24.com/api/?r=aer&*&stype=4`
            }).as('AER_4')

            cy.intercept({
                method: 'GET',
                url: `https://www.travely24.com/api/?r=aer&*&stype=5`
            }).as('AER_5')   
})

context('COMPARE TITLE AER, TIME, PRICE' , ()=>{


 it('compare title aer, ',() => {
    cy.viewport(1600, 1200);
 
   

    cy.intercept({
        method: 'GET',
        url: 'https://connector.traffics.de/v3/rest/offers/?productType=flight**'
         }).as('ProductAPI')

    cy.wait('@ProductAPI', { timeout: 60000 }).then(list => {
 
        const a = list.response.body.offerList;

const depAERFrom = a[0].flightOffer.flight.departureAirport.name
const   depAERto  = a[0].flightOffer.flight.arrivalAirport.name
const   ariAERfrom = a[0].flightOffer.flight.arrivalAirport.name
const   ariAERto   = a[0].flightOffer.flight.departureAirport.name


        cy.get('[data-cy="leftFrom"]',{ timeout: 30000 }).then( text => {
            const  aerFromD = text.get(0).innerText
            console.log('aerFrom',aerFromD);
            expect(depAERFrom).to.include(aerFromD)
        })
        
        cy.get('[data-cy="leftTo"]').then( text => {
            const  aerToD = text.get(0).innerText
            console.log(aerToD);
            expect(aerToD).to.include(depAERto)

        })

        cy.get('[data-cy="rightFrom"]').then( text => {
            const  aerFromA = text.get(0).innerText
            console.log('aerFrom',aerFromA);
            expect(aerFromA).to.include(ariAERfrom)
        })

        cy.get('[data-cy="rightTo"]').then( text => {
            const  aerToA = text.get(0).innerText
            console.log('aerFrom',aerToA);
            expect(ariAERto).to.include(aerToA)
        })
       
    });
})
    it('time',()=> {
        cy.visit('https://www.travely24.com/de/tours/1549?productType=flight',
        {timeout: 30000})
    
        cy.intercept({
            method: 'GET',
            url: 'https://connector.traffics.de/v3/rest/offers/?productType=flight**'
             }).as('ProductAPI')
    
        cy.wait('@ProductAPI', { timeout: 60000 }).then(list => {
     
            const a = list.response.body.offerList;
    
    const   depTimeLeft = a[0].flightOffer.flight.outbound.legList[0].departureTime
    const   ariTimeLeft  = a[0].flightOffer.flight.outboundLegList[0].arrivalTime
    const   depTimeRight = a[0].flightOffer.flight.inboundLegList[0].departureTime
    const   ariTimeRight  = a[0].flightOffer.flight.inboundLegList[0].arrivalTime

    const   rightElapsedTimeAPI  = a[0].flightOffer.flight.inboundEstimatedElapsedTime
    const   leftElapsedTimeAPI  = a[0].flightOffer.flight.outboundEstimatedElapsedTime
 

   console.log('depTimeLeft',depTimeLeft);
   console.log('ariTimeLeft',ariTimeLeft);
   console.log('depTimeRight',depTimeRight);
   console.log('ariTimeRight',ariTimeRight);

   console.log('rightElapsedTime',rightElapsedTimeAPI);
   console.log('leftElapsedTime',leftElapsedTimeAPI);



            cy.get('#currentFlight [data-cy="leftTimeFrom"]',{timeout:20000}).then( text => {
                const  TimeFromD = text.get(0).innerText
                console.log('TimeFromD',TimeFromD);
                expect(depTimeLeft).to.include(TimeFromD)
            })
            
            cy.get('#currentFlight [data-cy="leftTimeTo"]').then( text => {
                const  TimeToD = text.get(0).innerText
                console.log('TimeToD',TimeToD);
                expect(ariTimeLeft).to.include(TimeToD)
            })
    
            cy.get('#currentFlight [data-cy="rightTimeFrom"]').then( text => {
                const  TimeFromA = text.get(0).innerText
                console.log('TimeFrom',TimeFromA);
                expect(depTimeRight).to.include(TimeFromA)
            })
    
            cy.get('#currentFlight [data-cy="rightTimeTo"]').then( text => {
                const  TimeToA = text.get(0).innerText
                console.log('aerFrom',TimeToA);
                expect(ariTimeRight).to.include(TimeToA)
            })


            cy.get('#currentFlight [data-cy="leftElapsedTime"]').then( text => {
                const  leftElapsedTime = text.get(0).innerText
                console.log('leftElapsedTime',leftElapsedTime);
                expect(leftElapsedTimeAPI).to.include(leftElapsedTime)
            })
            cy.get('#currentFlight [data-cy="rightElapsedTime"]').then( text => {
                const  rightElapsedTime = text.get(0).innerText
                console.log('rightElapsedTime',rightElapsedTime);
                expect(rightElapsedTimeAPI).to.include(rightElapsedTime)
            })
           
        });
    });
        it('price',()=> {
            cy.visit('https://www.travely24.com/de/tours/1549?productType=flight',
            {timeout: 30000})
        
            cy.intercept({
                method: 'GET',
                url: 'https://connector.traffics.de/v3/rest/offers/?productType=flight**'
                 }).as('ProductAPI')

                 cy.intercept({
                    method: 'GET',
                    url: 'https://www.travely24.com/api/?r=aer&search=1&from=FRA&to=CUN&dateFrom=2022-12-22&dateTo=2022-12-23&direct=0&cabinClassBusiness=0&adults=2&stype=3'
                     }).as('AER_3')
    
           
        
            cy.wait('@AER_3', { timeout: 60000 }).then(list => {
                const a = list.response.body.availableFareList[0].passengerTypeFareList[0];
                const personCount = a.count
        const   priceFlight = a.priceList * personCount 
       console.log('priceFlight',priceFlight);
       
    
                cy.get('#currentFlight .flight-price',{timeout:10000}).then( text => {
                    const  price = text.get(0).innerText
                    console.log('price',price);
                    expect( priceFlight + ' €').to.include(price )
                })
             
            });
       
   
   
 }) // last it
}) // context
}) //describe