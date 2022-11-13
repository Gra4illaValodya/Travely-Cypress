import {
 BASE_URL_def,
TOUR_ID_def,
ADULT_def,
CHILDREN_def,
DATE_FROM_def,
DATE_TO_def,
PRODUCT_TYPE_def,
ARRIVALAIROPORT_def,
HID_def,
PERIOD_def
} from '../variable/main.js'


export const handlerURL = (
 
    baseUrl = BASE_URL_def,
    tourId = TOUR_ID_def,
    adults = ADULT_def,
    children = CHILDREN_def,
    fromDate = DATE_FROM_def,
    toDate = DATE_TO_def,
    productType = PRODUCT_TYPE_def,
    arrivalAiroport= ARRIVALAIROPORT_def,
    hid =  HID_def,
    period = PERIOD_def,
  ) => {
    return `${baseUrl}de/tours/${tourId}?hid=${hid}&period=${period}&adults=${adults}&children=${children}&fa=${arrivalAiroport}&sDate=${fromDate}&eDate=${toDate}&productType=${productType}&roomType=CAA++G&boardType=UF&PT=hotelonly&flight=EW583|EW582|`;
  };


