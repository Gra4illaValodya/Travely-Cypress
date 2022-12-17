import {
  customApiAER,
  customApiProductType,
  customURL,
} from '../../customFunction/main';

const showVerifyTime = (hour, minute) => {
  const newHour = Number(hour) < 10 ? `0${hour}` : hour;
  const newMinute = Number(minute) < 10 ? `0${minute}` : minute;
  return `${newHour}:${newMinute}`;
};

const addedDepartureDateTo = (hour, minute, fullTime) => {
  const fullMinute = hour * 60 + minute + fullTime;
  const newHour = parseInt(fullMinute / 60);
  const newMinute = parseInt(fullMinute % 60);
  return { hour: newHour, minute: newMinute };
};

describe('Test #3-3-2-Test items on site _ URL --- 08.10.2022', () => {
  const newArray = Array.from(Array(5).keys());
  const newArrayTestItems = Array.from(Array(10).keys());
  let arrayAERFareList = [];
  let showItems = [];
  let getProductType = null;

  it('Visit site travely24', () => {
    cy.viewport(1600, 1200);
    cy.visit('https://www.travely24.com/de/tours/777?hid=62836&period=2&adults=2&children=3,11&fa=JFK&sDate=2023-01-12&eDate=2023-01-14&productType=flight&roomType=DF1F&boardType=UF&PT=pauschal&fd=ZAG');
  });

  it('Get date this APIes', () => {
    cy.viewport(1600, 1200);
    cy.server();
    cy.route('GET', customApiProductType({})).as(`getProductType`);
    newArray.forEach((_item, i) => {
      cy.route('GET', customApiAER({ numberCatch: i + 1 })).as(
        `getAER_${i + 1}`
      );
    });

    newArray.forEach((_item, i) => {
      cy.wait(`@getAER_${i + 1}`, { timeout: 10000 })
        .its('status')
        .should('eq', 200);
      cy.get(`@getAER_${i + 1}`).then(({ response }) => {
        const {
          body: { availableFareList },
        } = response;
        availableFareList.forEach((item) => arrayAERFareList.push(item));
      });
    });
    cy.wait(`@getProductType`, { timeout: 10000 })
      .its('status')
      .should('eq', 200);
    cy.get(`@getProductType`).then(({ response }) => {
      const { body } = response;
      getProductType = body;
    });
  });
  
  it('Test create new date this APIes', () => {
    cy.viewport(1600, 1200);
    const priceAll = arrayAERFareList.map((item) => {
      let newRightInfoItems = [];
      const adultsPrice =
        item.passengerTypeFareList[0].priceList *
        item.passengerTypeFareList[0].count;
      const childrenPrice =
        item.passengerTypeFareList[1].priceList *
        item.passengerTypeFareList[1].count;
      const allPrice = adultsPrice + childrenPrice;

      const mainInfoDeparture = item.legList[0].itineraryList.map(
        (itemMain) => {
          return {
            testTime: itemMain.flyingTimeInMinutes,
            fullTimeDeparture: itemMain.segmentList[0].flyingTimeInMinutes,
            departureDateFrom: itemMain.segmentList[0].departureTimeOfDay,
            departureDateTo: itemMain.segmentList[0].arrivalTimeOfDay,
          };
        }
      );
      const mainInfoBack = item.legList[1].itineraryList.map((itemMain) => ({
        testTime: itemMain.flyingTimeInMinutes,
        fullTimeBack: itemMain.segmentList[0].flyingTimeInMinutes,
        backDateFrom: itemMain.segmentList[0].departureTimeOfDay,
        backDateTo: itemMain.segmentList[0].arrivalTimeOfDay,
      }));
      const itemFullInfoFly = mainInfoDeparture.map((item) => ({
        departure: item,
        back: mainInfoBack,
      }));

      itemFullInfoFly.forEach((testItem) => {
        testItem.back.forEach((newItem) => {
          const newInfo = { ...testItem.departure, ...newItem, allPrice };
          newRightInfoItems.push(newInfo);
        });
      });

      return {
        adultsPrice,
        childrenPrice,
        allPrice,
        newRightInfoItems,
        mainInfoDeparture,
        mainInfoBack,
        itemFullInfoFly,
        itemAER: item,
      };
    });
    const priceAllFilter = priceAll.sort((a, b) => a.allPrice - b.allPrice);
    let countItem = 0;
    priceAllFilter.forEach((item, i) => {
      item.newRightInfoItems.forEach((itemF, i) => {
        showItems.push({
          num: countItem,
          adultsPrice: item.adultsPrice,
          childrenPrice: item.childrenPrice,
          allPrice: item.allPrice,
          ...itemF,
        });
        countItem += 1;
      });
    });
  });
  context('Test date on site', () => {
    it('Enter show 10 items', () => {
      cy.viewport(1600, 1200);
      cy.get('.block-contents-wrapper > .btn-blue', {
        timeout: 10000,
      }).click({
        force: true,
      });
      cy.get('.show-more-btn', {
        timeout: 10000,
      }).click({
        force: true,
      });
    });

    newArrayTestItems.forEach((_item, i) => {
      it(`Test item #${i + 1} on site`, () => {
        cy.viewport(1600, 1200);
        cy.get(
          `#showedOtherFlights${i} > [style="border: 0px; margin: 0px; width: 100%; --c81fc0a4:9999;"] > :nth-child(1) > :nth-child(1) > .drop-tour-form-fly-ticket > :nth-child(2) > .ticket-center-time > :nth-child(1)`,
          {
            timeout: 10000,
          }
        ).then((html) => {
          const timeSite = html.get(0).innerText;
          if (showItems[i].departureDateFrom !== undefined) {
            const timeApi = showVerifyTime(
              showItems[i].departureDateFrom.hour,
              showItems[i].departureDateFrom.minute
            );
            expect(timeSite).to.have.string(timeApi);
          } else {
            expect(showItems[i].departureDateFrom).to.be.undefined;
            expect(timeSite).to.have.string;
          }
        });

        cy.get(
          `#showedOtherFlights${i} > [style="border: 0px; margin: 0px; width: 100%; --c81fc0a4:9999;"] > :nth-child(1) > :nth-child(1) > .drop-tour-form-fly-ticket > :nth-child(2) > .ticket-center-time > :nth-child(3)`,
          {
            timeout: 10000,
          }
        ).then((html) => {
          const timeSite = html.get(0).innerText;
          if (showItems[i].departureDateTo !== undefined) {
            const timeApi = showVerifyTime(
              showItems[i].departureDateTo.hour,
              showItems[i].departureDateTo.minute
            );
            timeSite !== timeApi && console.log(showItems[i]);
            expect(timeSite).to.have.string(timeApi);
          } else {
            expect(showItems[i].departureDateTo).to.be.undefined;
            expect(timeSite).to.have.string
          }
        });

        cy.get(
          `#showedOtherFlights${i} > [style="border: 0px; margin: 0px; width: 100%; --c81fc0a4:9999;"] > :nth-child(1) > :nth-child(1) > .drop-tour-form-fly-ticket > :nth-child(3) > .ticket-center-time > :nth-child(1)`,
          {
            timeout: 10000,
          }
        ).then((html) => {
          const timeSite = html.get(0).innerText;
          if (showItems[i].backDateFrom !== undefined) {
            const timeApi = showVerifyTime(
              showItems[i].backDateFrom.hour,
              showItems[i].backDateFrom.minute
            );
            expect(timeSite).to.have.string(timeApi);
          } else {
            expect(showItems[i].backDateFrom).to.be.undefined;
            expect(timeSite).to.have.string;
          }
        });

        cy.get(
          `#showedOtherFlights${i} > [style="border: 0px; margin: 0px; width: 100%; --c81fc0a4:9999;"] > :nth-child(1) > :nth-child(1) > .drop-tour-form-fly-ticket > :nth-child(3) > .ticket-center-time > :nth-child(3)`,
          {
            timeout: 10000,
          }
        ).then((html) => {
          const timeSite = html.get(0).innerText;
          if (showItems[i].backDateTo !== undefined) {
            const timeApi = showVerifyTime(
              showItems[i].backDateTo.hour,
              showItems[i].backDateTo.minute
            );
            expect(timeSite).to.have.string(timeApi);
          } else {
            expect(showItems[i].backDateTo).to.be.undefined;
            expect(timeSite).to.have.string;
          }
        });

        cy.get(
          `#showedOtherFlights${i} > [style="border: 0px; margin: 0px; width: 100%; --c81fc0a4:9999;"] > :nth-child(1) > :nth-child(1) > .drop-tour-form-fly-ticket > .btn-alternativeFlights-wrapper > .flight-price`,
          {
            timeout: 10000,
          }
        ).then((html) => {
          const priceSite = Number(parseFloat(html.get(0).innerText));
          const timeApi = Number(showItems[i].allPrice);
          expect(priceSite).to.be.at.least(timeApi);
        });
      });
    });
  });
});
