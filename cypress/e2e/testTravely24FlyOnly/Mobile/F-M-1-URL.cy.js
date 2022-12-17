import { customURL } from '../../../customFunction/main';
import { verifyDateFunction } from '../../../customFunction/date';
import {
	FROM_DATE_DEFAULT,
	TO_DATE_DEFAULT,
	CHILDREN_DEFAULT,
	ADULTS_DEFAULT,
  FD_URL_FROM,
  FA_URL_TO,
	FROM_DEFAULT,
	TO_DEFAULT,
	PRODUCT_TYPE
} from '../../../constants/main';

const dayDateFrom = new Date(FROM_DATE_DEFAULT).getDate();
const dayDateTO = new Date(TO_DATE_DEFAULT).getDate();

describe('FLYONLU MOBILE', () => {
	let titleAll = {};

	it('visit travely24', () => {
		cy.viewport(525, 425);
		cy.visit(customURL({}), { timeout: 50000 });
		cy.wait(4000);
	});
	context('TEST CHECK', () => {
		it('Test checked fly', () => {
			cy.viewport(525, 425);
			cy.get('#withFlight', {
				timeout: 10000
			})
				.should(PRODUCT_TYPE === 'flight' ? 'be.checked' : 'not.be.checked') // test PRODUCT_TYPE
				.then(() => console.log(`Expected checkbox "Fly" to be checked`));
		});
		it('Test not checked hotel', () => {
			cy.viewport(525, 425);
			cy.get('#withRoom', {
				timeout: 10000
			})
				.should(PRODUCT_TYPE !== 'flight' ? 'be.checked' : 'not.be.checked') // test PRODUCT_TYPE
				.then(() => console.log(`Expected checkbox "Hotel" not to be checked`));
		});
	});
	context('TEST TEXT', () => {
		it('Test from to', () => {
			cy.viewport(525, 425);
			cy.visit(customURL({}), { timeout: 50000 });
			cy.wait(4000);

			cy.get('[data-cy="firstAirNameFrom"]', { timeout: 50000 }).then(textFrom => {
				console.log('textFrom', textFrom);
				const airFrom = textFrom.get(0).innerText;
				titleAll = { ...titleAll, fromText: airFrom };
				console.log(titleAll.fromText);
			});
			cy.get('[data-cy="firstAirNameTo"]', { timeout: 50000 }).then(textTo => {
				console.log('textFrom', textTo);
				const airTo = textTo.get(0).innerText;
				titleAll = { ...titleAll, ToText: airTo };
				console.log(titleAll.ToText);
			});
			cy.get('[data-cy="titleOnlyFly"]', { timeout: 50000 }).then(textTitle => {
				const titleSite = textTitle.get(0).innerText;
				titleAll = { ...titleAll, title: titleSite };
				console.log(titleAll.title);
				expect(titleAll.title).to.have.string(titleAll.fromText);
				expect(titleAll.title).to.have.string(titleAll.ToText);
			});
		});
	});

	context('TEST TEXT THIS URL', () => {
		it('test text date in calendar', () => {
			cy.viewport(525, 425);
			cy.visit(customURL({}), { timeout: 50000 });
			cy.wait(10000);
			cy.get('[data-cy="calendarDateFromTo"] > .block-subtitle-content-item', {
				timeout: 10000
			}).then(text => {
				const innerText = text.get(0).innerText.split('-');
				console.log('text', text);
				console.log('innerText', innerText);
				const [dateFrom, dateTo] = innerText;

				console.log('dateTo', dateTo);

				expect(dateFrom).to.have.contain(
					verifyDateFunction(FROM_DATE_DEFAULT).replaceAll('.', '')
				);

				expect(dateTo).to.have.string(
					verifyDateFunction(TO_DATE_DEFAULT).replaceAll('.', '')
				);
			});
		});
	});


	context('CALENDAR AND PEOPLE', () => {
		it('Test number of adult from URL and adult in the site', () => {
			cy.viewport(525, 425);
			cy.visit(customURL({}), { timeout: 50000 });
			cy.wait(10000);
			cy.get('[data-cy="adultsCount"]', {
				timeout: 100000
			}).then(text => {
				console.log('text', text);
				const countAdult = text.get(0).innerText;
				console.log('countAdult', countAdult);
				expect(countAdult).to.eq(ADULTS_DEFAULT);
			});
		});
    
		it('Test number of CHILDREN from URL and CHILDREN in the site', () => {
			cy.viewport(525, 425);
			// cy.visit(customURLHotelOnly({}));
			cy.get('[data-cy="childrensCount"]', {
				timeout: 100000
			}).then(text => {
				console.log('text', text);
				const childenInSite = Number(text.get(0).innerText);

				const childrensCount = CHILDREN_DEFAULT.split(',').length;
				console.log('childrensCount', childrensCount);
				expect(childenInSite).to.eq(childrensCount);
			});
		});

		it('Test number of PEOPLE from URL and PEOPLE in the site', () => {
			// cy.visit(customURLHotelOnly({}), {timeout:10000});
			cy.viewport(525, 425);
			cy.get('[data-cy="totalPeriodAndPeople"]', {
				timeout: 100000
			}).then(text => {
				console.log('text', text);
				const text1 = text.get(0).innerText.split('/');
				console.log('text[1]', text1);
				const peopleCountInSite = Number(text1[1])
				console.log('peopleCountInSite', peopleCountInSite);
				const children = CHILDREN_DEFAULT.split(',').length;
				const adult = Number(ADULTS_DEFAULT);
				const people = children + adult;
				expect(peopleCountInSite).to.equal(people);
			});
		});

		it('delete child in site', () => {
			cy.viewport(525, 425);
			// cy.visit(customURLHotelOnly({}),{timeout:10000});
			cy.get('[data-cy="buttonCalendarChoose"]', {
				timeout: 100000
			}).click();
			cy.wait(4000);
			CHILDREN_DEFAULT.split(',').forEach(item => {
				cy.get('[data-cy="block-plus-minus_minus_child"]', { timeout: 10000 }).click({
					force: true
				});
			});
			cy.get('[data-cy="block-plus-minus_count_child"]', { timeout: 10000 }).then(count => {
				const countChild = count.get(0).innerText;
				console.log('countChild', countChild);
				expect(countChild).to.include(0);
			});
		});
		it('delete adult in site', () => {
			cy.viewport(525, 425);
			// cy.visit(customURLHotelOnly({}),{timeout:10000});
			cy.get('[data-cy="buttonCalendarChoose"]', {
				timeout: 100000
			}).click({ force: true });
			cy.wait(4000);

			cy.get('[data-cy="block-plus-minus_minus_adult"]', { timeout: 10000 })
				.then(textSizeAdults => {
					console.log('textSizeAdults', textSizeAdults);
					const sizeAdultsUrl = textSizeAdults.get(0).innerText;
					console.log('sizeAdultsUrl', sizeAdultsUrl);
				})
				.click({ force: true })
				.click({ force: true });
			cy.get('[data-cy="block-plus-minus_count_adult"]', { timeout: 10000 }).then(count => {
				const countAdult = count.get(0).innerText;
				console.log('countAdult', countAdult);
				expect(countAdult).to.include(0);
			});
		});

		it('test text date in calendar', () => {
			cy.viewport(525, 425);
			// cy.visit(customURLHotelOnly({}), {timeout:10000});
			cy.wait(10000);
			cy.get('[data-cy="calendarDateFromTo"] > .block-subtitle-content-item', {
				timeout: 10000
			}).then(text => {
				const innerText = text.get(0).innerText.split('-');
				console.log('text', text);
				console.log('innerText', innerText);
				const [dateFrom, dateTo] = innerText;

				console.log('dateTo', dateTo);
				expect(dateFrom).to.have.contain(
					verifyDateFunction(FROM_DATE_DEFAULT).replaceAll('.', '')
				);
				expect(dateTo).to.have.string(
					verifyDateFunction(TO_DATE_DEFAULT).replaceAll('.', '')
				);
			});
		});
	});


  context('TEST FROM/TO STANDART',()=>{

  it('Visit site travely24 = standart', () => {
    cy.viewport(425, 525);
    cy.visit(customURL({ fdUrlFrom: FD_URL_FROM, fdUrlTo: FA_URL_TO }));
  });

  it('- Test from/to in site text', () => {
    cy.viewport(425, 525);
    cy.visit(customURL({ fdUrlFrom: FD_URL_FROM, fdUrlTo: FA_URL_TO }));
    cy.wait(5000)
    cy.get(
      '[data-cy="buttonFlightChoose"]',
      {
        timeout: 100000,
      }
    ).click({force:true})

	cy.wait(2000)

    cy.get('[data-cy="firstDepartureAir"]',{timeout:10000}).then((textFrom) => {
      const from = textFrom.get(0).innerText
      console.log('from',from);
      expect(from).to.include(FD_URL_FROM)
    })

    cy.get('[data-cy="firstArrivalAir"]').then(textTo => {
      const to = textTo.get(0).innerText
      console.log('to',to);
      expect(to).to.include(FA_URL_TO)
    })
  });


  it('Test change  another offer', () => {
    cy.viewport(425, 525);
    cy.visit(customURL({ fdUrlFrom: FD_URL_FROM, fdUrlTo: FA_URL_TO }));
    cy.wait(7000)
    cy.get(
      '[data-cy="buttonFlightChoose"]',
      {
        timeout: 100000,
      }
    ).click({force:true})
cy.wait(2000)

    cy.get('#showedOtherFlights1', {
      timeout: 10000,
    }).click({force:true})
	cy.wait(2000)

    cy.get('[data-cy="buttonConfirmationFly"]').click({force:true})
  });

  it('Visit without FROM ', () => {
    cy.viewport(425, 525);
    cy.visit(customURL({ fdUrlTo: FA_URL_TO }));
	cy.wait(8000)
    cy.get(
        '[data-cy="buttonFlightChoose"]',
        {
          timeout: 100000,
        }
      ).click({force:true})
	  cy.wait(2000)
      cy.get('[data-cy="firstDepartureAir"]',{timeout:10000}).then((textFrom) => {
        const from = textFrom.get(0).innerText
        console.log('from',from);
        expect(from).to.have.string(FROM_DEFAULT)
      });
      cy.get('[data-cy="firstArrivalAir"]').then(textTo => {
        const to = textTo.get(0).innerText
        console.log('to',to);
        expect(to).to.have.string(FA_URL_TO)
      })
	});

  
      it.only('Visit without TO ', () => {
        cy.viewport(425, 525);
        cy.visit(customURL({ fdUrlFrom: FD_URL_FROM }));
		cy.wait(8000)
        cy.get(
            '[data-cy="buttonFlightChoose"]',
            {
              timeout: 100000,
            }
          ).click({force:true})
          cy.wait(10000)
          cy.get('[data-cy="firstDepartureAir"]',{timeout:10000}).then((textFrom) => {
            const from = textFrom.get(0).innerText
            console.log('from',from);
            expect(from).to.have.string(FD_URL_FROM)
          });
          cy.get('[data-cy="firstArrivalAir"]').then(textTo => {
            const to = textTo.get(0).innerText
            console.log('to',to);
            expect(to).to.have.string(TO_DEFAULT)
          })
    })
    it('Visit without FROM and TO ', () => {
      cy.viewport(425, 525);
      cy.visit(customURL({}));
	  cy.wait(10000)
      cy.get(
          '[data-cy="buttonFlightChoose"]',
          {
            timeout: 100000,
          }
        ).click({force:true})
        cy.wait(2000)
        cy.get('[data-cy="firstDepartureAir"]',{timeout:10000}).then((textFrom) => {
          const from = textFrom.get(0).innerText
          console.log('from',from);
          expect(from).to.have.string(FROM_DEFAULT)
        });
        cy.get('[data-cy="firstArrivalAir"]').then(textTo => {
          const to = textTo.get(0).innerText
          console.log('to',to);
          expect(to).to.have.string(TO_DEFAULT)
        })
  })
  

})
});
