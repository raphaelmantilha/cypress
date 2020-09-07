/// <reference types="cypress" />

describe('Cypress basics',()=>{
    it.only('Should visit a page and assert title',()=>{
        cy.visit('http://wcaquino.me/cypress/componentes.html');
        
        //cy.pause();
        
        cy.title().should('be.equal','Campo de Treinamento');
        cy.title().should('contain','Campo').debug();

        cy.title()
            .should('be.equal','Campo de Treinamento')
            .and('contain','Campo');
        
        let syncTitle;
        
        const title = cy.title();
        console.log(title);
        
        cy.title().then(title=>{
            console.log(title);

            cy.get('#formNome').type(title);

            syncTitle = title;
        })

        cy.get('[data-cy=dataSobrenome]').then($el=>{
            $el.val(syncTitle);
        })

        cy.get('#elementosForm\\:sugestoes').then($el=>{
            cy.wrap($el).type(syncTitle);
        })
    })

    it('Should find and interact with an element',()=>{
        cy.visit('http://wcaquino.me/cypress/componentes.html');

        cy.get('#buttonSimple')
            .click()
            .should('have.value','Obrigado!');
    })
})