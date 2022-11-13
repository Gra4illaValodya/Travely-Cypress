import { customURL } from '../../customFunction/main';
import {
  FD_URL_FROM,
  FA_URL_TO,
  FROM_DEFAULT,
  TO_DEFAULT,
} from '../../constants/main';

describe('Test #3-1-2 _ URL - not from or to in url --- 10.10.2022', () => {
  Cypress.on('fail', (error, runnable) => {
    console.log(`Error test name: ${runnable.title}`);
    console.log(error);
    console.log(runnable);
    throw error;
  });

  it('Visit site travely24 = standart', () => {
    cy.viewport(1200, 900);
    cy.visit(customURL({ fdUrlFrom: FD_URL_FROM, fdUrlTo: FA_URL_TO }));
  });
  context('Test from/to all', () => {
    it('- Test from/to in site text', () => {
      cy.get(
        '[disabled="false"] > .item-tour-form > :nth-child(2) > .block-fly-text',
        {
          timeout: 100000,
        }
      ).then((buttonAllBodies) => {
        const arrayText = buttonAllBodies.get(0).innerText.split(/ |\n/);
        const verifyFromSite = arrayText.includes(FD_URL_FROM);
        const verifyToSite = arrayText.includes(FA_URL_TO);
        assert.isTrue(
          verifyFromSite,
          `Text "${FD_URL_FROM}" this url is exist in site`
        );
        assert.isTrue(
          verifyToSite,
          `Text "${FA_URL_TO}"  this url  exist in site`
        );
      });
    });
    
    it('Test text expect = "Gewählt"', () => {
      cy.get('.block-contents-wrapper > .btn-blue', {
        timeout: 100000,
      }).click({
        force: true,
      });
      cy.wait(5000);

      cy.get('#btnOtherFlights0', {
        timeout: 100000,
      }).then((button) => {
        const innerText = button.get(0).innerText;
        const verifyText = innerText === 'Gewählt';
        assert.isTrue(verifyText, `Text "Gewählt" is exist in site`);
      });
    });
  });

  context('Testing empty from, to or all i url', () => {
    it('Visit site from empty', () => {
      cy.visit(customURL({ fdUrlTo: FA_URL_TO }));
    });

    it('Test text from empty', () => {
      cy.get(
        '[disabled="false"] > .item-tour-form > :nth-child(2) > .block-fly-text',
        {
          timeout: 100000,
        }
      ).then((text) => {
        const arrayText = text.get(0).innerText.split(/ |\n/);
        const verifyFromSite = arrayText.includes(FROM_DEFAULT);
        const verifyToSite = arrayText.includes(FA_URL_TO);
        assert.isTrue(
          verifyFromSite,
          `Text "${FROM_DEFAULT} - default" is exist in site`
        );
        assert.isTrue(
          verifyToSite,
          `Text "${FA_URL_TO}"  this url  exist in site`
        );
      });
    });

    it('Visit site to empty', () => {
      cy.visit(customURL({ fdUrlFrom: FD_URL_FROM }));
    });

    it('Test text to empty', () => {
      cy.get(
        '[disabled="false"] > .item-tour-form > :nth-child(2) > .block-fly-text',
        {
          timeout: 100000,
        }
      ).then((text) => {
        const arrayText = text.get(0).innerText.split(/ |\n/);
        const verifyFromSite = arrayText.includes(FD_URL_FROM);
        const verifyToSite = arrayText.includes(TO_DEFAULT);
        assert.isTrue(verifyFromSite, `Text "${FD_URL_FROM}" is exist in site`);
        assert.isTrue(
          verifyToSite,
          `Text "${TO_DEFAULT} - default"  this url  exist in site`
        );
      });
    });
    it('Visit site all(from and to) empty', () => {
      cy.visit(customURL({}));
    });

    it('Test text all(from and to) empty', () => {
      cy.get(
        '[disabled="false"] > .item-tour-form > :nth-child(2) > .block-fly-text',
        {
          timeout: 100000,
        }
      ).then((text) => {
        const arrayText = text.get(0).innerText.split(/ |\n/);
        const verifyFromSite = arrayText.includes(FROM_DEFAULT);
        const verifyToSite = arrayText.includes(TO_DEFAULT);
        assert.isTrue(
          verifyFromSite,
          `Text "${FROM_DEFAULT} - default" is exist in site`
        );
        assert.isTrue(
          verifyToSite,
          `Text "${TO_DEFAULT} - default"  this url  exist in site`
        );
      });
    });
  });
});
