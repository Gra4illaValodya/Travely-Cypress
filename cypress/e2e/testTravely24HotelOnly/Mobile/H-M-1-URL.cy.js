
import { verifyDateFunction } from '../../../customFunction/date';
import {
    FROM_DATE_DEFAULT,
    TO_DATE_DEFAULT,
    CHILDREN_DEFAULT,
    ADULTS_DEFAULT,
    PRODUCT_TYPE_HOTEL,
  } from '../../../constants/main';



describe('MOBILE HOTEL ONLY',()=> {
  const sizeAdultsUrl = Number(ADULTS_DEFAULT);
    it('Visit travely24',()=> {
      cy.viewport(525,425)
        cy.visit('https://www.travely24.com/de/tours/1317?period=4&adults=2&children=3,11&hid=24276&fa=ORD&sDate=2022-11-15&eDate=2022-11-17&productType=hotelonly&roomType=QUA.2D-CV&boardType=RO&PT=hotelonly',{timeout:50000})
    })

    context('CHECKED',()=>{
        
        it('Test no checked FLY',()=>{
            cy.viewport(525,425)
            // cy.visit( customURLHotelOnly({}),{timeout:10000})
      cy.get('#withFlight',{timeout:10000})
      .should( PRODUCT_TYPE_HOTEL === 'hotelonly' ? 'be.checked' :'not.be.checked')
          })

        it('Test checked HOTEL',()=>{
            cy.viewport(525,425)
      cy.get('#withRoom',{timeout:10000})
      .should( PRODUCT_TYPE_HOTEL === 'hotelonly' ? 'be.checked' :'not.be.checked')
          })
      
        });



 context('CALENDAR AND PEOPLE', () => {
          
            it('Test number of adult from URL and adult in the site', () => {
             cy.viewport(525,425) 
           
              
              cy.get('[data-cy="adultsCount"]', {
                timeout: 100000,
              })
  .then((text) => {
    console.log('text',text);
    const countAdult = text.get(0).innerText
    console.log('countAdult',countAdult);
    expect(countAdult).to.eq(ADULTS_DEFAULT)
}) 
});


it('Test number of CHILDREN from URL and CHILDREN in the site', () => {
    cy.viewport(525,425)
    // cy.visit(customURLHotelOnly({}));
    cy.get('[data-cy="childrensCount"]', {
      timeout: 100000,
    })
.then((text) => {
console.log('text',text);
const childenInSite = Number(text.get(0).innerText)

const childrensCount = CHILDREN_DEFAULT.split(',').length
console.log('childrensCount',childrensCount);
expect(childenInSite).to.eq(childrensCount)
})
})

it('Test number of PEOPLE from URL and PEOPLE in the site', () => {
  cy.viewport(525,425)
    cy.visit('https://www.travely24.com/de/tours/1317?period=1&adults=2&children=11,12&hid=24276&fa=ORD&sDate=2022-12-16&eDate=2022-12-17&productType=hotelonly&roomType=DBL.CV-KG&boardType=RO&PT=hotelonly&ff=0,1439|0,1439', 
    {timeout:20000});
  cy.wait(9000)
    cy.get('.group-elements [data-cy="peopleInSite"]', {
      timeout: 100000
    }).then(text => {
  cy.wait(2000)
console.log('text',text);

const text1 = text.get(0).innerText
console.log('text[1]',text1);
const children = CHILDREN_DEFAULT.split(',').length
const adult = Number(ADULTS_DEFAULT)
const people = children + adult
expect(text1).to.include(people)

})
})

it('delete child in site',()=>{
  cy.viewport(525,425)
  // cy.visit(customURLHotelOnly({}),{timeout:10000});
  cy.get('[data-cy="buttonCalendarChoose"]', {
    timeout: 100000,
  }).click()
  cy.wait(4000)
  CHILDREN_DEFAULT.split(',').forEach( item => {
    cy.get('[data-cy="block-plus-minus_minus_child"]',{timeout:10000}).click({force: true}) 
  })
  cy.get('[data-cy="block-plus-minus_count_child"]',{timeout:10000}).then( count => {
    const countChild = count.get(0).innerText 
    console.log('countChild',countChild);
    expect(countChild).to.include(0)
  })

})
it('delete adult in site',()=>{
  cy.viewport(525,425)
  // cy.visit(customURLHotelOnly({}),{timeout:10000});
  cy.get('[data-cy="buttonCalendarChoose"]', {
    timeout: 100000,
  }).click({force: true})
  cy.wait(4000)

    cy.get('[data-cy="block-plus-minus_minus_adult"]',{timeout:10000}).then(textSizeAdults => {
      console.log('textSizeAdults',textSizeAdults);
      const sizeAdultsUrl = textSizeAdults.get(0).innerText
      console.log('sizeAdultsUrl',sizeAdultsUrl);
    })
    .click({force: true}) 
    .click({force: true}) 
  cy.get('[data-cy="block-plus-minus_count_adult"]',{timeout:10000}).then( count => {
    const countAdult = count.get(0).innerText 
    console.log('countAdult',countAdult);
    expect(countAdult).to.include(0)
  })

})


it('test text date in calendar',()=>{
    cy.viewport(525,425)
    cy.visit('https://www.travely24.com/de/tours/777?hid=114091&productType=hotelonly&period=1&adults=2&children&ff=0,1439|0,1439&fa=EWR&sDate=2022-12-19&eDate=2022-12-20&roomType=DXAU&boardType=OV&PT=hotelonly', 
    {timeout:10000});
 
    cy.intercept({
      method:'GET',
      url: 'https://www.travely24.com/api/?r=hb&hotels=1&hid=114091&hotelDetails=0&period=1&startDate=2022-12-19&adults=2&children=0'
    }).as('date')
    cy.wait('@date',{timeout:20000}).then( text => {
      let a = JSON.parse(text.response.body.trim());
      console.log(a);
      console.log(a.hotels.checkIn);
      console.log(a.hotels.checkOut);

    cy.wait(2000)
  cy.get('[data-cy="calendarDateFromTo"] > .block-subtitle-content-item',{timeout:10000}).then(text => {
    console.log('text',text);
  const innerText = text.get(0).innerText.split('-')
  console.log('innerText',innerText);
  const [dateFrom , dateTo] = innerText
 
  cy.wait(2000)
  console.log('dateTo',dateTo);
  console.log('dateFrom',dateFrom);
  expect(dateFrom).to.include(verifyDateFunction(a.hotels.checkIn).replaceAll('.','').replace('z','c'))
  expect(dateTo).to.include(verifyDateFunction(a.hotels.checkOut).replaceAll('.','').replace('z','c'))

  })
})
})




 })
})