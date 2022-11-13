/* eslint-disable no-undef */
import faker from '@faker-js/faker';

import {getUrl, handleLogoutButton} from '../../support/config';

const newPasswordUser = "qvX34F@a2z4URDkdS";

const email = faker.internet.email();

describe("Forgot password with only email", () => {
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
    });

    context("Forgot your password: email", () => {
        it("Enter email", () => {
            cy.visit(getUrl("auth/forgot-password"));

            cy.get("[data-cy=ForgotPassword-emailAddress]").type(email);
            cy.intercept("POST", "**/user/forgotPassword/email", req => {
                req.headers.Origin = `http://localhost:3000/`;
            }).as("lenkToEmail");

            cy.get("[data-cy=ForgotPassword-submit]").click();

            cy.wait("@lenkToEmail").then(({ response }) => {
                cy.visit(response.body.TEST_ONLY);
            });
        });
    });

    context("Forgot your password: reset password", () => {
        it("enter new password", () => {
            cy.get("[data-cy=ResetPasswordForm-password]").type(newPasswordUser);
            cy.get("[data-cy=ResetPasswordForm-confirmPassword]").type(newPasswordUser);
            cy.get("[data-cy=ResetPasswordForm-submit]").click();
        });
    });

    context("Forgot your password: All set!", () => {
        it("The end", () => {
            cy.get("[data-cy=ResetPasswordForm-submitLogin]").click();
        });
    });

    context("Login: Login to your incard account", () => {
        it("Enter email and new password", () => {
            cy.get("[data-cy=Login-emailAddress]")
                .click()
                .clear()
                .type(email);
            cy.get("[data-cy=Login-Password]")
                .click()
                .clear()
                .type(newPasswordUser);
            cy.get("[data-cy=Login-submit]").click();
        });
    });
});
