import {customURLHotelOnly} from '../../customFunction/main'
import { verifyDateFunction } from '../../customFunction/date';
import {
    FROM_DATE_DEFAULT,
    TO_DATE_DEFAULT,
    CHILDREN_DEFAULT,
    ADULTS_DEFAULT,
    PRODUCT_TYPE_HOTEL,
  } from '../../constants/main';



describe('MOBILE HOTEL ONLY',()=> {
  const sizeAdultsUrl = Number(ADULTS_DEFAULT);
    it('Visit travely24',()=> {
      cy.viewport(525,425)
        cy.visit( customURLHotelOnly({}),{timeout:10000})
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
    // cy.visit(customURLHotelOnly({}), {timeout:10000});
    cy.viewport(525,425)
    cy.get('[data-cy="totalPeriodAndPeople"]', {
      timeout: 100000,
    })
.then( text => {
console.log('text',text);

const text1 = text.get(0).innerText.split('/')
console.log('text[1]',text1);
const peopleCountInSite = text1[1]
console.log('peopleCountInSite',peopleCountInSite);
const children = CHILDREN_DEFAULT.split(',').length
const adult = Number(ADULTS_DEFAULT)
const people = children + adult
expect(peopleCountInSite).to.have.string(people)
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
    // cy.visit(customURLHotelOnly({}), {timeout:10000});
    cy.wait(10000)
  cy.get('[data-cy="calendarDateFromTo"] > .block-subtitle-content-item',{timeout:10000}).then(text => {
  const innerText = text.get(0).innerText.split('-')
  console.log('text',text);
  console.log('innerText',innerText);
  const [dateFrom , dateTo] = innerText
 
  console.log('dateTo',dateTo);
  expect(dateFrom).to.have.contain(verifyDateFunction(FROM_DATE_DEFAULT).replaceAll('.',''))
  expect(dateTo).to.have.string(verifyDateFunction(TO_DATE_DEFAULT).replaceAll('.',''))

  })

})

})

})