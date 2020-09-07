/// <reference types="cypress" />

describe('Esperas...',()=>{

    before(()=>{
        cy.visit('http://wcaquino.me/cypress/componentes.html');
    })

    beforeEach(()=>{
        cy.reload();
    })

    it('Deve aguardar elemento estar disponível',()=>{
        cy.get('#novoCampo').should('not.exist');
        cy.get('#buttonDelay').click();
        cy.get('#novoCampo').should('not.exist');
        cy.get('#novoCampo').should('exist');
        cy.get('#novoCampo').type('funciona');
    })

    it.only('Deve fazer retries',()=>{
        cy.get('#buttonDelay').click();
        cy.get('#novoCampo').should('exist')
                            .type('exist');
    })

    it.only('Uso do find',()=>{
        cy.get('#buttonList').click();
        cy.get('#lista li')
            .find('span')
            .should('contain','Item 1');
        cy.get('#lista li span')
            .should('contain','Item 2');
    })

    it.only('Uso do timeout',()=>{
        // cy.get('#buttonDelay').click();
        // cy.get('#novoCampo',{timeout:1000}).should('exist');
        
        // cy.get('#buttonListDOM').click();
        // cy.wait(5000);
        // cy.get('#lista li span')
        //     .should('contain','Item 2');

        cy.get('#buttonListDOM').click();
        cy.get('#lista li span',{timeout:30000})
            .should('have.length',2);
    })

    it.only('Click retry',()=>{
        cy.get('#buttonCount')
            .click()
            .should('have.value','1');
    })

    it.only('Should vs Then 1',()=>{
        cy.get('#buttonListDOM').click();
        cy.get('#lista li span').should($el=>{
            console.log($el);
            expect($el).to.have.length(1)
        })
    })

    it.only('Should vs Then 2',()=>{
        cy.get('#buttonListDOM').then($el=>{
            expect($el).to.have.length(1);
            return 2;
        }).and('eq',2)
            .and('not.have.id','buttonListDOM')
    })

    it.only('Should vs Then 3',()=>{
        cy.get('#buttonListDOM').then($el=>{
            expect($el).to.have.length(1);
            cy.get('#buttonList');
        })
    })
})