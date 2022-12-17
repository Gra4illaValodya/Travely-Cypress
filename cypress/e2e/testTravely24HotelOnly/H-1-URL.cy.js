import { customURLHotelOnly } from '../../customFunction/main';
import { verifyDateFunction } from '../../customFunction/date';
import {
  FROM_DATE_DEFAULT,
  TO_DATE_DEFAULT,
  CHILDREN_DEFAULT,
  ADULTS_DEFAULT,
  PRODUCT_TYPE_HOTEL,
} from '../../constants/main';




describe('TEST URL',()=> {
 
  let arrayCardsDay = [];


Cypress.on('fail', (error, runnable) => {
  console.log(`Error test name: ${runnable.title}`);
  console.log(error);
  console.log(runnable);
  throw error;
});

  it('Visit travely24',()=>{
      cy.visit(customURLHotelOnly({}))
    
    })
    
  context(`CHECKED TEST`,()=>{

    it('Test checked HOTEL',()=>{
      cy.viewport(1600,1600)
cy.get('.item-tour-form-wrapper:first-of-type + .item-tour-form-wrapper + .item-tour-form-wrapper > .item-tour-form.user-room > :nth-child(1) > input',{timeout:10000}).should( PRODUCT_TYPE_HOTEL === 'hotelonly' ? 'be.checked' :'not.be.checked')
    })

    it('Test no checked HOTEL',()=>{
      cy.viewport(1600,1600)
      cy.get('.item-tour-form-wrapper:first-of-type + .item-tour-form-wrapper > .item-tour-form > :nth-child(1) > input',{timeout:10000}).should( PRODUCT_TYPE_HOTEL !== 'hotelonly' ? 'be.checked' :'not.be.checked')
    })


  });
 context('Test text  url', () => {
    it('Test text in calendar', () => {
      cy.visit(customURLHotelOnly({}));
      cy.viewport(1600, 1600);
      cy.get('.item-tour-form-column > .block-fly-text', {
        timeout: 10000,
      }).then((text) => {
        const innerText = text.get(0).innerText.split(/\n/);
        const [dateFrom, dateTo] = innerText;
        const siteDateFrom = verifyDateFunction(dateFrom.replace('k', 'c'));
        const siteDateTo = verifyDateFunction(dateTo.replace('k', 'c'));
        expect(siteDateFrom).to.have.string(
          verifyDateFunction(FROM_DATE_DEFAULT)
        );
        expect(siteDateTo).to.have.string(verifyDateFunction(TO_DATE_DEFAULT));
      });
    });
    it('Test people in calendar',()=>{
      cy.get('.travelers > :nth-child(1)').then(text => {
        const text1 = text.get(0).innerText
        const peopleCount = parseInt(text1).toString() 
        const children = CHILDREN_DEFAULT.split(',').length
        const adult = Number(ADULTS_DEFAULT)
       
        expect(peopleCount).to.have.string(children + adult)
      })
    })
  });

  context('Test calendar', () => {
    it('Get active days in calendar', () => {
      cy.viewport(1600, 1600);
      cy.get('.swiper-slide', {
        timeout: 10000,
      }).then((text) => {
        const tempArrayCardsDay = [].slice.call(text.children());
        tempArrayCardsDay.forEach((item) => {
          if (item.className === 'block-calendar-list-item active') {
            const numberDayActiveCalendar =
              item.children[1].children[0].innerText;
            arrayCardsDay.push(numberDayActiveCalendar);
          }
        });
      });
  })
})
context('Test manual delete children in site', () => {
  const sizeAdultsUrl = Number(ADULTS_DEFAULT);
  const newArray = Array.from(Array(sizeAdultsUrl).keys());
  let sizeAdultsSite = 0;

  let sizeChildrenSite = 0;

  it('Click button "delete children" in site', () => {
    cy.viewport(1600, 1600);
    cy.visit(customURLHotelOnly({}),{timeout:30000})
    // cy.reload();
    cy.wait(8000)
    cy.get('[data-cy="amountTravelers"]', {
      timeout: 10000,
    }).click({
      force: true,
     
    });
    CHILDREN_DEFAULT.split(',').forEach((_item) => {
      cy.get('[data-cy="block-plus-minus_minus_child"]', {
        timeout: 10000,
      }).click({
        force: true,
        
      });
    });
  });
  
  
  it('Click button "delete adults" in site', () => {
    cy.viewport(1600, 1600);
    newArray.forEach((_item) => {
      cy.get('[data-cy="block-plus-minus_minus_adult"]', {
        timeout: 10000,
      }).click({
        force: true,
        multiple:true
      });
    });
  });
  it('Test the children are not included', () => {
    cy.viewport(1600, 1600);
    cy.wait(2000)
    cy.get('[data-cy="block-plus-minus_count_child"]', {
      timeout: 10000,
    }).then((textSizeChildren) => {
      sizeChildrenSite = parseInt(textSizeChildren.get(0).innerText);
      console.log('sizeChildrenSite',sizeChildrenSite);
      expect(sizeChildrenSite).to.equal(0);
    }); 
  });
  
  it('Test adults are not included', () => {
    cy.viewport(1600, 1600);
    cy.wait(8000)
    cy.get('[data-cy="block-plus-minus_count_adult"]', {
      timeout: 10000,
    }).then((textSizeAdults) => {
      console.log('textSizeAdults',textSizeAdults);
      sizeAdultsSite = parseInt(textSizeAdults.get(0).innerText);
      console.log('textSizeAdults.get(0).innerText',textSizeAdults.get(0).innerText);
      console.log('sizeAdultsSite',sizeAdultsSite);
      // console.log('sizeChildrenSite',sizeChildrenSite);
      expect(sizeAdultsSite).to.equal(0);
    });
  });
  
  it('Reload site and test two adults are added ', () => {
    cy.viewport(1600, 1600);
    cy.reload();
    cy.get('[data-cy="amountTravelers"]', {
      timeout: 10000,
    }).click({
      force: true,
      
    });
    cy.get('[data-cy="block-plus-minus_count_adult"]', {
      timeout: 10000,
    }).then((textSizeAdults) => {
      sizeAdultsSite = parseInt(textSizeAdults.get(0).innerText);
      console.log('sizeChildrenSite',sizeChildrenSite);
      expect(sizeAdultsSite).to.equal(1);
    });
  });
  it('Delete children, reload site and test empty children', () => {
    cy.viewport(1600, 1600);
    cy.get('#select-margin', {
      timeout: 10000,
    }).select(0);
    cy.wait(5000);
    cy.get('[data-cy="block-plus-minus_minus_child"]', {
      timeout: 10000,
    })
      .click({
        force: true,
        
      })
      .then(() => {
        cy.wait(5000);
        cy.reload();
        cy.get('[data-cy="amountTravelers"]', {
          timeout: 10000,
        }).click({
          force: true,
        });
        cy.get(
          '[data-cy="block-plus-minus_count_adult"]',
          {
            timeout: 10000,
          }
        ).then((textSizeAdults) => {
          console.log('textSizeAdults',textSizeAdults);
          sizeAdultsSite = parseInt(textSizeAdults.get(0).innerText);
          //  console.log('sizeChildrenSite',sizeChildrenSite);
          console.log('sizeAdultsSite',sizeAdultsSite);
          console.log('textSizeAdults.get(0).innerText',textSizeAdults.get(0).innerText);
          expect(sizeAdultsSite).to.equal(1);
        });

        cy.get(
          '[data-cy="block-plus-minus_count_child"]',
          {
            timeout: 10000,
          }
        ).then((textSizeAdults) => {
          sizeAdultsSite = Number(parseInt(textSizeAdults.get(0).innerText));
          console.log('sizeAdultsSite',sizeAdultsSite);
          expect(sizeAdultsSite).to.equal(0)
        
        });
      });
  });

})
})