import {
    customApiAER,
    customApiProductType,
    customURL,
  } from '../../../customFunction/main';
  
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
  
    let showItems = [];
    let arrayAERFareList = [];
    let getProductType = null;
  
    it('Visit site travely24', () => {
        cy.viewport(625, 625);
      cy.visit( customURL({}) ,{timeout:60000});
    });
  
    it('Get date this APIes', () => {
        cy.viewport(625, 625);
      
  
     
             cy.intercept({
            method: 'GET',
            url: 'https://connector.traffics.de/v3/rest/offers/?productType=flight**'
             }).as('ProductAPI')
     
            cy.intercept({
                method: 'GET',
                url: `https://www.travely24.com/api/?r=aer&*&stype=1`
            }).as('AER_1')
  
            cy.intercept({
                method: 'GET',
                url: `https://www.travely24.com/api/?r=aer&*&stype=2`
            }).as('AER_2')
  
            cy.intercept({
                method: 'GET',
                url: `https://www.travely24.com/api/?r=aer&*&stype=3`
            }).as('AER_3')
  
            cy.intercept({
                method: 'GET',
                url: `https://www.travely24.com/api/?r=aer&*&stype=4`
            }).as('AER_4')
  
            cy.intercept({
                method: 'GET',
                url: `https://www.travely24.com/api/?r=aer&*&stype=5`
            }).as('AER_5')
  
  
  
            cy.wait('@ProductAPI',{timeout:60000}).then(item => {
              console.log('item',item); 
            });
  
            cy.wait(['@AER_1', '@AER_2', '@AER_3', '@AER_4', '@AER_5'], { timeout: 60000 }).spread(
              (AER_1, AER_2, AER_3, AER_4, AER_5) => {
    
                expect(AER_1.response.statusCode).to.eq(200)
                expect(AER_2.response.statusCode).to.eq(200)
                expect(AER_3.response.statusCode).to.eq(200)
                expect(AER_4.response.statusCode).to.eq(200)
                expect(AER_5.response.statusCode).to.eq(200)
    
    
                const a1 = JSON.parse(AER_1.response.body.trim());
                const a2 = JSON.parse(AER_2.response.body.trim());
                const a3 = JSON.parse(AER_3.response.body.trim());
                const a4 = JSON.parse(AER_4.response.body.trim());
                const a5 = JSON.parse(AER_5.response.body.trim());
        
                const aer_1 = a1.availableFareList;
                const aer_2 = a2.availableFareList;
                const aer_3 = a3.availableFareList;
                const aer_4 = a4.availableFareList;
                const aer_5 = a5.availableFareList;
    
                aer_1.forEach( item => arrayAERFareList.push(item))
                aer_2.forEach( item => arrayAERFareList.push(item))
                aer_3.forEach( item => arrayAERFareList.push(item))
                aer_4.forEach( item => arrayAERFareList.push(item))
                aer_5.forEach( item => arrayAERFareList.push(item))
          
              });
  
          
            console.log('arrayAERFareList',arrayAERFareList);
        
    })
  
    it('Test create new date this APIes', () => {
        cy.viewport(625, 625);
      
   
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
    //     it('Enter show 10 items', () => {
    //         cy.viewport(625, 625);
           
        
    //     cy.wait(2000)
    //     cy.get('[data-cy="buttonFlightChoose"]', {
    //       timeout: 30000,
    //     }).click({
    //       force: true,
    //     });
    //     cy.wait(2000)
    //     cy.get('.show-more-btn', {
    //       timeout: 30000,
    //     }).click({
    //       force: true,
    //       multiple:true
    //     });
    //   });
  
      newArrayTestItems.forEach((_item, i) => {
        console.log('_item',_item);
     
        it(`Test item #${i + 1} on site`, () => {
            cy.viewport(625, 625);
            cy.wait(2000)
            
        cy.wait(2000)
        cy.get('[data-cy="buttonFlightChoose"]', {
          timeout: 30000,
        }).click({
          force: true,
        });
        cy.wait(2000)
        cy.get('.show-more-btn', {
          timeout: 30000,
        }).click({
          force: true,
          multiple:true
        });
          console.log('showItems',showItems[i]);
          cy.get(
            `#showedOtherFlights${i} [data-cy="firstTimrFrom"]`,
            {
              timeout: 30000,
            }
          ).then((html) => {
            const timeSite = html.get(0).innerText;
          
                const timeApi = showVerifyTime(
                  showItems[i].departureDateFrom.hour,
                  showItems[i].departureDateFrom.minute
                )
               
                expect(timeSite).to.include(timeApi);
              
          
            })
          
      
  
          cy.get(
            `#showedOtherFlights${i} [data-cy="firstTimeTo"]`,
            {
              timeout: 10000,
            }
          ).then((html) => {
          
            const timeSite = html.get(0).innerText;
            console.log('timeSite',timeSite);
              const timeApi = showVerifyTime(
                showItems[i].departureDateTo.hour,
                showItems[i].departureDateTo.minute
              );
    
                expect(timeSite).to.include(timeApi);
        
             
          });
  
          cy.get(
            `#showedOtherFlights${i} [data-cy="secondTimeFrom"]`,
            {
              timeout: 10000,
            }
          ).then((html) => {
            const timeSite = html.get(0).innerText;
          
            cy.get('.block-options-content-flight .time').then(text => {
                const time = text.get(0).innerText
    
                console.log('time',time);
               
    
                const timeApi = showVerifyTime(
                  showItems[i].departureDateFrom.hour,
                  showItems[i].departureDateFrom.minute
                )
                console.log('timeApi',timeApi);
                expect(time).to.include(timeApi);
              })
          });
  

          cy.get(
            `#showedOtherFlights${i} [data-cy="secondTimeTo"]`,
            {
              timeout: 10000,
            }
          ).then((html) => {
            const timeSite = html.get(0).innerText;
          const timeApi = showVerifyTime(
                showItems[i].departureDateTo.hour,
                showItems[i].departureDateTo.minute
              );
                expect(timeSite).to.include(timeApi);
          });
          // cy.wait(2000)
          // cy.get(
          //   `#showedOtherFlights${i} .flight-price`,
          //   {
          //     timeout: 10000,
          //   }
          // ).then((html) => {
          //   cy.wait(2000)
          //   const priceSite = Number(parseFloat(html.get(0).innerText));
          //   const timeApi = showItems[i].allPrice.toFixed(2);
          //   expect(priceSite).to.include(timeApi);
          // });
        });
      });
    });
});
  