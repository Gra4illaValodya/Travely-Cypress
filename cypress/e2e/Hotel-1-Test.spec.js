
import {handlerURL} from '../helperFunctions/main'
import { 
    BASE_URL_def,
TOUR_ID_def,
ADULT_def,
CHILDREN_def,
DATE_FROM_def,
DATE_TO_def,
PRODUCT_TYPE_def
} from '../variable/main'

describe('CHECKED, ',()=>{
    it('Test checked box hotelonly',()=>{
       cy.visit(handlerURL())
       cy.get('[disabled="true"]').should(PRODUCT_TYPE_def ===  'hotelonly&roomType' ? 'not.be.checked' : 'be.ckecked').then(()=> {
        console.log('Expected checkbox "Fly" not to be checked');
       })
    })
    it('Test title text',()=>{
        cy.get('.list-hotel .list',{timeout:20000}).should('')
    })

})