/* eslint-disable no-undef */
import "cypress-iframe";
import "cypress-file-upload";
import faker from '@faker-js/faker';

import {getUrl, getVeriffFrame, handleLogoutButton} from '../../support/config';

describe("Onboarding register step", () => {
    it("Fill register form", () => {
        cy.visit(getUrl("auth/register"));

        handleLogoutButton();

        const email = faker.internet.email();
        cy.get("[data-cy=Register-emailAddress]")
            .click()
            .type(email);
        cy.get("[data-cy=Register-password]")
            .click()
            .type("Test123-");
        cy.get("[data-cy=Register-confirmPassword]")
            .click()
            .type("Test123-");
        cy.get("[data-cy=Register-privacyPolicy]").click();
        cy.get("[data-cy=Register-submit]").click();
        cy.intercept({ method: "POST", url: "**/user/signup" }).as("signup");
        cy.intercept({ method: "POST", url: "**/user/send_verify_token" }).as("verifyTokenNext");
        cy.wait("@verifyTokenNext", { timeout: 2000 }).then(({ response }) => {
            cy.get("[data-cy=VerifyEmailAddress-codeInput]")
                .click()
                .type(response.body.TEST_ONLY);
            cy.get("[data-cy=VerifyEmailAddress-submit]").click();
        });
    });

    it("Mobile Verification", () => {
        cy.get("[data-cy=MobileVerification-autocomplete-dropdown]").click();
        cy.get("[data-cy=MobileVerification-autocomplete-search]")
            .click()
            .type("ukraine");
        cy.get("[data-cy=UA]").click();
        cy.get("[data-cy=MobileVerification-autocomplete-phoneInput]")
            .click()
            .type("995583823");
        cy.intercept({ method: "POST", url: "**/user/register/phone" }).as("phoneVerify");
        cy.get("[data-cy=MobileVerification-sendCode]").click();
        cy.wait("@phoneVerify").then(({ response }) => {
            cy.get("[data-cy=MobileVerification-otp")
                .click()
                .type(response.body.TEST_ONLY);
            cy.get("[data-cy=MobileVerification-submit").click();
        });
    });

    it("Personal demographics", () => {
        cy.visit(getUrl("admin/personal-demographics?veriff=incard123"));
        cy.get("[data-cy=PersonalDemographics-firstName]")
            .click()
            .type("John");
        cy.get("[data-cy=PersonalDemographics-lastName]")
            .click()
            .type("Doe");
        cy.get("[data-cy=PersonalDemographics-gender-dropdown]").click();
        cy.get("[data-cy=PersonalDemographics-gender-item]")
            .first()
            .click();
        cy.get("[data-cy=PersonalDemographics-nationality-dropdown]").click();
        cy.get("[data-cy=GB]").click();
        cy.get("[data-cy=PersonalDemographics-dob-datePicker]").click();
        cy.get(".react-datepicker__year-select").select("1997");
        cy.get(".react-datepicker__month-select").select("5");
        cy.get(".react-datepicker__day--016").click();
        cy.get("[data-cy=PersonalDemographics-placeOfBirth-dropdown]").click();
        cy.get("[data-cy=GB]").click();
        cy.get("[data-cy=PersonalDemographics-continue]").click();
        cy.get("[data-cy=PersonalDemographics-countryOfResidence-dropdown]").click();
        cy.get("[data-cy=GB]").click();
        cy.get("[data-cy=PersonalDemographics-postcode]")
            .click()
            .type("n70qh");
        cy.get("[data-cy=PersonalDemographics-searchPostcode]").click();
        cy.get("[data-cy=PersonalDemographics-addressItem]")
            .first()
            .click();
        cy.get("[data-cy=PersonalDemographics-submit]").click();

        cy.wait(5000);
        getVeriffFrame().find("header").find("button").click();
        getVeriffFrame().find('veriff-portal').find('button').first().click();
    });

    it("Business Type", () => {
        cy.get('[data-cy="BusinessType-companyRadio"]').click();
        cy.get('[data-cy="BusinessType-submit"]').click();
    });

    it("Company Information", () => {
        cy.get("[data-cy=BusinessData-countryOfIncorporation-dropdown]").click();
        cy.get("[data-cy=GB]").click();

        cy.get("[data-cy=BusinessData-companyNumber]")
            .click()
            .type("1234567");
        cy.get("[data-cy=BusinessData-submit").click();

        cy.get("[data-cy=BusinessData-legalName]")
            .click()
            .type("Test inc.");
        cy.get("[data-cy=BusinessData-dob-datePicker]").click();
        cy.get(".react-datepicker__year-select").select("1997");
        cy.get(".react-datepicker__month-select").select("5");
        cy.get(".react-datepicker__day--016").click();

        cy.get("[data-cy=BusinessData-submit").click();
    });

    it("Company Address", () => {
        cy.get("[data-cy=BusinessAddress-regAddress-address1")
            .click()
            .type("Carlenton Road");
        cy.get("[data-cy=BusinessAddress-regAddress-city")
            .click()
            .type("London");
        cy.get("[data-cy=BusinessAddress-regAddress-postcode")
            .click()
            .type("n70qh");
        cy.get("[data-cy=BusinessAddress-regAddress-country-dropdown").click();
        cy.get("[data-cy=GB]").click();

        cy.get("[data-cy=BusinessAddress-checkbox").click();

        cy.get("[data-cy=BusinessAddress-tradeAddress-address1")
            .click()
            .type("Rossie Place");
        cy.get("[data-cy=BusinessAddress-tradeAddress-city")
            .click()
            .type("Auchterarder");
        cy.get("[data-cy=BusinessAddress-tradeAddress-postcode")
            .click()
            .type("PH3 1AJ");
        cy.get("[data-cy=BusinessAddress-tradeAddress-country-dropdown").click();
        cy.get("[data-cy=GB]").click();

        cy.get("[data-cy=BusinessAddress-submit").click();
    });

    it("Upload docs", () => {
        cy.get("[data-cy=UploadDocs-dropzone]").attachFile("./assets/cypress-test.pdf");
        cy.get("[data-cy=UploadDocs-dropzone-removeFile]").click();
        cy.wait(1000);

        cy.get("[data-cy=UploadDocs-dropzone]").attachFile("./assets/cypress-test.pdf");
        cy.get("[data-cy=UploadDocs-submit]").click();
    });

    it("Business Category", () => {
        cy.get("[data-cy=BusinessCategory-natureOfBusiness-dropdown]").click();
        cy.get("[data-cy=BusinessCategory-natureOfBusiness-item]")
            .first()
            .click();
        cy.get("[data-cy=BusinessCategory-maxSinglePayment]")
            .click()
            .type("1000");
        cy.get("[data-cy=BusinessCategory-submit]").click();
    });

    it("Role In Company", () => {
        cy.get("[data-cy=RoleInCompany-Non-director]").click();
        cy.get("[data-cy=RoleInCompany-provideDocument").click();
        cy.get("[data-cy=RoleInCompany-submit]").click();
    });
});
