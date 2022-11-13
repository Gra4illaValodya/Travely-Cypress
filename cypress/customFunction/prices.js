
const compareFlightPrices = (o1, o2, type) => {
	if (type == 'traffics2aer') {
		let o1UniqueOffers = []

		let responseAERFlightOfferIds = {}
		let retArr = []
		o2.map((o, i) => {
			responseAERFlightOfferIds[o.flightOfferId] = i
		})

		o1.map((o, i) => {
			if (
				!o.flightOffer.flight.outboundLegList.length ||
				!o.flightOffer.flight.inboundLegList.length
			)
				return
			let oPrice = parseFloat(o.personPrice.value)
			let flightOfferId = 'F'
			o.flightOffer.flight.outboundLegList.map(ol => {
				flightOfferId += '-' + ol.flightCarrierCode + '-' + ol.flightNumber
			})
			o.flightOffer.flight.inboundLegList.map(ol => {
				flightOfferId += '-' + ol.flightCarrierCode + '-' + ol.flightNumber
			})
			if (typeof o1UniqueOffers[flightOfferId] == 'undefined')
				o1UniqueOffers[flightOfferId] = oPrice
			else if (o1UniqueOffers[flightOfferId] <= oPrice) {
				return
			}

			if (
				typeof responseAERFlightOfferIds[flightOfferId] !== 'undefined' &&
				o2[responseAERFlightOfferIds[flightOfferId]]
			) {
				let iso2Cheaper =
					parseFloat(
						o2[responseAERFlightOfferIds[flightOfferId]].personPrice.value
					) < oPrice
				if (iso2Cheaper) {
					retArr.push(o2[responseAERFlightOfferIds[flightOfferId]])
					// customLog(' CHEEAAPER ', flightOfferId)
				} else retArr.push(o)
				delete o2[responseAERFlightOfferIds[flightOfferId]]
			} else retArr.push(o)
		})
		return [...retArr, ...o2.filter(o => o !== null)]
	}
}
trafficsOffers.map(el => {
	el.flightOffer.source = 'traffics'
})
offerList = compareFlightPrices(trafficsOffers, AEROffers, 'traffics2aer')

const getFlightByPackage = obj => {
	const flight = obj.flightOffer.flight
	let string = ''

	flight.inboundLegList.map(({ flightCarrierCode, flightNumber }, i) => {
		string =
			string +
			flightCarrierCode +
			flightNumber +
			(i !== flight.outboundLegList.length - 1 ? '<-' : '|')
	})
	flight.outboundLegList.map(({ flightCarrierCode, flightNumber }, i) => {
		string =
			string +
			flightCarrierCode +
			flightNumber +
			(i !== flight.outboundLegList.length - 1 ? '->' : '|')
	})
	return string
}