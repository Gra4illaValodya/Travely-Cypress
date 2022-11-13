/* eslint-disable no-undef */
import faker from '@faker-js/faker';

import {getUrl, handleLogoutButton} from '../../support/config';


const newPasswordUser = '123456Aa@';
const email = faker.internet.email();

describe('Forgot your password: with phone', () => {
    it("Fill register form", () => {
        cy.visit(getUrl("auth/register"));

        handleLogoutButton();

        cy.get("[data-cy=Register-emailAddress]")
            .click()
            .type(email);
        cy.get("[data-cy=Register-emailAddress]")
            .find("input")
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
    context('Forgot your password: email', () => {
        it('Enter email', () => {
            cy.visit(getUrl("auth/forgot-password"));

            cy.get('[data-cy=ForgotPassword-emailAddress]').type(email);
            cy.intercept('POST', '**/user/forgotPassword/email', (req) => {
                req.headers.Origin = `http://localhost:3000/`;
            }).as('lenkToEmail');

            cy.get('[data-cy=ForgotPassword-submit]').click();

            cy.wait('@lenkToEmail').then(({response}) => {
                cy.visit(response.body.TEST_ONLY);
            });
        });
    });

    context('Forgot your password: link email', () => {
        it('Click button = link in email', () => {
            cy.intercept('POST', '**/user/forgotPassword/phone').as('codePhoneNumber');
            cy.get('[data-cy=PhoneVerify-submit]').click();
            cy.wait('@codePhoneNumber').then(({response}) => {
                cy.get('[data-cy=OtpVerification-input-0]').type(response.body.otp);
                cy.get('[data-cy=OtpVerification-submit]').click();
            });


        });
    });

    context('Forgot your password: reset password', () => {
        it('enter new password', () => {
            cy.get('[data-cy=ResetPasswordForm-password]').type(newPasswordUser);
            cy.get('[data-cy=ResetPasswordForm-confirmPassword]').type(newPasswordUser);
            cy.get('[data-cy=ResetPasswordForm-submit]').click();
        });
    });

    context('Forgot your password: All set!', () => {
        it('The end', () => {
            cy.get('[data-cy=ResetPasswordForm-submitLogin]').click();
        });
    });

    context('Login: Login to your incard account', () => {
        it('Enter email and new password', () => {
            cy.get('[data-cy=Login-emailAddress]').click().clear().type(email);
            cy.get('[data-cy=Login-Password]').click().clear().type(newPasswordUser);
            cy.get('[data-cy=Login-submit]').click();
        });
    });

})

