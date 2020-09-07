/// <reference types="cypress" />

describe ('Dynamic Tests',()=>{
    before(()=>{
        cy.visit('http://wcaquino.me/cypress/componentes.html');
    })  

    it('Going back to the past',()=>{
        const dt = new Date(2012,3,10,15,23,50);
        cy.clock(dt.getTime());
        cy.get('#buttonNow').click();
        cy.get('#resultado > span').should('contain','10/04/2012');
    })

    it.only('Goes to the future',()=>{
        cy.clock();
        cy.get('#buttonTimePassed').click();
        cy.get('#resultado > span').invoke('text').should('lte',0);
       
        cy.wait(1000);
        cy.get('#buttonTimePassed').click();
        cy.get('#resultado > span').invoke('text').should('lte',0);

        cy.tick(5000);
        cy.get('#buttonTimePassed').click();
        cy.get('#resultado > span').invoke('text').should('gte',5000);

        cy.tick(10000);
        cy.get('#buttonTimePassed').click();
        cy.get('#resultado > span').invoke('text').should('gte',15000);
    })
})