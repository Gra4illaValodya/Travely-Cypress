describe('Get API аер, traffics , Kiwi and find low-cost',()=> {
let total = 0
let lowTotalPriceProduct = 9999
let lowTotalPriceAER_1 = 9999
let lowTotalPriceAER_2 = 9999
let lowTotalPriceAER_3 = 9999
let lowTotalPriceAER_4 = 9999
let lowTotalPriceAER_5 = 9999




    it('Catch Api AER and PRODUCT',()=>{
        cy.visit('https://www.travely24.com/de/tours/1549?productType=flight',
        {timeout: 15000})

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



            cy.wait('@AER_1',{timeout:30000}).then( list => {
               
                const a = JSON.parse(list.response.body.trim())
               const aer_1 = a.availableFareList
               aer_1.forEach(element => {
              const count =  element.passengerTypeFareList[0].count 
              const price = element.passengerTypeFareList[0].priceList * count
              lowTotalPriceAER_1 = lowTotalPriceAER_1 > price ? price : lowTotalPriceAER_1
              console.log('lowTotalPriceAER_1',lowTotalPriceAER_1);
               });
            })

            cy.wait('@AER_2',{timeout:30000}).then( list => {
               
                const a = JSON.parse(list.response.body.trim())
               const aer_2 = a.availableFareList
               aer_2.forEach(element => {
              const count =  element.passengerTypeFareList[0].count 
              const price = element.passengerTypeFareList[0].priceList * count
              lowTotalPriceAER_2 = lowTotalPriceAER_2 > price ? price : lowTotalPriceAER_2
              console.log('lowTotalPriceAER_2',lowTotalPriceAER_2);

               });
            })

            cy.wait('@AER_3',{timeout:30000}).then( list => {

                const a = JSON.parse(list.response.body.trim())
               const aer_3 = a.availableFareList
               aer_3.forEach(element => {
              const count =  element.passengerTypeFareList[0].count 
              const price = element.passengerTypeFareList[0].priceList * count
              lowTotalPriceAER_3 = lowTotalPriceAER_3 > price ? price : lowTotalPriceAER_3
              console.log('lowTotalPriceAER_3',lowTotalPriceAER_3);

               });
            })

            cy.wait('@AER_4',{timeout:30000}).then( list => {
               
                const a = JSON.parse(list.response.body.trim())
               const aer_4 = a.availableFareList
               aer_4.forEach(element => {
              const count =  element.passengerTypeFareList[0].count 
              const price = element.passengerTypeFareList[0].priceList * count
              lowTotalPriceAER_4 = lowTotalPriceAER_4 > price ? price : lowTotalPriceAER_4

              console.log('lowTotalPriceAER_4',lowTotalPriceAER_4);
               });
            })

            cy.wait('@AER_5',{timeout:30000}).then( list => {
               
                const a = JSON.parse(list.response.body.trim())
               const aer_5 = a.availableFareList
               aer_5.forEach(element => {
              const count =  element.passengerTypeFareList[0].count 
              const price = element.passengerTypeFareList[0].priceList * count
              lowTotalPriceAER_5 = lowTotalPriceAER_5 > price ? price : lowTotalPriceAER_5
              console.log('lowTotalPriceAER_5',lowTotalPriceAER_5);
               });
            })

            cy.wait('@ProductAPI').then( lowCostProduct => {
            total = Math.min(lowTotalPriceProduct, lowTotalPriceAER_1,lowTotalPriceAER_2,lowTotalPriceAER_3,lowTotalPriceAER_4,lowTotalPriceAER_5);
            console.log('total',total);
           const oneOffer = lowCostProduct.response.body.offerList
           oneOffer.forEach( offer => {
           const price = offer.totalPrice.value
           lowTotalPriceProduct = lowTotalPriceProduct > price ? price : lowTotalPriceProduct
           console.log('lowTotalPriceProduct',lowTotalPriceProduct);
           });
           console.log('total',total);
        })
        
    })

    it('compare total price in the checkout block and fly block',()=> {
        cy.get('[data-cy="totalCount"]',{timeout: 30000}).then( text => {
            const priceInSite = text.get(0).innerText
            console.log('price in Site',priceInSite);
            expect(total + ' €').to.include(priceInSite)
        })
        cy.get('.flight-price',{timeout: 30000}).then( text => {
            const priceInFlyBlock = text.get(0).innerText
            console.log('price in Fly Block',priceInFlyBlock);
            expect(total + ' €').to.include (priceInFlyBlock)
        })
    })

  })