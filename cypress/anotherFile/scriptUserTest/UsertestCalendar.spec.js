import {handlerURL} from '../../helperFunctions/main'
import { verifyDateFunction } from '../../helperFunctions/date';

import { 
	BASE_URL_def,
TOUR_ID_def,
ADULT_def,
CHILDREN_def,
DATE_FROM_def,
DATE_TO_def,
PRODUCT_TYPE_def,
} from '../../variable/main.js'

const dayDateFrom = new Date(DATE_FROM_def).getDate();
const dayDateTO = new Date(DATE_TO_def).getDate();

describe('CALENDAR',()=> {
    let titleAll = {};
    let arrayCardsDay = [];


it('Test text in calendar', () => {
   
    cy.visit(handlerURL())
    cy.get('.item-tour-form-column > .block-fly-text', {
      timeout: 10000,
    }).then((text) => {
      const innerText = text.get(0).innerText.split(/\n/);
      const [dateFrom, dateTo] = innerText;
      const siteDateFrom = verifyDateFunction(dateFrom.replace('k', 'c'));
      const siteDateTo = verifyDateFunction(dateTo.replace('k', 'c'));
      expect(siteDateFrom).to.have.string(verifyDateFunction(DATE_FROM_def));
      expect(siteDateTo).to.have.string(verifyDateFunction(DATE_TO_def));
    });
  });

  context('Test calendar', () => { 
    it('Get active days in calendar', () => {
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
    });

    it('Test active in calendar this days in url', () => {
      const listDaysActive = arrayCardsDay.join();
      expect(listDaysActive).to.have.string(dayDateFrom);
      expect(listDaysActive).to.have.string(dayDateTO);
    });
  });
  context('Test adults and children', () => {
    const sizeChildrenUrl = CHILDREN_def.split(',').length;
    const sizeAdultsUrl = Number(ADULT_def);
    let sizeBodiesSite = null;
    let sizeAdultsSite = null;
    let sizeChildrenSite = null;

    it('Get quantity all adults and children', () => {
      cy.get('.travelers > span', {
        timeout: 10000,
      })
        .then((buttonAllBodies) => {
          sizeBodiesSite = parseInt(buttonAllBodies.get(0).innerText);
          expect(sizeBodiesSite).to.equal(sizeAdultsUrl + sizeChildrenUrl);
        })
        .click({
          force: true,
        });
      cy.get(':nth-child(1) > .block-plus-minus > .block-plus-minus__count', {
        timeout: 10000,
      }).then((textSizeAdults) => {
        sizeAdultsSite = parseInt(textSizeAdults.get(0).innerText);
      });
      cy.get(':nth-child(2) > .block-plus-minus > .block-plus-minus__count', {
        timeout: 10000,
      }).then((textSizeChildren) => {
        sizeChildrenSite = parseInt(textSizeChildren.get(0).innerText);
      });
    });
    it('Test quantity adults and children', () => {
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
    const sizeAdultsUrl = Number(ADULT_def);
    const newArray = Array.from(Array(sizeAdultsUrl).keys());
    let sizeAdultsSite = null;
    let sizeChildrenSite = null;

    it('Click button "delete children" in site', () => {
      cy.reload();
      cy.get('.travelers > span', {
        timeout: 10000,
      }).click({
        force: true,
      });
      CHILDREN_def.split(',').forEach((_item) => {
        cy.get(':nth-child(2) > .block-plus-minus > .block-plus-minus__minus', {
          timeout: 10000,
        }).click({
          force: true,
        });
      });
    });
    it('Test the children are not included', () => {
      cy.get(':nth-child(2) > .block-plus-minus > .block-plus-minus__count', {
        timeout: 10000,
      }).then((textSizeChildren) => {
        console.log('textSizeChildren',textSizeChildren);
        sizeChildrenSite = parseInt(textSizeChildren.get(0).innerText);
        expect(sizeChildrenSite).to.equal(0);
      });
    });

    it('Click button "delete adults" in site', () => {
      newArray.forEach((_item) => {
        cy.get(':nth-child(1) > .block-plus-minus > .block-plus-minus__minus', {
          timeout: 10000, 
        }).click({
          force: true,
          multiple: true 
        });
      });
    });
    it('Test adults are not included', () => {
      cy.get(':nth-child(1) > .block-plus-minus > .block-plus-minus__count', {
        timeout: 10000,
      }).then((textSizeAdults) => {
        sizeAdultsSite = parseInt(textSizeAdults.get(0).innerText);
        expect(sizeAdultsSite).to.equal(2);
      });
    })
    it('Reload site and test two adults are added ', () => {
      cy.reload();
      cy.get('.travelers > span', {
        timeout: 10000,
      }).click({
        force: true,
        multiple: true 
      });
      cy.get(':nth-child(1) > .block-plus-minus > .block-plus-minus__count', {
        timeout: 10000,
      }).then((textSizeAdults) => {
        sizeAdultsSite = parseInt(textSizeAdults.get(0).innerText);
        expect(sizeAdultsSite).to.equal(1);
      });
    });
  });
});

  
