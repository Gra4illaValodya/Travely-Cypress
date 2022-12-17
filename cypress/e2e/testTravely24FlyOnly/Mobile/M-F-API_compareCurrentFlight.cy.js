

describe('COMPARE TITLE AER, TIME, PRICE',()=>{


//
 git
 it('compare title aer, ',() => {
    cy.viewport(525, 425);
    cy.visit('https://www.travely24.com/de/tours/1618?period=6&adults=2&children&ff=0,1439|0,1439&hid=24613&fa=ZNZ&sDate=2023-01-18&eDate=2023-01-24&productType=flight&roomType=7AD++U&boardType=OV&PT=pauschal&flight=TC105%3C-QR1499|QR69%3C-QR70-%3EQR1491|',
    {timeout: 30000})

    cy.intercept({
        method: 'GET',
        url: 'https://connector.traffics.de/v3/rest/offers/?productType=flight&**'
         }).as('ProductAPI')
cy.wait(20000)
    cy.wait('@ProductAPI', { timeout: 70000 }).then(list => {
 console.log('list',list);
        const a = list.response.body.offerList;
console.log('a',a);
const depAERFrom = a[0].flightOffer.flight.departureAirport.name
const   depAERto  = a[0].flightOffer.flight.arrivalAirport.name
const   ariAERfrom = a[0].flightOffer.flight.arrivalAirport.name
const   ariAERto   = a[0].flightOffer.flight.departureAirport.name

cy.wait(2000)
        cy.get('[data-cy="firstAirNameFrom"]',{timeout:40000}).then( text => {
            const  aerFromD = text.get(0).innerText
            console.log('aerFrom',aerFromD);
            expect(depAERFrom).to.include(aerFromD)
        })
        cy.wait(2000)
        cy.get('[data-cy="firstAirNameTo"]').then( text => {
            const  aerToD = text.get(0).innerText
            console.log(aerToD);
            expect(depAERto).to.include(aerToD)

        })
        cy.wait(2000)
        cy.get('[data-cy="secondAirNameFrom"]').then( text => {
            const  aerFromA = text.get(0).innerText
            console.log('aerFrom',aerFromA);
            expect(ariAERfrom).to.include(aerFromA)
        })
cy.wait(2000)
        cy.get('[data-cy="secondAirNameTo"]').then( text => {
            const  aerToA = text.get(0).innerText
            console.log('aerFrom',aerToA);
            expect(ariAERto).to.include(aerToA)
        })
       
    });
})
    it('time',()=> {
        cy.viewport(525, 425);
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

    // const   rightElapsedTime  = a[0].flightOffer.flight.inboundEstimatedElapsedTime
    // const   leftElapsedTime  = a[0].flightOffer.flight.outboundEstimatedElapsedTime
 

   console.log('depTimeLeft',depTimeLeft);
   console.log('ariTimeLeft',ariTimeLeft);
   console.log('depTimeRight',depTimeRight);
   console.log('ariTimeRight',ariTimeRight);

//    console.log('rightElapsedTime',rightElapsedTime);
//    console.log('leftElapsedTime',leftElapsedTime);


cy.wait(2000)
            cy.get('[data-cy="firstTimeFrom"]').then( text => {
                const  TimeFromD = text.get(0).innerText
                console.log('TimeFromD',TimeFromD);
                expect(depTimeLeft).to.include(TimeFromD)
            })
            cy.wait(2000)
            cy.get('[data-cy="firstTimeTo"]').then( text => {
                const  TimeToD = text.get(0).innerText
                console.log('TimeToD',TimeToD);
                expect(ariTimeLeft).to.include(TimeToD)
            })
            cy.wait(2000)
            cy.get('[data-cy="secondTimeFrom"]').then( text => {
                const  TimeFromA = text.get(0).innerText
                console.log('TimeFromA',TimeFromA);
                expect(depTimeRight).to.include(TimeFromA)
            })
            cy.wait(2000)
            cy.get('.time-from-to-airport-wrapper [data-cy="secondAirNameTo"]').then( text => {
                const  TimeToA = text.get(0).innerText
                console.log('TimeToA',TimeToA);
                expect(ariTimeRight).to.include(TimeToA)
            })


            // cy.get('[data-cy="firstFromTo"] > .time').then( text => {
            //     const  leftElapsedTime = text.get(1).innerText
            //     console.log('leftElapsedTime',leftElapsedTime);
            //     expect(leftElapsedTime).to.include(leftElapsedTime)
            // })
            // cy.get('[data-cy="secondFromTo"]').then( text => {
            //     const  rightElapsedTime = text.get(1).innerText
            //     console.log('rightElapsedTime',rightElapsedTime);
            //     expect(rightElapsedTime).to.include(rightElapsedTime)
            // })
           
        });
    });
        it('price',()=> {
            cy.viewport(525, 425);
            cy.visit('https://www.travely24.com/de/tours/1549?productType=flight',
            {timeout: 30000})
        
            cy.intercept({
                method: 'GET',
                url: 'https://connector.traffics.de/v3/rest/offers/?productType=flight**'
                 }).as('ProductAPI')
        
            cy.wait('@ProductAPI', { timeout: 60000 }).then(list => {
                const a = list.response.body.offerList;
        const priceFlight = a[0].totalPrice.value
       console.log('priceFlight',priceFlight);
    
       cy.wait(5000)
                cy.get('[data-cy="totalCount"]').then( text => {
                    const  price = text.get(0).innerText
                    console.log('price',price);
                    expect( priceFlight + ' €').to.include(price)
                })
             
            });
       
   
   
 }) // last it
}) // context
//}) //describe