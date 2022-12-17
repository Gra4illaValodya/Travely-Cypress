
export const HOTEL_BEDS = 
    
    it('HotelBeds ',()=> {

       
            cy.intercept({
                method: 'GET',
                url: '**/offers/?navigation=1%2C1000%2C1&giataIdList=*&searchDate=*&fromDate=*&toDate=*&duration=*&adults=*&optionLists=roomId,roomType&tourOperatorList=*&dontDecorate=true&productType=hotelonly',
            }).as('traficsHotelOnly');
            cy.wait('@traficsHotelOnly',{timeout:20000}).then(product => {
                console.log('product',product.response);
            })
        })
        export const TRAFICS_HOTEL_ONLY = it('traficsHotelOnly ',()=> {
            cy.visit(
                "https://www.travely24.com/de/tours/1382?period=3&adults=2&children&hid=18101&fa=JFK&sDate=2023-01-09&eDate=2023-01-12&productType=hotelonly&roomType=DZ+U&boardType=OV&PT=pauschal&flight=AA6932%3C-BA2738|AA6760-%3EAA6938|",
                { timeout: 30000 }
              );
              cy.intercept({
                    method: 'GET',
                    url: '**/offers/?navigation=1%2C1000%2C1&giataIdList=*&searchDate=*&fromDate=*&toDate=*&duration=*&adults=*&optionLists=roomId,roomType&tourOperatorList=*&dontDecorate=true&productType=hotelonly',
                  }).as('traficsHotelOnly');
                    cy.wait('@traficsHotelOnly',{timeout:20000}).then(product => {
                      cy.checkTrafficsHotelonlyRooms(product.response.offerList)
                      
                    })
        })
