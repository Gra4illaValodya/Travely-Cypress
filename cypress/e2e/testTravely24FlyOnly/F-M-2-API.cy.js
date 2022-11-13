import {
  FD_URL_FROM,
  FA_URL_TO,
  FROM_DEFAULT,
  TO_DEFAULT,
  NEW_FROM_DEFAULT,
  PERIOD_DEFAULT,
  HID_DEFAULT,
  FROM_DATE_DEFAULT,
  TO_DATE_DEFAULT,

} from '../../constants/main';
import { minusDate } from '../../customFunction/date';
import {
  customApiAER,
  customApiProductType,
  customURL,
} from '../../customFunction/main';

describe('TEST MOBILE API',()=> {
  const sizeFetchTypeAER = Array.from(Array(5).keys());
  let arrayAERFareList = [];
  it(`Visit site travely24 - standard from ${FD_URL_FROM} to ${FA_URL_TO} airport`, () => {
    cy.viewport(525, 425);
    cy.visit(customURL({ fdUrlFrom: FD_URL_FROM, fdUrlTo: FA_URL_TO }));
   
    //cy.visit('https://www.travely24.com/de/tours/777?hid=17953&productType=flight&period=1&adults=2&children&fa=JFK&sDate=2022-11-25&eDate=2022-11-26')
  })
  context('PRODUCT TYPE',()=>{
    it.only('get ProductType',()=>{
      cy.viewport(525, 425);
      cy.visit(customURL({ fdUrlFrom: FROM_DEFAULT, fdUrlTo: TO_DEFAULT }));
      
      cy.intercept({
        method: "GET",
        url : customApiProductType({fromDate:minusDate(FROM_DATE_DEFAULT), toDate: minusDate(TO_DATE_DEFAULT)})
        //url:'https://connector.traffics.de/v3/rest/offers/?productType=flight&navigation=1%2C1000%2C1&searchDate=3%2C5&fromDate=3&toDate=5&duration=2&adults=2&optionList=roomType,inclusiveCode&tourOperatorList=1AV,5VF,ALD,ALDX,ALL,AME,ANEX,ATID,ATIS,ATK,ATOU,AWT,BAV,BCH,BDV,BENX,BIG,BU,BUM,BXCH,BYE,CBM,CDA,CDHB,CFI,CHR,COR,CPK,DANS,DER,DES,DTA,ECC,ELVI,ERV,ETD,ETI,FALK,FER,FIT,FLT,FLYD,FOR,FTI,FTV,FUV,GULE,HCON,HEX,HMR,HTH,HUC,ICC,IHOM,ITS,ITSB,ITSX,ITT,JAHN,JANA,KAE,LMX,LMXI,MON,MPR,MWR,NOSO,OGE,OGO,OLI,PALH,PALM,PHX,RIVA,RMS,RSD,SCAR,SEHO,SIT,SLR,SLRD,SNOW,SPRI,STT,TJAX,TRAL,TREX,TUIS,TVR,UPS,VFLY,VTO,VTOI,WOL,XALL,XANE,XBIG,XECC,XJAH,XMWR,XOLI,XPOD,XPUR,TUID,XFTI,X5VF,XDER&children=3,11&departureAirportList=CGN&arrivalAirportList=VRN&dontDecorate=true'
        // url:  'https://connector.traffics.de/v3/rest/offers/?productType=flight&navigation=1%2C1000%2C1&searchDate=14%2C15&fromDate=14&toDate=15&duration=1&adults=2&optionList=roomType,inclusiveCode&tourOperatorList=1AV,5VF,ALD,ALDX,ALL,AME,ANEX,ATID,ATIS,ATK,ATOU,AWT,BAV,BCH,BDV,BENX,BIG,BU,BUM,BXCH,BYE,CBM,CDA,CDHB,CFI,CHR,COR,CPK,DANS,DER,DES,DTA,ECC,ELVI,ERV,ETD,ETI,FALK,FER,FIT,FLT,FLYD,FOR,FTI,FTV,FUV,GULE,HCON,HEX,HMR,HTH,HUC,ICC,IHOM,ITS,ITSB,ITSX,ITT,JAHN,JANA,KAE,LMX,LMXI,MON,MPR,MWR,NOSO,OGE,OGO,OLI,PALH,PALM,PHX,RIVA,RMS,RSD,SCAR,SEHO,SIT,SLR,SLRD,SNOW,SPRI,STT,TJAX,TRAL,TREX,TUIS,TVR,UPS,VFLY,VTO,VTOI,WOL,XALL,XANE,XBIG,XECC,XJAH,XMWR,XOLI,XPOD,XPUR,TUID,XFTI,X5VF,XDER&arrivalAirportList=JFK&dontDecorate=true'
      }).as('ProductType') 
      cy.wait('@ProductType',{timeout:20000}).then(item => {
        const statusCode = item.response.statusCode
      expect(statusCode).to.eq(200)
      })
    })
  })
})

  context(
    `Working this API-es  - standard from ${FD_URL_FROM} to ${FA_URL_TO} airport`,
    () => {
      it(`Visit site travely24 - standard from ${FD_URL_FROM} to ${FA_URL_TO} airport`, () => {
        cy.viewport(1200, 900);
        cy.visit('https://www.travely24.com/de/tours/777?hid=17953&productType=flight&period=1&adults=2&children&fa=JFK&sDate=2022-11-25&eDate=2022-11-26')
      });

      it(`Added names API-es and data collection - standard from ${FD_URL_FROM} to ${FA_URL_TO} airport`, () => {
        cy.server();
        sizeFetchTypeAER.forEach((_item, i) => {
          cy.intercept({
            method:'GET',
            url:  'https://connector.traffics.de/v3/rest/offers/?productType=flight&navigation=1%2C1000%2C1&searchDate=14%2C15&fromDate=14&toDate=15&duration=1&adults=2&optionList=roomType,inclusiveCode&tourOperatorList=1AV,5VF,ALD,ALDX,ALL,AME,ANEX,ATID,ATIS,ATK,ATOU,AWT,BAV,BCH,BDV,BENX,BIG,BU,BUM,BXCH,BYE,CBM,CDA,CDHB,CFI,CHR,COR,CPK,DANS,DER,DES,DTA,ECC,ELVI,ERV,ETD,ETI,FALK,FER,FIT,FLT,FLYD,FOR,FTI,FTV,FUV,GULE,HCON,HEX,HMR,HTH,HUC,ICC,IHOM,ITS,ITSB,ITSX,ITT,JAHN,JANA,KAE,LMX,LMXI,MON,MPR,MWR,NOSO,OGE,OGO,OLI,PALH,PALM,PHX,RIVA,RMS,RSD,SCAR,SEHO,SIT,SLR,SLRD,SNOW,SPRI,STT,TJAX,TRAL,TREX,TUIS,TVR,UPS,VFLY,VTO,VTOI,WOL,XALL,XANE,XBIG,XECC,XJAH,XMWR,XOLI,XPOD,XPUR,TUID,XFTI,X5VF,XDER&arrivalAirportList=JFK&dontDecorate=true'
          })
          cy.route(
            'GET',
            customApiAER({
              numberCatch: i + 1,
              fdUrlFrom: FD_URL_FROM,
              fdUrlTo: FA_URL_TO,
            }) 
          ).as(`getAER_${i + 1}`);
        });
        cy.route(
          'GET',
          `https://connector.traffics.de/v3/rest/hotels/62836/recommendations?productType=pauschal&adults=2`
        ).as(`getProductType`);
        sizeFetchTypeAER.forEach((_item, i) => {
          cy.wait(`@getAER_${i + 1}`, { timeout: 100000 })
            .its('status')
            .should('eq', 200);
          cy.get(`@getAER_${i + 1}`).then(({ response }) => {
            const {
              body: { availableFareList },
            } = response;
            console.log("availableFareList",availableFareList);
            availableFareList.forEach((item) => arrayAERFareList.push(item));
            console.log('arrayAERFareList',arrayAERFareList);
          });
        });
        cy.wait(`@getProductType`, { timeout: 100000 })
          .its('status')
          .should('eq', 200);
      });


    })
