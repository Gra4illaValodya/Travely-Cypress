import {
  ADULTS_DEFAULT,
  CHILDREN_DEFAULT,
  FROM_DATE_DEFAULT,
  FROM_DEFAULT,
  TO_DATE_DEFAULT,
  TO_DEFAULT,
  PRODUCT_TYPE_HOTEL,
  TOUR_DEFAULT, 
  HID_DEFAULT,
  PERIOD_DEFAULT  
} from '../constants/main';

import { minusDate } from './date';

export const customURLHotelOnly = ({
  dateFrom = FROM_DATE_DEFAULT,
  dateTo = TO_DATE_DEFAULT,
  adults = ADULTS_DEFAULT,
  children = CHILDREN_DEFAULT,
  hotelOnly = PRODUCT_TYPE_HOTEL
}) => {   
  return `https://www.travely24.com/de/tours/1317?period=4&adults=${adults}&children=${children}&hid=24276&fa=ORD&sDate=${dateFrom}&eDate=${dateTo}&productType=${hotelOnly}&roomType=QUA.2D-CV&boardType=RO&PT=hotelonly`
};
export const customURL = ({
  fromDate = FROM_DATE_DEFAULT,
  toDate = TO_DATE_DEFAULT,
  fdUrlFrom = FROM_DEFAULT,
  fdUrlTo = TO_DEFAULT,
  adults = ADULTS_DEFAULT,
  children = CHILDREN_DEFAULT, 
  period = PERIOD_DEFAULT,
  tourId = TOUR_DEFAULT,
  hid = HID_DEFAULT,

}) => {
  return `https://www.travely24.com/de/tours/${tourId}?hid=${hid}&period=${period}&adults=${adults}&children=${children}&fa=${fdUrlTo}&sDate=${fromDate}&eDate=${toDate}&productType=flight&roomType=DF1F&boardType=UF&PT=pauschal&fd=${fdUrlFrom}`;
};
//www.travely24.com/de/tours/777?hid=17953&productType=flight&period=1&adults=2&children&fa=JFK&sDate=2022-11-25&eDate=2022-11-26
export const customApiAER = ({ 
  numberCatch, 
  fromDate = FROM_DATE_DEFAULT,
  toDate = TO_DATE_DEFAULT,
  fdUrlFrom = FROM_DEFAULT,
  fdUrlTo = TO_DEFAULT,
  adults = ADULTS_DEFAULT,
  children = CHILDREN_DEFAULT,
  directness = false,
  business = false,
  minTotalPrice = null,
  maxTotalPrice = null,
  minDepartureTime = null,
  maxDepartureTime = null,
  minReturnTime = null,
  maxReturnTime = null,
}) => {
  const directUrl = directness ? '1' : '0';
  const checkDirectness = directness ? '&flight[directness]=N' : '';
  const checkBusiness = business ? '&flight[travelClass]=business' : '';
  const minTotalPriceUrl = minTotalPrice
    ? `&minTotalPrice=${minTotalPrice}`
    : '';
  const maxTotalPriceUrl = maxTotalPrice
    ? `&maxTotalPrice=${maxTotalPrice}`
    : '';
  const timeFromUrl = minDepartureTime
    ? `&timeFrom=${minDepartureTime.replace(
        ':',
        '-'
      )}-${maxDepartureTime.replaceAll(':', '-')}`
    : '';
  const timeToUrl = minReturnTime
    ? `&timeTo=${minReturnTime.replaceAll(':', '-')}-${maxReturnTime.replace(
        ':',
        '-'
      )}`
    : '';

  return `https://www.travely24.com/api/?r=aer&search=1&from=${fdUrlFrom}&to=${fdUrlTo}&dateFrom=${fromDate}&dateTo=${toDate}&direct=${directUrl}&cabinClassBusiness=${directUrl}&adults=${adults}&children=${children}${checkDirectness}${checkBusiness}${timeFromUrl}${timeToUrl}${minTotalPriceUrl}${maxTotalPriceUrl}&stype=${numberCatch}`;
};

