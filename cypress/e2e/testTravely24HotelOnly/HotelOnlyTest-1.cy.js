const formatDate = (dateOld) => {
  const day = new Date(dateOld).getDate();
  const mouth = new Date(dateOld).getMonth() + 1;
  const year = new Date(dateOld).getFullYear();
  const result = `${year}-${mouth}-${day}`;
  return result;
};

const minusDate = (futureDate) => {
  const dateMinus = new Date(futureDate) - new Date();
  return parseInt(dateMinus / 1000 / 60 / 60 / 24) + 1;
};

const randomDate = (plusDay) => {
  const randomDay = Math.floor(Math.random() * 10 + 1);
  const from = new Date(new Date().getTime() + randomDay * 1000 * 60 * 60 * 24);
  const to = new Date(
    new Date().getTime() + (randomDay + plusDay) * 1000 * 60 * 60 * 24
  );
  return { from: formatDate(from), to: formatDate(to) };
};

const addDate = (addDays) => {
  const fullDate = new Date(
    new Date().getTime() + addDays * 1000 * 60 * 60 * 24
  );
  return formatDate(fullDate);
};

const verifyDateFunction = (oldDate) => {
  return new Date(oldDate).toLocaleDateString('de-DE', {
    year: 'numeric',
    day: 'numeric',
    month: 'short',
  });
};

const handlerURL = (
  baseUrl = BASE_URL_def,
  tourId = TOUR_ID_def,
  adults = ADULT_def,
  children = CHILDREN_def,
  fromDate = DATE_FROM_def,
  toDate = DATE_TO_def,
  productType = PRODUCT_TYPE_def,
  arrivalAiroport = ARRIVALAIROPORT_def,
  hid = HID_def,
  period = PERIOD_def
) => {
  return `${baseUrl}de/tours/${tourId}?hid=${hid}&period=${period}&adults=${adults}&children=${children}&fa=${arrivalAiroport}&sDate=${fromDate}&eDate=${toDate}&productType=${productType}&roomType=CAA++G&boardType=UF&PT=hotelonly&flight=EW583|EW582|`;
};

const DATE_FROM_def = '2022-11-05';
const DATE_TO_def = '2022-11-07';
const dayDateFrom = new Date(DATE_FROM_def).getDate();
const dayDateTO = new Date(DATE_TO_def).getDate();

const URL =
  'https://www.travely24.com/api/?r=hb&hotels=1&hotelDetails=0&period=2&startDate=1667599200&adults=2&hotelsStock=50&lat=39.76482&lng=2.713003&radius=450';
const ADULTS = '2';
const CHILDREN1 = '4,13';
const CHILDREN2 = '13';
const CHILDREN3 = '10';
const DATE_FROM = '2022-11-05';
const DATE_TO = '2022-11-07';
const PRODUCT_TYPE = 'hotelonly';

const title = 'Mallorca - Soller, zauberhaftes Städtchen mit Bergpanorama';

