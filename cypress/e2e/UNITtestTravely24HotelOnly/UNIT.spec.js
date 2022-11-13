

describe('ds',()=>{
    let lowPriceBeds = 999999;
	let lowPriseProductType = 99999;
    let total = 0;



it.only('TEST lowPriseProductType AND MATCHING in .drop-tour-apartments-content-right BLOCK', () => {
    // ТУТ УЖЕ СЫЛКА ГДЕ ЕСТЬ ПРОДУКТ ХОТЕЛ
	// ^
	// ^
	// ^
	// |
	// |	
	cy.visit('https://www.travely24.com/de/tours/1414?hid=448737&period=2&adults=2&children&fa=PMI&sDate=2022-11-05&eDate=2022-11-07&productType=hotelonly&roomType=DB1F&boardType=UF&PT=hotelonly&flight=EW583|EW582|',{timeout:30000})
		
	// cy.get('.block-contents-wrapper',{timeout:20000}).click({force:true , multiple:true})
	
	cy.get('[placeholder="Search"]',{timeout:15000}).click({force:true}).type('Hotel Soller Plaza')
	cy.get('#1016251',{timeout:25000}).contains('Hotel Soller Plaza',{timeout:15000}).click({force:true})
	cy.get('.show-more-rooms',{timeout:15000}).click({force:true , multiple:true})
		cy.intercept({
			method: 'GET',
			url: 'https://connector.traffics.de/v3/rest/offers/?navigation=1%2C1000%2C1&giataIdList=1016251&searchDate=9%2C11&fromDate=9&toDate=11&duration=2&adults=2&optionLists=roomId,roomType&tourOperatorList=1AV,5VF,ALD,ALDX,ALL,AME,ANEX,ATID,ATIS,ATK,ATOU,AWT,BAV,BCH,BDV,BENX,BIG,BU,BUM,BXCH,BYE,CBM,CDA,CDHB,CFI,CHR,COR,CPK,DANS,DER,DES,DTA,ECC,ELVI,ERV,ETD,ETI,FALK,FER,FIT,FLT,FLYD,FOR,FTI,FTV,FUV,GULE,HCON,HEX,HMR,HTH,HUC,ICC,IHOM,ITS,ITSB,ITSX,ITT,JAHN,JANA,KAE,LMX,LMXI,MON,MPR,MWR,NOSO,OGE,OGO,OLI,PALH,PALM,PHX,RIVA,RMS,RSD,SCAR,SEHO,SIT,SLR,SLRD,SNOW,SPRI,STT,TJAX,TRAL,TREX,TUIS,TVR,UPS,VFLY,VTO,VTOI,WOL,XALL,XANE,XBIG,XECC,XJAH,XMWR,XOLI,XPOD,XPUR,TUID,XFTI,X5VF,XDER&dontDecorate=true&productType=hotelonly'
		}).as('productHotel')

		cy.wait('@productHotel', { timeout: 40000 }).then(hotels => {
			let a = hotels.response.body.offerList;
			total = Math.min(lowPriseProductType, lowPriceBeds);
			console.log('total', total);
			a.forEach(element => {
				console.log(element.totalPrice.value);
				lowPriseProductType =
					lowPriseProductType > element.totalPrice.value
						? element.totalPrice.value
						: lowPriseProductType;
			});
			console.log('lowPriseProductType', lowPriseProductType);
    })


			cy.contains('Alle Zimmerangebote zeigen ', { timeout: 15000 }).click({ force: true });

			cy.get('.drop-tour-apartments-content-right  .collapseCategory', {
				timeout: 10000
			}).click({ force: true, multiple: true });
			cy.get('.option-price')
				.first()
				.should('have.text', total + ',00' + ' € ');

			cy.get('#btn00DBTBL-1hotelonly')
				.invoke('attr', 'class')
				.should('include', 'active')
				.then(classValue => {
					expect(classValue).to.contain('active');
				});
			cy.get('#btn00DBTBL-1hotelonly')
				.contains(' Gewählte Option')
				.parent()
				.should($el => {
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
	
    })