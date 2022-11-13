import {handlerURL} from '../helperFunctions/main'
import { verifyDateFunction } from '../helperFunctions/date';

import { 
	BASE_URL_def,
TOUR_ID_def,
ADULT_def,
CHILDREN_def,
DATE_FROM_def,
DATE_TO_def,
PRODUCT_TYPE_def,
} from '../variable/main.js'



const dayDateFrom = new Date(DATE_FROM_def).getDate();
const dayDateTO = new Date(DATE_TO_def).getDate();

const URL =
	'https://www.travely24.com/api/?r=hb&hotels=1&hotelDetails=0&period=2&startDate=1667599200&adults=2&hotelsStock=50&lat=39.76482&lng=2.713003&radius=450';
const ADULTS = '2'
const CHILDREN1 = '4,13'
const CHILDREN2 = '13'
const CHILDREN3 = '10'
const DATE_FROM = '2022-11-05'
const DATE_TO = '2022-11-07'
const PRODUCT_TYPE = 'hotelonly'

const title = 'Mallorca - Soller, zauberhaftes Städtchen mit Bergpanorama'

// const expectedDataFrom = new Date(DATE_FROM).getDate()
// const expectedDataTo = new Date(DATE_TO).getDate()

// const validDataToTestCalendar = (date) => {
//   return new Date(date).toLocaleDateString('de-DE',
//   {
//     month :'numeric',
//     year:'numeric',
//     day:'numeric'
//   })
// }

// const validDateinSite = (date) => {
//   return new Date(date).toLocaleDateString('de-DE', {
//     year: 'numeric',
//     day: 'numeric',
//     month: 'numeric',
//   })
// }