export const customApiProductType = ({
  fromDate = FROM_DATE_DEFAULT,
  toDate = TO_DATE_DEFAULT,
  fdUrlFrom = FROM_DEFAULT,
  fdUrlTo = TO_DEFAULT,
  adults = ADULTS_DEFAULT,
  children = CHILDREN_DEFAULT,
  directness = false,
  business = false,
  minTotalPrice = null,
  maxTotalPrice = null,
  minDepartureTime = null,
  maxDepartureTime = null,
  minReturnTime = null,
  maxReturnTime = null,
}) => {
  const checkDirectness = directness ? '&flight[directness]=N' : '';
  const checkBusiness = business ? '&flight[travelClass]=business' : '';
  const minTotalPriceUrl = minTotalPrice
    ? `&minTotalPrice=${minTotalPrice}`
    : '';
  const maxTotalPriceUrl = maxTotalPrice
    ? `&maxTotalPrice=${maxTotalPrice}`
    : '';
  const minDepartureTimeUrl = minDepartureTime
    ? `&minDepartureTime=${minDepartureTime}`
    : '';
  const maxDepartureTimeUrl = maxDepartureTime
    ? `&maxDepartureTime=${maxDepartureTime}`
    : '';
  const minReturnTimeUrl = minReturnTime
    ? `&minReturnTime=${minReturnTime}`
    : '';
  const maxReturnTimeUrl = maxReturnTime
    ? `&maxReturnTime=${maxReturnTime}`
    : '';

  return `https://connector.traffics.de/v3/rest/offers/?productType=flight&navigation=1%2C1000%2C1&searchDate=1%2C3&fromDate=${fromDate}&toDate=${toDate}&duration=${toDate - fromDate}&adults=${adults}&optionList=roomType,inclusiveCode&tourOperatorList=1AV,5VF,ALD,ALDX,ALL,AME,ANEX,ATID,ATIS,ATK,ATOU,AWT,BAV,BCH,BDV,BENX,BIG,BU,BUM,BXCH,BYE,CBM,CDA,CDHB,CFI,CHR,COR,CPK,DANS,DER,DES,DTA,ECC,ELVI,ERV,ETD,ETI,FALK,FER,FIT,FLT,FLYD,FOR,FTI,FTV,FUV,GULE,HCON,HEX,HMR,HTH,HUC,ICC,IHOM,ITS,ITSB,ITSX,ITT,JAHN,JANA,KAE,LMX,LMXI,MON,MPR,MWR,NOSO,OGE,OGO,OLI,PALH,PALM,PHX,RIVA,RMS,RSD,SCAR,SEHO,SIT,SLR,SLRD,SNOW,SPRI,STT,TJAX,TRAL,TREX,TUIS,TVR,UPS,VFLY,VTO,VTOI,WOL,XALL,XANE,XBIG,XECC,XJAH,XMWR,XOLI,XPOD,XPUR,TUID,XFTI,X5VF,XDER&children=${children}${checkDirectness}${checkBusiness}${minDepartureTimeUrl}${maxDepartureTimeUrl}${minReturnTimeUrl}${maxReturnTimeUrl}&departureAirportList=${fdUrlFrom}&arrivalAirportList=${fdUrlTo}&dontDecorate=true${minTotalPriceUrl}${maxTotalPriceUrl}`;
}//https://connector.traffics.de/v3/rest/offers/?productType=flight&navigation=1%2C1000%2C1&searchDate=3%2C5&fromDate=3&toDate=5&duration=2&adults=2&optionList=roomType,inclusiveCode&tourOperatorList=1AV,5VF,ALD,ALDX,ALL,AME,ANEX,ATID,ATIS,ATK,ATOU,AWT,BAV,BCH,BDV,BENX,BIG,BU,BUM,BXCH,BYE,CBM,CDA,CDHB,CFI,CHR,COR,CPK,DANS,DER,DES,DTA,ECC,ELVI,ERV,ETD,ETI,FALK,FER,FIT,FLT,FLYD,FOR,FTI,FTV,FUV,GULE,HCON,HEX,HMR,HTH,HUC,ICC,IHOM,ITS,ITSB,ITSX,ITT,JAHN,JANA,KAE,LMX,LMXI,MON,MPR,MWR,NOSO,OGE,OGO,OLI,PALH,PALM,PHX,RIVA,RMS,RSD,SCAR,SEHO,SIT,SLR,SLRD,SNOW,SPRI,STT,TJAX,TRAL,TREX,TUIS,TVR,UPS,VFLY,VTO,VTOI,WOL,XALL,XANE,XBIG,XECC,XJAH,XMWR,XOLI,XPOD,XPUR,TUID,XFTI,X5VF,XDER&children=3,11&departureAirportList=CGN&arrivalAirportList=VRN&dontDecorate=true
 //https://connector.traffics.de/v3/rest/offers/?productType=flight&navigation=1%2C1000%2C1&searchDate=3%2C5&fromDate=3&toDate=5&duration=2&adults=2&optionList=roomType,inclusiveCode&tourOperatorList=    1AV,5VF,ALD,ALDX,ALL,AME,ANEX,ATID,ATIS,ATK,ATOU,AWT,BAV,BCH,BDV,BENX,BIG,BU,BUM,BXCH,BYE,CBM,CDA,CDHB,CFI,CHR,COR,CPK,DANS,DER,DES,DTA,ECC,ELVI,ERV,ETD,ETI,FALK,FER,FIT,FLT,FLYD,FOR,FTI,FTV,FUV,GULE,HCON,HEX,HMR,HTH,HUC,ICC,IHOM,ITS,ITSB,ITSX,ITT,JAHN,JANA,KAE,LMX,LMXI,MON,MPR,MWR,NOSO,OGE,OGO,OLI,PALH,PALM,PHX,RIVA,RMS,RSD,SCAR,SEHO,SIT,SLR,SLRD,SNOW,SPRI,STT,TJAX,TRAL,TREX,TUIS,TVR,UPS,VFLY,VTO,VTOI,WOL,XALL,XANE,XBIG,XECC,XJAH,XMWR,XOLI,XPOD,XPUR,TUID,XFTI,X5VF,XDER&children=3,11&departureAirportList=CGN&arrivalAirportList=VRN&dontDecorate=true
