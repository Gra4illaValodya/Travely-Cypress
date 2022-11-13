
import { customURL } from '../../customFunction/main';
import { verifyDateFunction } from '../../customFunction/date';
import {
  FROM_DATE_DEFAULT,
  TO_DATE_DEFAULT,
  CHILDREN_DEFAULT,
  ADULTS_DEFAULT,
  PRODUCT_TYPE,
} from '../../constants/main';

const dayDateFrom = new Date(FROM_DATE_DEFAULT).getDate();
const dayDateTO = new Date(TO_DATE_DEFAULT).getDate();

describe('Test #3-1-1- _ Testing URL --- 08.10.2022', () => {
  let titleAll = {};
  let arrayCardsDay = [];

  Cypress.on('fail', (error, runnable) => {
    //debugger; //on debugger
    console.log(`Error test name: ${runnable.title}`);
    console.log(error);
    console.log(runnable);
    throw error;
  });

  it('Visit site travely24', () => {
    cy.viewport(1600, 1200);
    cy.visit(customURL({}));
  });

  context('Test checked', () => {
    it('Test checked fly', () => {
      cy.viewport(1600, 1200);
      cy.get('[disabled="false"] > .item-tour-form > :nth-child(1) > input', {
        timeout: 10000,
      })
        .should(PRODUCT_TYPE === 'flight' ? 'be.checked' : 'not.be.checked') // test PRODUCT_TYPE
        .then(() => console.log(`Expected checkbox "Fly" to be checked`));
    });
    it('Test not checked hotel', () => {
      cy.viewport(1600, 1200);
      cy.get(
        '[style="opacity: 0.5;"] > .item-tour-form > :nth-child(1) > input',
        {
          timeout: 10000,
        }
      )
        .should(PRODUCT_TYPE !== 'flight' ? 'be.checked' : 'not.be.checked') // test PRODUCT_TYPE
        .then(() => console.log(`Expected checkbox "Hotel" not to be checked`));
    });
  });

  context('Test text', () => {
    
    it('Test main title', () => {
      
      cy.viewport(1600, 1200);
      
      cy.get(':nth-child(1) > .fromTo > .from', {
        timeout: 100000,
      }).then((text) => {
        const innerText = text.get(0).innerText;
        titleAll = { ...titleAll, from: innerText };
      });

      cy.get(':nth-child(1) > .fromTo > .to', {
        timeout: 100000,
      }).then((text) => {
        const innerText = text.get(0).innerText;
        titleAll = { ...titleAll, to: innerText };
      });
      cy.get('.block-single-content-top-title', {
        timeout: 100000,
      }).then((text) => {
        const innerText = text.get(0).innerText;
        titleAll = { ...titleAll, mainTitle: innerText };
        expect(innerText.length).to.be.greaterThan(6);
        expect(titleAll.mainTitle.length).to.be.greaterThan(6);
      });
    });
    it('Test title airport', () => {
      
      cy.viewport(1600, 1200);
      
      expect(titleAll.mainTitle).to.have.string(titleAll.from);
      expect(titleAll.mainTitle).to.have.string(titleAll.to);
    });
  });

  context('Test text this url', () => {
    it('Test text in calendar', () => {
      cy.visit(customURL({}));
      cy.viewport(1600, 1200);
      cy.get('.item-tour-form-column > .block-fly-text', {
        timeout: 100000,
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
  });

  context('Test calendar', () => {
    it('Get active days in calendar', () => {
      cy.viewport(1600, 1200);
      cy.get('.swiper-slide', {
        timeout: 100000,
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
    });

    it('Test active in calendar this days in url', () => {
      const listDaysActive = arrayCardsDay.join();
      expect(listDaysActive).to.have.string(dayDateFrom);
      expect(listDaysActive).to.have.string(dayDateTO);
    });
  });

  context('Test adults and children', () => {
    const sizeChildrenUrl = CHILDREN_DEFAULT.split(',').length;
    const sizeAdultsUrl = Number(ADULTS_DEFAULT);
    let sizeBodiesSite = null;
    let sizeAdultsSite = null;
    let sizeChildrenSite = null;

    console.log('sizeChildrenUrl',sizeChildrenUrl);
    console.log('sizeAdultsUrl',sizeAdultsUrl);
    it.only('Get quantity all adults and children', () => {
      cy.visit(customURL({}));
      cy.viewport(1600, 1200);
      cy.get('[data-cy="amountTravelers"]', {
        timeout: 100000,
      })

        .then((buttonAllBodies) => {
          sizeBodiesSite = parseInt(buttonAllBodies.get(0).innerText);
          expect(sizeBodiesSite).to.equal(sizeAdultsUrl + sizeChildrenUrl);
       
        })

        .click({
           multiple: true ,
          force: true,
        });

      cy.get(':nth-child(1) > .block-plus-minus > .block-plus-minus__count', {
        timeout: 100000,
      }).then((textSizeAdults) => {
        sizeAdultsSite = parseInt(textSizeAdults.get(0).innerText);
      });
      cy.get(':nth-child(2) > .block-plus-minus > .block-plus-minus__count', {
        timeout: 100000,
      }).then((textSizeChildren) => {
        sizeChildrenSite = parseInt(textSizeChildren.get(0).innerText);
      });
    });
    it.only('Test quantity adults and children', () => {
      cy.viewport(1600, 1200);
      const quantityPeopleUrl = sizeAdultsUrl + sizeChildrenUrl;

      expect(sizeChildrenSite).to.equal(sizeChildrenUrl);
      expect(sizeAdultsSite).to.equal(sizeAdultsUrl);
      expect(sizeChildrenSite + sizeAdultsSite).to.equal(
        sizeChildrenUrl + sizeAdultsUrl
      );
      expect(sizeBodiesSite).to.equal(quantityPeopleUrl);
    });
  });

  context('Test manual delete children in site', () => {
    const sizeAdultsUrl = Number(ADULTS_DEFAULT);
    const newArray = Array.from(Array(sizeAdultsUrl).keys());
    let sizeAdultsSite = null;
    let sizeChildrenSite = null;

    it.only('Click button "delete children" in site', () => {
      cy.viewport(1600, 1200);
      cy.reload();
      cy.get('[data-cy="amountTravelers"]', {
        timeout: 100000,
      }).click({
        force: true,
      });
      CHILDREN_DEFAULT.split(',').forEach((_item) => {
        cy.get(':nth-child(2) > .block-plus-minus > .block-plus-minus__minus', {
          timeout: 100000,
        }).click({
          force: true,
        });
      });
    });
    it.only('Test the children are not included', () => {
      cy.viewport(1600, 1200);
      cy.get(':nth-child(2) > .block-plus-minus > .block-plus-minus__count', {
        timeout: 100000,
      }).then((textSizeChildren) => {
        sizeChildrenSite = parseInt(textSizeChildren.get(0).innerText);
        expect(sizeChildrenSite).to.equal(0);
      });
    });

    it.only('Click button "delete adults" in site', () => {
      cy.viewport(1600, 1200);
      newArray.forEach((_item) => {
        cy.get(':nth-child(1) > .block-plus-minus > .block-plus-minus__minus', {
          timeout: 100000,
        }).click({
          force: true,
        });
      });
    });
    it.only('Test adults are not included', () => {
      cy.viewport(1600, 1200);
      cy.get(':nth-child(1) > .block-plus-minus > .block-plus-minus__count', {
        timeout: 100000,
      }).then((textSizeAdults) => {
        sizeAdultsSite = parseInt(textSizeAdults.get(0).innerText);
        expect(sizeAdultsSite).to.equal(0);
      });
    });
    it.only('Reload site and test two adults are added ', () => {
      cy.viewport(1600, 1200);
      cy.reload();
      cy.get('[data-cy="amountTravelers"]', {
        timeout: 100000,
      }).click({
        force: true,
      });
      cy.get(':nth-child(1) > .block-plus-minus > .block-plus-minus__count', {
        timeout: 100000,
      }).then((textSizeAdults) => {
        sizeAdultsSite = parseInt(textSizeAdults.get(0).innerText);
        expect(sizeAdultsSite).to.equal(1);
      });
    });
    it.only('Delete children, reload site and test empty children', () => {
      cy.viewport(1600, 1600);
      cy.get('#select-margin', {
        timeout: 100000,
      }).select(0);
      cy.wait(5000);
      cy.get(':nth-child(2) > .block-plus-minus > .block-plus-minus__minus', {
        timeout: 100000,
      })
        .click({
          force: true,
        })
        .then(() => {
          cy.wait(5000);
          cy.reload();
          cy.get('[data-cy="amountTravelers"]', {
            timeout: 100000,
          }).click({
            force: true,
          });
          cy.get(
            ':nth-child(1) > .block-plus-minus > .block-plus-minus__count',
            {
              timeout: 100000,
            }
          ).then((textSizeAdults) => {
            sizeAdultsSite = parseInt(textSizeAdults.get(0).innerText);
            expect(sizeAdultsSite).to.equal(1);
          });

          cy.get(
            ':nth-child(2) > .block-plus-minus > .block-plus-minus__count',
            {
              timeout: 100000,
            }
          ).then((textSizeAdults) => {
            sizeAdultsSite = parseInt(textSizeAdults.get(0).innerText);
            expect(sizeAdultsSite).to.equal(0)
           
          });
        });
    });
  });
});
