/// <reference types="cypress" />
/// <reference types="../../support" />

import { LighthouseFlagsDesktop, LighthouseThresholds, LighthouseFlagsDesktopSlow } from "../../utils/config";


describe('ToDo App - Lighthouse Audit', () => {

    beforeEach('Visit App Initial Page', () => {
        cy.visit('/')
    })

    context('App overall audit on Desktop', () => {
        it('should exceed the seo benchmark', () => {
            //@ts-ignore
            cy.lighthouse(LighthouseThresholds.SEO, LighthouseFlagsDesktop);
        });

        it('should exceed the accessbility benchmark', () => {
            //@ts-ignore
            cy.lighthouse(LighthouseThresholds.Accessibility, LighthouseFlagsDesktop);
        });

        it('should exceed the best-practices benchmark', () => {
            //@ts-ignore
            cy.lighthouse(LighthouseThresholds['BestPractices'], LighthouseFlagsDesktop);
        });

        it('should exceed the performance benchmark', () => {
            //@ts-ignore
            cy.lighthouse(LighthouseThresholds.Performance, LighthouseFlagsDesktop);
        });

        it('should exceed the pwa benchmark', () => {
            //@ts-ignore
            cy.lighthouse(LighthouseThresholds.PWA, LighthouseFlagsDesktop);
        });

        it('should exceed the performance benchmark on slow network', () => {
            //@ts-ignore
            cy.lighthouse(LighthouseThresholds.Performance, LighthouseFlagsDesktopSlow);
        });
    });
});