// ;https://connector.traffics.de/v3/rest/offers/?productType=flight&navigation=1%2C1000%2C1&searchDate=14%2C15&fromDate=14&toDate=15&duration=1&adults=2&optionList=roomType,inclusiveCode&tourOperatorList=1AV,5VF,ALD,ALDX,ALL,AME,ANEX,ATID,ATIS,ATK,ATOU,AWT,BAV,BCH,BDV,BENX,BIG,BU,BUM,BXCH,BYE,CBM,CDA,CDHB,CFI,CHR,COR,CPK,DANS,DER,DES,DTA,ECC,ELVI,ERV,ETD,ETI,FALK,FER,FIT,FLT,FLYD,FOR,FTI,FTV,FUV,GULE,HCON,HEX,HMR,HTH,HUC,ICC,IHOM,ITS,ITSB,ITSX,ITT,JAHN,JANA,KAE,LMX,LMXI,MON,MPR,MWR,NOSO,OGE,OGO,OLI,PALH,PALM,PHX,RIVA,RMS,RSD,SCAR,SEHO,SIT,SLR,SLRD,SNOW,SPRI,STT,TJAX,TRAL,TREX,TUIS,TVR,UPS,VFLY,VTO,VTOI,WOL,XALL,XANE,XBIG,XECC,XJAH,XMWR,XOLI,XPOD,XPUR,TUID,XFTI,X5VF,XDER&children=3,11&departureAirportList=CGN&arrivalAirportList=VRN&dontDecorate=true