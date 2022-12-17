//в эту функию надо кидать массив который пришел с АЕРа (она его получает и трансформирует в структуру траффиска)
export const AERprocessFareModel = (e, prevOfferCode = null) => {
	let totPrice = 0;
	let legs = e.legList.length;
	let segmentsLast = e.legList[legs - 1].itineraryList[0].segmentList.length;
	let pricePerson = e.passengerTypeFareList[0].priceList.toFixed(2);
	e.passengerTypeFareList.map(a => {
		totPrice += a.priceList * a.count;
	});
	totPrice = totPrice.toFixed(2);
	let _offers = [];
	let _offersIn = [];
	let _offersOut = [];
	let _offersOutId = 0;
	let _offersInId = 0;
	let _offersFlyingTimeInMinutesOut = 0;
	let _offersFlyingTimeInMinutesIn = 0;

	e.legList[0].itineraryList.map(e2 => {
		if (e2.flyingTimeInMinutes) {
			_offersFlyingTimeInMinutesOut = e2.flyingTimeInMinutes;
		} else {
			e2.segmentList.map(s => {
				if (s.flyingTimeInMinutes) {
					_offersFlyingTimeInMinutesOut += s.flyingTimeInMinutes;
				}
			});
		}
		_offersOut[_offersOutId] = {
			outboundLegList: e2.segmentList,
			id: e2.id,
			flyingTimeInMinutes:
				_offersFlyingTimeInMinutesOut > 0
					? convertMinsToHrsMins(_offersFlyingTimeInMinutesOut)
					: ''
		};
		_offersOutId++;
	});
	e.legList[1].itineraryList.map(e2 => {
		if (e2.flyingTimeInMinutes) {
			_offersFlyingTimeInMinutesIn = e2.flyingTimeInMinutes;
		} else {
			e2.segmentList.map(s => {
				if (s.flyingTimeInMinutes) {
					_offersFlyingTimeInMinutesIn += s.flyingTimeInMinutes;
				}
			});
		}
		_offersIn[_offersInId] = {
			inboundLegList: e2.segmentList,
			id: e2.id,
			flyingTimeInMinutes:
				_offersFlyingTimeInMinutesIn > 0
					? convertMinsToHrsMins(_offersFlyingTimeInMinutesIn)
					: ''
		};
		_offersInId++;
	});
	_offersOut.map(oo => {
		_offersIn.map(oi => {
			let ooTime = oo.flyingTimeInMinutes;
			let oiTime = oi.flyingTimeInMinutes;
			let flightOfferId = 'F';
			let ooleglist = oo.outboundLegList.map(ol => {
				const fleg = AERlegToTraffics(ol, 'outbound', ooTime);
				flightOfferId += '-' + fleg.flightCarrierCode + '-' + fleg.flightNumber;
				return fleg;
			});
			let ioleglist = oi.inboundLegList.map(ol => {
				const fleg = AERlegToTraffics(ol, 'inbound', oiTime);
				flightOfferId += '-' + fleg.flightCarrierCode + '-' + fleg.flightNumber;
				return fleg;
			});

			_offers.push({
				code: e.fareId + '|' + oo.id + '|' + oi.id,
				hotelOffer: null,
				personPrice: { value: pricePerson, currency: 'EUR' }, //2do ????
				productType: 'flight',
				serviceOffer: e.ruleSet,
				totalPrice: { value: totPrice, currency: 'EUR' },
				tourOperator: null,
				transferOffer: null,
				travelDate: {
					fromDate: ooleglist[0].departureDate,
					toDate: ioleglist[0].departureDate,
					duration: '---' //???
				},
				travelType: '',
				flightOffer: {
					code: e.fareId + '|' + oo.id + '|' + oi.id,
					flightOfferId: flightOfferId,
					fareId: e.fareId,
					prevOfferCode: prevOfferCode,
					outboundItineraryId: oo.id,
					inboundItineraryId: oi.id,
					source: 'aer',
					personPrice: null,
					personPriceDifference: null,
					totalPrice: { value: totPrice, currency: 'EUR' },
					travelDate: {
						fromDate: ooleglist[0].departureDate,
						toDate: ioleglist[0].departureDate,
						duration: '---' //???
					},
					flight: {
						departureAirport: {
							code: oo.outboundLegList[0].departure.iata,
							name: oo.outboundLegList[0].departure.name
						},
						arrivalAirport: {
							code: oo.outboundLegList[oo.outboundLegList.length - 1].destination
								.iata,
							name: oo.outboundLegList[oo.outboundLegList.length - 1].destination.name
						},
						outboundLegList: ooleglist,
						inboundLegList: ioleglist,
						outboundEstimatedElapsedTime: ooTime,
						inboundEstimatedElapsedTime: oiTime,
						outboundSupplier: null,
						inboundSupplier: null,
						outboundDirectFlight: oo.outboundLegList.length == 1,
						inboundDirectFlight: oi.inboundLegList.length == 1,
						outbound: {
							bookingClass: '',
							travelClass: '',
							tariff: '',
							sequence: '',
							stopovers: oo.outboundLegList.length - 1,
							estimatedElapsedTime: ooTime,
							legList: oo.ooleglist
						},
						inbound: {
							bookingClass: '',
							travelClass: '',
							tariff: '',
							sequence: '',
							stopovers: oi.inboundLegList.length - 1,
							estimatedElapsedTime: oiTime,
							legList: oi.ioleglist
						}
					}
				}
			});
		});
	});
	return _offers;
};

