/* eslint-disable no-undef */
import "cypress-iframe";
import faker from '@faker-js/faker';

import {handleLogoutButton, getVeriffFrame, getUrl} from '../../support/config';

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
            .type("11039567");
        cy.get("[data-cy=BusinessData-submit").click();
        cy.get("[data-cy=BusinessData-submit").click();
    });

    it("Company Address", () => {
        cy.get("[data-cy=BusinessAddress-submit").click();
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
        cy.get("[data-cy=RoleInCompany-Director]").click();
        cy.get("[data-cy=RoleInCompany-submit]").click();
    });

    it("Company Directors", () => {
        cy.get('[data-cy=Directors-addDirector-addBtn]').click();
        cy.get('[data-cy=Directors-firstName]').click().type('John');
        cy.get('[data-cy=Directors-lastName]').click().type('Doe');
        cy.get('[data-cy=Directors-email]').click().type('test@mail.com');
        cy.get('[data-cy=Directors-gender-dropdown]').click();
        cy.get('[data-cy=Directors-gender-item]').first().click();
        cy.get('[data-cy=Directors-nationality-dropdown]').click();
        cy.get("[data-cy=GB]").click();
        cy.get("[data-cy=Directors-dob-datePicker]").click();
        cy.get(".react-datepicker__year-select").select("1997");
        cy.get(".react-datepicker__month-select").select("5");
        cy.get(".react-datepicker__day--016").click();
        cy.get('[data-cy=Directors-countryOfBirth-dropdown]').click();
        cy.get("[data-cy=GB]").click();
        cy.get("[data-cy=EditDirector-submit]").click();
        cy.get("[data-cy=Directors-submit]").click();
    });

    it('Shareholders', () => {
        cy.get('[data-cy=Shareholders-voteYes]').click();
        cy.get('[data-cy=Shareholders-percentEnter]').click().type('25');
        cy.get('[data-cy=Shareholders-submit').click();
    });

    it('General Service Agreement', () => {
        cy.get('[data-cy=GeneralServiceAgreement-checkbox]').click();
        cy.get('[data-cy=GeneralServiceAgreement-submit').click();
    });
});
