


let hotelDescribe = "Dieses komfortable Hotel liegt in Soller. Das Hotel umfasst insgesamt 25 Zimmer. Zusätzlich bietet die Einrichtung einen Wi-Fi-Internetzugang. Ca'l Bisbe bietet eine 24h-Rezeption, so dass auf die Anliegen der Gäste jederzeit eingegangen wird. Ca'l Bisbe bietet auch auf Anfrage keine Kinderbetten."



describe('Test API',()=>{
    it('TEST API TITLE', () => {
        cy.viewport(1900, 2200)
       
        cy.visit('https://www.travely24.com/de/tours/1414?hid=29248&period=2&adults=2&children&fa=PMI&sDate=2022-11-05&eDate=2022-11-07&productType=hotelonly&roomType=DBT.BL&boardType=BB&PT=hotelonly&flight=EW583|EW582|',{timeout:15000})
      cy.intercept({
        method : 'GET',
        url: ' https://www.travely24.com/api/?r=hb&hotels=1&hid=29248&hotelDetails=1'
      }).as('getDescription')
      cy.wait('@getDescription',{timeout:15000})
      .then( description => {
     console.log('description.response.body.hotel ' , description);    
    let improvedApi = JSON.parse(description.response.body.trim())
    console.log(improvedApi.hotel.description.content);
      })
      cy.get('.block-single-content-text-block').should('contain.text',hotelDescribe)
    })    
})