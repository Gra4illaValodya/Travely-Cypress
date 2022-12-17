
describe('TEST',()=> {

    it('visit',()=> {
        cy.viewport(1600,1600)
    
cy.visit('https://www.travely24.com/de/tours/1393?period=2&adults=2&children&ff=0,1439|0,1439&hid=62836&fa=VRN&sDate=2023-01-08&eDate=2023-01-10&productType=flight&roomType=DF1F&boardType=UF&PT=hotelonly&flight=LH9507|LH9506|',
{timeout:20000})
    })
    
   it('find button check',()=> {
         cy.viewport(1600,1600)
        cy.wait(20000)
         cy.get('.btns-wrapper',{timeout:30000}).click({force: true})
         cy.intercept({
            method:'GET',
            url: 'https://www.travely24.com/api/?r=aer&verify=1&fareId=*&stype=2&itineraryIdList1=*d&itineraryIdList2=*'
          }).as('verifyFlyonly')
          cy.wait('@verifyFlyonly',{timeout:25000}).then( element => {
            console.log('element',element);
          })
    })


//     it('catch API statusCode OK and compare price ',()=>{
//           cy.viewport(1600,1600)
         
         
//         //     const total = element.response.body.fare.passengerTypeFareList[0].priceList * element.response.body.fare.passengerTypeFareList[0].count
//         //   console.log('total',total);
//         //     if(element.response.body.statusCode) {
//         //         expect(element.response.body.statusCode).to.include('OK');
//         //         console.log("YES YOU GO CAN GO NEXT");
               
         
//         //     } else {
//         //         expect(element.response.body.statusCode).to.include('XX');
//         //         console.log("SORRY YOU CAN NOT GO NEXT");
//         //     }
             
//         //      cy.get('.flight-price',{timeout:15000}).then(totalInSite => {
             
//         //     const totalSite = parseInt(totalInSite.get(0).innerText)
//         //     console.log('totalSite',totalSite);
//         //     expect(total).to.have.contains(totalSite)
         
     
//         //    })
//         //    })

// })

})