describe('Hotel only', () => {
	let lowPriceBeds = 999999;
	let lowPriseProductType = 99999;
    let total = 0;
	
		"Dieses komfortable Hotel liegt in Soller. Das Hotel umfasst insgesamt 25 Zimmer. Zusätzlich bietet die Einrichtung einen Wi-Fi-Internetzugang. Ca'l Bisbe bietet eine 24h-Rezeption, so dass auf die Anliegen der Gäste jederzeit eingegangen wird. Ca'l Bisbe bietet auch auf Anfrage keine Kinderbetten.";
	
        it.only('Checked title',()=>{
            cy.get('.block-single-content-top-title',
             {
               timeout: 15000
             }).should('have.text',title)
           })
  it.only('Cheking boxex',()=>{
	cy.visit(handlerURL())
    cy.get('#withFlight').should(PRODUCT_TYPE === 'hotelonly' ? 'not.be.checked' : 'be.checked')
  })




////////////////////////////////////////////////////////////////////////////////////////////////////// ------------------------------------------------------------------------------
		it.only('Test text in calendar', () => {
			
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

		  it.only('Get active days in calendar', () => {
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

		})

	  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		 
	  
	//   it('Test active in calendar this days in url', () => {
	// 		const listDaysActive = arrayCardsDay.join();
	// 		expect(listDaysActive).to.have.string(dayDateFrom);
	// 		expect(listDaysActive).to.have.string(dayDateTO);
	// 	  });


		
		
		  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    >>>>>>>> UNITtestDescriptionMatchText <<<<<<<<<<<


// 		  it('TEST API TITLE', () => {
// 		cy.viewport(1900, 2200);

// 		cy.visit(
// 			'https://www.travely24.com/de/tours/1414?hid=29248&period=2&adults=2&children&fa=PMI&sDate=2022-11-05&eDate=2022-11-07&productType=hotelonly&roomType=DBT.BL-1&boardType=BB&PT=hotelonly&flight=EW583%7CEW582%7C',
// 			{ timeout: 55000 }
// 		);
// 		cy.intercept({
// 			method: 'GET',
// 			url: 'https://www.travely24.com/api/?r=hb&hotels=1&hid=29248&hotelDetails=1'
// 		}).as('getDescription');
// 		cy.wait('@getDescription', { timeout: 15000 }).then(description => {
// 			console.log('description.response.body.hotel ', description);
// 			let improvedApi = JSON.parse(description.response.body.trim());
// 			console.log(improvedApi.hotel.description.content);
// 		} )
//     ;
// 		// cy.get('.block-single-content-text-block').should('contain.text', hotelDescribe);

// 		cy.get('.view-more', { timeout: 10000 }).click({ force: true, multiple: true });
//   })

////////////////////////////////////////////////////////////////////////////////////////////////////		//------------------------------------------------------------------------------



// it('TEST POPUP CANCELATION',()=>{
//   cy.visit(
//     'https://www.travely24.com/de/tours/1414?hid=29248&period=2&adults=2&children&fa=PMI&sDate=2022-11-05&eDate=2022-11-07&productType=hotelonly&roomType=DBT.BL-1&boardType=BB&PT=hotelonly&flight=EW583%7CEW582%7C',
//     { timeout: 55000 }
//   );
// 		cy.intercept({
// 			method: 'GET',
// 			url: 'https://www.travely24.com/api/?r=hb&hotels=1&hid=29248&hotelDetails=0&period=2&startDate=1667606400&adults=2&children=0'
// 		}).as('getPopapPrice');
// 		cy.wait('@getPopapPrice', { timeout: 16000 }).then(onePopap => {
// 			console.log('onePopap.innerText,onePopap.innerText',onePopap);
// 		});

// 		cy.contains('Alle Zimmerangebote zeigen ', { timeout: 15000 }).click({ force: true });
// 		cy.get('.drop-tour-apartments-content-right  .collapseCategory', { timeout: 10000 }).click({
// 			force: true,
// 			multiple: true
// 		});
// 		cy.get('.cancellation').first().trigger('mouseover', { force: true });
// 		cy.get('.popper > div > span').each(element => {
// 			// cy.wrap(element)
// 			// const a = element.get().innerText
// 			const price = element[0].firstChild.innerHTML;
// 			const textPopap = element[0].outerText;
// 			console.log('price', price); 
// 			console.log('textPopap', textPopap);
// 			expect(textPopap).to.include(price);
// 		});
//   })

//////////////////////////////////////////////////////////////////////////////////////////////////////------------------------------------------------------------------------------------------------------------------------------------------------------------


// it.only('TEST MATCHING TEXT IN BLOCK TITLE',()=>{

//   cy.visit('https://www.travely24.com/de/tours/1414?hid=29248&period=2&adults=2&children&fa=PMI&sDate=2022-11-05&eDate=2022-11-07&productType=hotelonly&roomType=DBT.BL-1&boardType=BB&PT=hotelonly&flight=EW583|EW582|',{ timeout: 35000 } )
// 		cy.intercept('GET','https://www.travely24.com/api/?p=1414').as('l')
 
//   cy.wait('@l',{ timeout:18000}) .then(titleText => {
// 			console.log('titleText.response.body.tourDetailsTop.title' , titleText.tourDetailsTop.title)
// 			const titleHotel = titleText.tourDetailsTop.title;
// 			expect(titleHotel).to.have.text('Mallorca - Soller, zauberhaftes Städtchen mit Bergpanorama')
//      // cy.get(':nth-child(1) > .block-single-content-top-title').should('contain',titleText.response.body.tourDetailsTop.title)
// 		})
   
// })

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	

	// it.only('TEST LowPriceHotelBeds AND MATCHING IN total-price BLOCK', () => {
	// 	cy.visit(
	// 		'https://www.travely24.com/de/tours/1414?hid=448737&period=2&adults=2&children&fa=PMI&sDate=2022-11-05&eDate=2022-11-07&productType=hotelonly&roomType=CAA++U&boardType=OV&PT=hotelonly&flight=EW583|EW582|'
	// 	,{timeout:50000});

	// 	cy.intercept({
	// 		method: 'GET',
	// 		url: 'https://www.travely24.com/api/?r=hb&hotels=1&hid=448737&hotelDetails=0&period=2&startDate=1667606400&adults=2&children=0'
	// 	}).as('hotelsBeds');

	// 	cy.wait('@hotelsBeds', { timeout: 40000 }).then(hotelsBeds => {
	// 		console.log('hotelsBeds.response.body.hotels ', hotelsBeds);
	// 		let a = JSON.parse(hotelsBeds.response.body.trim());
	// 		console.log('a   ',a);
	// 		let roomsArr = a.hotels.hotels[0].rooms;

	// 		console.log('roomsArr   ', roomsArr);

	// 		roomsArr.forEach(element => {
	// 			element.rates.forEach(rate => {
	// 				console.log('rate.sellingRate', rate.sellingRate);
	// 				lowPriceBeds =
	// 					lowPriceBeds > rate.sellingRate ? rate.sellingRate : lowPriceBeds;
	// 			});
	// 		});
	// 		console.log('lowPriceBeds', lowPriceBeds);
	// 		roomsArr
	// 			.forEach(rooms => {
	// 				console.log('rooms !', rooms);
	// 				let roomRates = rooms.rates;
	// 				let res = [];
	// 				for (let i = 0; i < roomRates.length; i++) {
	// 					console.log('roomRates[i]', roomRates[i].sellingRate);
	// 					res.push(roomRates[i].sellingRate);
	// 				}
	// 				const sellingRateMin = Math.min(...res);
	// 				console.log('sellingRateMin', sellingRateMin);
	// 				console.log('roomRates', roomRates);
	// 			})


				// .then(hotelList => {
				// 	console.log('hotelList ---', hotelList.response.body.hotelList);
				// });
			// cy.get('.list-hotel-wrapper .block-search-input', {
			// 	timout: 20000
			// });
			// cy.get('.list', { timout: 20000 }).then(list => {
			// 	console.log('List -----', list.length);
			// 	cy.wrap(list).expect(list).console.log(list.length);
			// });
		
	// cy.get('[placeholder="Search"]',{timeout:15000}).click({force:true}).type('Hotel Soller Plaza')
	// cy.get('#1016251',{timeout:15000}).contains('Hotel Soller Plaza',{timeout:15000}).click({force:true})
	// cy.get('.show-more-rooms',{timeout:15000}).click({force:true , multiple:true})
	// 	cy.intercept({
	// 		method: 'GET',
	// 		url: 'https://connector.traffics.de/v3/rest/offers/?navigation=1%2C1000%2C1&giataIdList=448737&searchDate=9%2C11&fromDate=9&toDate=11&duration=2&adults=2&optionLists=roomId,roomType&tourOperatorList=1AV,5VF,ALD,ALDX,ALL,AME,ANEX,ATID,ATIS,ATK,ATOU,AWT,BAV,BCH,BDV,BENX,BIG,BU,BUM,BXCH,BYE,CBM,CDA,CDHB,CFI,CHR,COR,CPK,DANS,DER,DES,DTA,ECC,ELVI,ERV,ETD,ETI,FALK,FER,FIT,FLT,FLYD,FOR,FTI,FTV,FUV,GULE,HCON,HEX,HMR,HTH,HUC,ICC,IHOM,ITS,ITSB,ITSX,ITT,JAHN,JANA,KAE,LMX,LMXI,MON,MPR,MWR,NOSO,OGE,OGO,OLI,PALH,PALM,PHX,RIVA,RMS,RSD,SCAR,SEHO,SIT,SLR,SLRD,SNOW,SPRI,STT,TJAX,TRAL,TREX,TUIS,TVR,UPS,VFLY,VTO,VTOI,WOL,XALL,XANE,XBIG,XECC,XJAH,XMWR,XOLI,XPOD,XPUR,TUID,XFTI,X5VF,XDER&dontDecorate=true&productType=hotelonly'
	// 	}).as('traffics')

	// 	cy.wait('@traffics', { timeout: 40000 }).then(hotels => {
	// 		let a = hotels.response.body.offerList;
	// 		total = Math.min(lowPriseProductType, lowPriceBeds);
	// 		console.log('total', total);
	// 		a.forEach(element => {
	// 			console.log(element.totalPrice.value);
	// 			lowPriseProductType =
	// 				lowPriseProductType > element.totalPrice.value
	// 					? element.totalPrice.value
	// 					: lowPriseProductType;
	// 		});
	// 		console.log('lowPriseProductType', lowPriseProductType);
    // })

		
	// 	});
	// 	cy.get('.totalPriceBlock > span',{timeout:25000}).then(price => {
	// 		const text = price.get(1).innerText;
	// 		console.log('text', text);
	// 		let priceText = lowPriceBeds + ' €';
	// 		console.log('priceText',priceText);
	// 		expect(priceText).to.have.contain(lowPriceBeds);
	// 	});


	
	// });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// it('TEST lowPriseProductType AND MATCHING in .drop-tour-apartments-content-right BLOCK', () => {
    // ТУТ УЖЕ СЫЛКА ГДЕ ЕСТЬ ПРОДУКТ ХОТЕЛ
	// ^
	// ^
	// ^
	// |
	// |	
	
		
	// cy.get('.block-contents-wrapper',{timeout:20000}).click({force:true , multiple:true})
	

	// 		cy.contains('Alle Zimmerangebote zeigen ', { timeout: 15000 }).click({ force: true });

	// 		cy.get('.drop-tour-apartments-content-right  .collapseCategory', {
	// 			timeout: 10000
	// 		}).click({ force: true, multiple: true });
	// 		cy.get('.option-price')
	// 			.first()
	// 			.should('have.text', total + ',00' + ' € ');

	// 		cy.get('#btn00DBTBL-1hotelonly')
	// 			.invoke('attr', 'class')
	// 			.should('include', 'active')
	// 			.then(classValue => {
	// 				expect(classValue).to.contain('active');
	// 			});
	// 		cy.get('#btn00DBTBL-1hotelonly')
	// 			.contains(' Gewählte Option')
	// 			.parent()
	// 			.should($el => {
	// 				let title = ' Gewählte Option';
	// 				let price = total + ',00' + ' € ';
	// 				let priceText = price + '' + title;
	// 				console.log('priceText', priceText);
	// 				let spliceText = priceText.slice(title, price);
	// 				spliceText = price;
	// 				console.log('spliceText', spliceText);
	// 				const text = $el.get(0);
	// 				console.log('text', text);
	// 				expect(text).to.have.text(priceText);
	// 			});
	// 	});
	// });


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// //   it('Checked title',()=>{
// //     cy.get('.block-single-content-top-title',
// //     {
// //       timeout: 15000
// //     }).should('have.text',title)
// //   })

// //   it('Cheking boxex',()=>{
// //     cy.get('#withFlight').should(PRODUCT_TYPE === 'hotelonly' ? 'not.be.checked' : 'be.checked')
// //   })

// // })

// // context('CHILDREN AND ADULT',()=>{

// // const childrenNumber = CHILDREN.split(',').length
// // const adultNumber = Number(ADULTS)
// // const newArray = Array.from(Array(adultNumber).keys() )
// //   let childSize = null
// //   let adultSize = null
// //   let childAndAdultTogetherSize = null

// //   it('test url childen',()=>{

// //     cy.get('.travelers > span' ,
// //     {
// //       timeout:10000
// //     }).then( (text) => {

// //       console.log('childrenNumber +  adultNumber' + (adultNumber + childrenNumber));
// //      childAndAdultTogetherSize = parseInt(text.get(0).innerText)
// //          expect(childAndAdultTogetherSize).to.equal(childrenNumber + adultNumber)
// //     }).click(
// //       {force:true}
// //     )
// //     cy.get(':nth-child(1) > .block-plus-minus > .block-plus-minus__count',{
// //       timeout:10000
// //     }).then( (textAdult) => {
// //       adultSize = parseInt(textAdult.get(0).innerText)
// //       expect(adultSize).to.equal(adultNumber)
// //     })
// //     cy.get(':nth-child(2) > .block-plus-minus > .block-plus-minus__count',{
// //       timeout:10000
// //     }).then( (textChild) => {
// //       childSize = parseInt(textChild.get(0).innerText)
// //       expect(childSize).to.equal(adultNumber)
// //     })
// //   })
// //     it('children and adult together',()=>{
// //       expect(childSize + adultSize).to.equal(adultNumber + childrenNumber )
// //     })
// // })

// // it('Manual delete',()=>{
// // cy.reload();
// // cy.get('.travelers > span',{
// //   timeout:10000
// // }).click({
// //   force:true
// // })

// // })

// // context('CALENDAR',()=>{
// //   it('Checked calendar title date',()=>{

// // cy.get('.item-tour-form-column > .block-fly-text').then( text => {
// //   const TEXT = text.get(0).innerText.split(/\n/)
// //   console.log("TEXT in SITE - " + TEXT);
// //   const [dateFrom,dateTo] = TEXT
// //   console.log(" dateFrom - " + dateFrom);
// //   console.log(" dateTo - " + dateTo);

// //   const siteDatafrom = validDataToTestCalendar(dateFrom)
// //   console.log('siteDatafrom  - ' + siteDatafrom);
// // expect(siteDatafrom).to.have.string(validDataToTestCalendar(DATE_FROM))

// //   const siteDataTo = validDataToTestCalendar(dateTo)
// // console.log(" siteDataTo - " + siteDataTo)
// //   expect(siteDataTo).to.have.string(validDataToTestCalendar(DATE_TO))
// // })
// //   })
// // })

// // const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

// // const calendarDataFrom = new Date(DATE_FROM).toLocaleDateString(options)
// // const calendarDataFrom2 = format(new Date(DATE_FROM , 'MMM'))
// // cy.get('.item-tour-form-column > .block-fly-text' , {
// //   timeout:20000
// // }).then( text => {
// //     const dateString = text.get(0).innerText.split(/\n/)
// //   const [from , to] = dateString

// //  const siteDataFrom = validDateinSite(from)
// //  expect(siteDataFrom).to.have.string(validDateinSite(DATE_FROM))

// //  const siteDataTo = validDateinSite(to)
// //   expect(siteDataTo).to.have.string(validDateinSite(DATE_TO))
// // })
// // })

// //       it('get active days from calendar to arrActive',()=>{
// //         console.log('STARTT');
// //         cy.get('.swiper-slide',{
// //           timeout: 10000
// //         }).then( (text) => {
// //           cy.wrap()
// //             const template = [].slice.call(text.children())
// //             console.log('template '+ template );
// //             template.forEach((item) => {
// //               console.log('item !!!! '+ item);
// //               if(item.className === 'block-calendar-list-item active'){
// //                 const arrActive = item.children[1].children[0].innerText
// //                 console.log("arrActive " + arrActive);
// //                       calendarDays.push(arrActive)
// //                       console.log("calendarDays "+ calendarDays);
// //               }
// //             });
// //         })
// //     })
// //        it('test to compare active day with ours data',()=>{
// //           const listActiveDays = calendarDays.join()
// //           console.log("!!!! " + calendarDays);
// //           expect(listActiveDays).to.have.string(expectedDataTo)
// //             expect(listActiveDays).to.have.string(expectedDataFrom)
// //         })
// //   })
// // })
