describe('VISIT , TITLE HOTEL NAME', ()=> {
    it('visit',()=>{
        cy.viewport(525,425)
        cy.visit('https://www.travely24.com/de/tours/1317?period=1&adults=2&children&ff=0,1439|0,1439&hid=24276&fa=ORD&sDate=2022-12-10&eDate=2022-12-11&productType=hotelonly&roomType=DBL.CV-KG&boardType=RO&PT=hotelonly',
        {timeout:40000})
    })
          it('title hotel name', ()=> {
            cy.viewport(525,425)
           cy.wait(3000)
            cy.intercept({
              method: 'GET',
              url:
             'https://www.travely24.com/api/?r=hb&hotels=1&**'
          }).as('titleName')
          cy.wait(3000)
            cy.wait('@titleName', { timeout: 40000 }).then( dataName => {
                console.log('dataName',dataName);
            let a =  JSON.parse(dataName.response.body.trim());
            console.log(a);
            console.log(a.hotels.hotels[0].name);
            // console.log(a.hotels.name);
           const  titleName = a.hotels.hotels[0].name
            
            console.log('titleName in ',titleName);
           
           cy.get('.title-name-hotelname',{timeout:20000}).then( hotelNameText => {
            const hotelName = hotelNameText.get(0).innerText
            expect(hotelName).to.include(titleName)
           })
    
        })
          })
              
    })