export const AERlegToTraffics = (l, type, time) => {
	return {
		departureAirportCode: l.departure.iata,
		departureAirportName: l.departure.name,
		arrivalAirportCode: l.destination.iata,
		arrivalAirportName: l.destination.name,
		departureDate:
			l.departureDate.year +
			'-' +
			humanHours(l.departureDate.month) +
			'-' +
			humanHours(l.departureDate.day),
		arrivalDate:
			l.arrivalDate.year +
			'-' +
			humanHours(l.arrivalDate.month) +
			'-' +
			humanHours(l.arrivalDate.day),
		departureTime:
			humanHours(l.departureTimeOfDay.hour) + ':' + humanHours(l.departureTimeOfDay.minute),
		arrivalTime:
			humanHours(l.arrivalTimeOfDay.hour) + ':' + humanHours(l.arrivalTimeOfDay.minute),
		baggageAllowance: l.baggageAllowance,
		cabinClass: l.cabinClass,
		numberOfTechnicalStops: l.numberOfTechnicalStops,
		flightCarrierCode: l.marketingAirline.iata,
		flightCarrierName: l.marketingAirline.name,
		equipmentType: l.equipmentType?.code || null,
		flightNumber: l.flightNumber,
		estimatedElapsedTime: time,
		seatsLeft: '',
		connectingTime: ''
	};
};

export function humanHours(v) {
	return ('0' + v).slice(-2);
}
export function convertMinsToHrsMins(_minutes) {
	let minutes = parseFloat(_minutes);
	let h = Math.floor(minutes / 60);
	let m = minutes % 60;
	h = h < 10 ? '0' + h : h;
	m = m < 10 ? '0' + m : m;
	return h + ':' + m;
}

//после того как ты трансформировал ответ от аера в структуру траффикса нужно его сравнить с уже имеющимися траффикс полетами и оставить только уникальные и самые дешевые
export const processPartOfFlights = (response, type) => {
	let aerOffers = [];
	console.log('processPartOfFlights', response.data.availableFareList);
	if (response.data.availableFareList.length !== 0) {
		response.data.availableFareList.map(fare => {
			aerOffers.push(...AERprocessFareModel(fare, null, type));
		});
		_offers = compareFlightPrices(_offers, aerOffers, 'traffics2aer');
		return _offers;
	}
};
//функция в которую передаешь два массива и она возвращает уже готовый результат
export const compareFlightPrices = (o1, o2, type) => {
	if (type == 'traffics2aer') {
		let o1UniqueOffers = [];
		let responseAERFlightOfferIds = {};
		let retArr = [];
		o2.map((o, i) => {
			responseAERFlightOfferIds[o.flightOffer.flightOfferId] = i;
		});
		console.log('compareFlightPrices: ', responseAERFlightOfferIds);

		o1.map((o, i) => {
			if (
				!o.flightOffer.flight.outboundLegList.length ||
				!o.flightOffer.flight.inboundLegList.length
			)
				return;
			let oPrice = parseFloat(o.personPrice.value);
			let flightOfferId = 'F';
			o.flightOffer.flight.outboundLegList.map(ol => {
				flightOfferId += '-' + ol.flightCarrierCode + '-' + ol.flightNumber;
			});
			o.flightOffer.flight.inboundLegList.map(ol => {
				flightOfferId += '-' + ol.flightCarrierCode + '-' + ol.flightNumber;
			});
			console.log('typeof o1UniqueOffers[flightOfferId]',typeof o1UniqueOffers[flightOfferId]);
			if (typeof o1UniqueOffers[flightOfferId] == 'undefined')
				o1UniqueOffers[flightOfferId] = oPrice;
			else if (o1UniqueOffers[flightOfferId] <= oPrice) {
				return;
			}
			if (
				typeof responseAERFlightOfferIds[flightOfferId] !== 'undefined' &&
				o2[responseAERFlightOfferIds[flightOfferId]]
			) {
				let iso2Cheaper =
					parseFloat(o2[responseAERFlightOfferIds[flightOfferId]].personPrice.value) <
					oPrice;
					console.log('iso2Cheaper',iso2Cheaper);
				if (iso2Cheaper) {
					retArr.push(o2[responseAERFlightOfferIds[flightOfferId]]);
					// customLog(' CHEEAAPER ', flightOfferId)
				} else retArr.push(o);
				delete o2[responseAERFlightOfferIds[flightOfferId]];
			} else retArr.push(o);
		});
		return [...retArr, ...o2.filter(o => o !== null)];
	}
};