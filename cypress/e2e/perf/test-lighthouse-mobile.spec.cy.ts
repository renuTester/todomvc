/// <reference types="cypress" />
/// <reference types="../../support" />

import { LighthouseFlagsDesktop, LighthouseThresholds, LighthouseFlagsDesktopSlow, LighthouseFlagsMobile } from "../../utils/config";


describe('ToDo App - Lighthouse Audit', () => {

    beforeEach('Visit App Initial Page', () => {
        cy.visit('/')
    })

    context('App overall audit on Mobile', () => {

        it('should exceed the accessbility benchmark', () => {
            //@ts-ignore
            cy.lighthouse(LighthouseThresholds.Accessibility, LighthouseFlagsMobile);
        });

        it('should exceed the best-practices benchmark', () => {
            //@ts-ignore
            cy.lighthouse(LighthouseThresholds['BestPractices'], LighthouseFlagsMobile);
        });

        it('should exceed the performance benchmark', () => {
            //@ts-ignore
            cy.lighthouse(LighthouseThresholds.Performance, LighthouseFlagsMobile);
        });

        it('should exceed the pwa benchmark', () => {
            //@ts-ignore
            cy.lighthouse(LighthouseThresholds.PWA, LighthouseFlagsMobile);
        });
    });
});