describe('Hotel only', () => {
  let lowPriceBeds = 999999;
  let lowPriseProductType = 99999;
  let total = 0;
  let arrayCardsDay = [];
  ("Dieses komfortable Hotel liegt in Soller. Das Hotel umfasst insgesamt 25 Zimmer. Zusätzlich bietet die Einrichtung einen Wi-Fi-Internetzugang. Ca'l Bisbe bietet eine 24h-Rezeption, so dass auf die Anliegen der Gäste jederzeit eingegangen wird. Ca'l Bisbe bietet auch auf Anfrage keine Kinderbetten.");

  it('visit site', () => {
    cy.visit(handlerURL());
  });

  it('Checking boxes', () => {
    cy.get('#withFlight').should(
      PRODUCT_TYPE === 'hotelonly' ? 'not.be.checked' : 'be.checked'
    );
  });

  it('Test text in calendar', () => {
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

  it('TEST API TITLE', () => {
    cy.visit(
      'https://www.travely24.com/de/tours/1414?hid=29248&period=2&adults=2&children&fa=PMI&sDate=2022-11-05&eDate=2022-11-07&productType=hotelonly&roomType=DBT.BL-1&boardType=BB&PT=hotelonly&flight=EW583%7CEW582%7C',
      { timeout: 55000 }
    );
    cy.intercept({
      method: 'GET',
      url:
        'https://www.travely24.com/api/?r=hb&hotels=1&hid=29248&hotelDetails=1',
    }).as('getDescription');
    cy.wait('@getDescription', { timeout: 15000 }).then((description) => {
      console.log('description.response.body.hotel ', description);
      let improvedApi = JSON.parse(description.response.body.trim());
      console.log(improvedApi.hotel.description.content);
    });

    cy.get('.view-more', { timeout: 10000 }).click({
      force: true,
      multiple: true,
    });
  });

  it('TEST POPUP CANCELATION', () => {
    cy.visit(handlerURL());
    cy.intercept({
      method: 'GET',
      url:
        'https://www.travely24.com/api/?r=hb&hotels=1&hid=29248&hotelDetails=1',
    }).as('getPopapPrice');
    cy.wait('@getPopapPrice', { timeout: 16000 }).then((onePopap) => {
      console.log('onePopap.innerText,onePopap.innerText', onePopap);
    });

    cy.contains('Alle Zimmerangebote zeigen ', { timeout: 15000 }).click({
      force: true,
    });
    cy.get('.collapseCategory', {
      timeout: 10000, 
    }).click({
      force: true,
      multiple: true,
    });
    cy.get('.cancellation').first().trigger('mouseover', { force: true });
    cy.get('.popper > div > span').each((element) => {
      const price = element[0].firstChild.innerHTML;
      const textPopap = element[0].outerText;
      console.log('price', price);
      console.log('textPopap', textPopap);
      expect(textPopap).to.include(price);
    });
  });

  it.only('TEST LowPriceHotelBeds AND MATCHING IN total-price BLOCK', () => {
    cy.visit(
      'https://www.travely24.com/de/tours/1414?hid=29248&period=2&adults=2&children&fa=PMI&sDate=2022-11-05&eDate=2022-11-07&productType=hotelonly&roomType=DBT.BL-1&boardType=BB&PT=hotelonly&flight',
      { timeout: 30000 }
    );

    cy.intercept({
      method: 'GET',
      url:
        'https://connector.traffics.de/v3/rest/offers/?navigation=*&giataIdList=*&searchDate=*&fromDate=*&toDate=*&duration=*&adults=*&optionLists=*&tourOperatorList=*&dontDecorate=*&productType=hotelonly',
    }).as('productHotel');

    cy.intercept({
      method: 'GET',
      url:
        'https://www.travely24.com/api/?r=hb&hotels=1&hid=29248&hotelDetails=0&period=2&startDate=1667606400&adults=2&children=0',
    }).as('hotelsBeds');

    cy.wait('@productHotel', { timeout: 40000 }).then((hotels) => {
      const a = hotels.response.body.offerList;
      total = Math.min(lowPriseProductType, lowPriceBeds);
      console.log('total', total);
      a.forEach((element) => {
        console.log(element.totalPrice.value);
        lowPriseProductType =
          lowPriseProductType > element.totalPrice.value
            ? element.totalPrice.value
            : lowPriseProductType;
      });
      console.log('lowPriseProductType', lowPriseProductType);
    });

    cy.wait('@hotelsBeds', { timeout: 40000 }).then((hotelsBeds) => {
      console.log('hotelsBeds.response.body.hotels ', hotelsBeds);
      let a = JSON.parse(hotelsBeds.response.body.trim());
      console.log('a   ', a);
      let roomsArr = a.hotels.hotels[0].rooms;

      console.log('roomsArr   ', roomsArr);

      roomsArr.forEach((element) => {
        element.rates.forEach((rate) => {
          console.log('rate.sellingRate', rate.sellingRate);
          lowPriceBeds =
            lowPriceBeds > rate.sellingRate ? rate.sellingRate : lowPriceBeds;
        });
      });
    });

    cy.get('.totalPriceBlock > span', { timeout: 25000 }).then((price) => {
      const text = price.get(1).innerText;
      console.log('text', text);
      let priceText = lowPriceBeds + ' €';
      console.log('priceText', priceText);
      expect(priceText).to.have.contain(lowPriceBeds);
    });

    cy.get('.block-contents-wrapper', { timeout: 20000 }).click({
      force: true,
      multiple: true,
    });
    cy.get('[placeholder="Search"]', { timeout: 15000 })
      .click({ force: true })
      .type('Hotel Soller Plaza');
    cy.get('#1016251', { timeout: 15000 })
      .contains('Hotel Soller Plaza', { timeout: 15000 })
      .click({ force: true });
    cy.get('.show-more-rooms', { timeout: 15000 }).click({
      force: true,
      multiple: true,
    });

    cy.get('.drop-tour-apartments-content-right  .collapseCategory', {
      timeout: 10000,
    }).click({ force: true, multiple: true });
    cy.get('.option-price')
      .first()
      .should('have.text', total + ',00' + ' € ');

    cy.get('#btn00DBTBL-1hotelonly')
      .invoke('attr', 'class')
      .should('include', 'active')
      .then((classValue) => {
        expect(classValue).to.contain('active');
      });
    cy.get('#btn00DBTBL-1hotelonly')
      .contains(' Gewählte Option')
      .parent()
      .should(($el) => {
        let title = ' Gewählte Option';
        let price = total + ',00' + ' € ';
        let priceText = price + '' + title;
        console.log('priceText', priceText);
        let spliceText = priceText.slice(title, price);
        spliceText = price;
        console.log('spliceText', spliceText);
        const text = $el.get(0);
        console.log('text', text);
        expect(text).to.have.text(priceText);
      });
  });

  it('TEST lowPriseProductType AND MATCHING in .drop-tour-apartments-content-right BLOCK', () => {
    cy.visit(
      'https://www.travely24.com/de/tours/1414?hid=29248&period=2&adults=2&children&fa=PMI&sDate=2022-11-05&eDate=2022-11-07&productType=hotelonly&roomType=DBT.BL-1&boardType=BB&PT=hotelonly&flight=EW583%7CEW582%7C',
      { timeout: 30000 }
    );

    cy.intercept({
      method: 'GET',
      url:
        'https://connector.traffics.de/v3/rest/offers/?navigation=1,1000,1&giataIdList=448737&searchDate=9,11&fromDate=9&toDate=11&duration=2&adults=2&optionLists=roomId,roomType&tourOperatorList=1AV,5VF,ALD,ALDX,ALL,AME,ANEX,ATID,ATIS,ATK,ATOU,AWT,BAV,BCH,BDV,BENX,BIG,BU,BUM,BXCH,BYE,CBM,CDA,CDHB,CFI,CHR,COR,CPK,DANS,DER,DES,DTA,ECC,ELVI,ERV,ETD,ETI,FALK,FER,FIT,FLT,FLYD,FOR,FTI,FTV,FUV,GULE,HCON,HEX,HMR,HTH,HUC,ICC,IHOM,ITS,ITSB,ITSX,ITT,JAHN,JANA,KAE,LMX,LMXI,MON,MPR,MWR,NOSO,OGE,OGO,OLI,PALH,PALM,PHX,RIVA,RMS,RSD,SCAR,SEHO,SIT,SLR,SLRD,SNOW,SPRI,STT,TJAX,TRAL,TREX,TUIS,TVR,UPS,VFLY,VTO,VTOI,WOL,XALL,XANE,XBIG,XECC,XJAH,XMWR,XOLI,XPOD,XPUR,TUID,XFTI,X5VF,XDER&dontDecorate=true&productType=hotelonly',
    }).as('traffics');

    cy.wait('@traffics', { timeout: 20000 }).then((hotels) => {
      let a = hotels.response.body;
      console.log('a', a);
      total = Math.min(lowPriseProductType, lowPriceBeds);
      console.log('total', total);
      a.forEach((element) => {
        console.log('element.totalPrice.value ', element.totalPrice.value);
        lowPriseProductType =
          lowPriseProductType > element.totalPrice.value
            ? element.totalPrice.value
            : lowPriseProductType;
      });
      console.log('lowPriseProductType before', lowPriseProductType);

      console.log('lowPriseProductType after', lowPriseProductType);
    });
    cy.get('.block-contents-wrapper', { timeout: 20000 }).click({
      force: true,
      multiple: true,
    });

    cy.get('[placeholder="Search"]', { timeout: 15000 })
      .click({ force: true })
      .type('Hotel Soller Plaza');
    cy.get('#1016251', { timeout: 15000 })
      .contains('Hotel Soller Plaza', { timeout: 15000 })
      .click({ force: true });
    cy.get('.show-more-rooms', { timeout: 15000 }).click({
      force: true,
      multiple: true,
    });

    cy.get('.drop-tour-apartments-content-right', {
      timeout: 10000,
    }).click({ force: true, multiple: true });
    cy.get('.option-price')
      .first()
      .should('have.text', total + ',00' + ' € ');

    cy.get('#btn00DBTBL-1hotelonly')
      .invoke('attr', 'class')
      .should('include', 'active')
      .then((classValue) => {
        expect(classValue).to.contain('active');
      });
    cy.get('#btn00DBTBL-1hotelonly')
      .contains(' Gewählte Option')
      .parent()
      .should(($el) => {
        let title = ' Gewählte Option';
        let price = total + ',00' + ' € ';
        let priceText = price + '' + title;
        console.log('priceText', priceText);
        let spliceText = priceText.slice(title, price);
        spliceText = price;
        console.log('spliceText', spliceText);
        const text = $el.get(0);
        console.log('text', text);
        expect(text).to.have.text(priceText);
      });
  });
});
