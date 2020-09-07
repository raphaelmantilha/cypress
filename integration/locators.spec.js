/// <reference types="cypress" />

describe('Locators',()=>{

    before(()=>{
        cy.visit('http://wcaquino.me/cypress/componentes.html');
    })

    beforeEach(()=>{
        cy.reload();
    })

    it('using jQuery Selector',()=>{
        //cy.get('#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input').click();
        //cy.get("input[value='Clique aqui']:eq(0)").click();
        cy.get("#tabelaUsuarios tr:contains('Doutorado'):eq(0) td:eq(6) input").click();
    })

    it('using xpath',()=>{
        cy.xpath("//input[contains(@onclick,'Francisco')]");
        cy.xpath("//td[contains(.,'Usuario A')]/following-sibling::td[contains(.,'Mestrado')]/..//input[@type='text']");
    })
})