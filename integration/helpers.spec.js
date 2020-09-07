/// <reference types="cypress" />

describe('Helpers...',()=>{
    it('Wrap',()=>{
        const obj = {nome:'Raphael',idade:43};
        expect(obj).to.have.property('nome');
        cy.wrap(obj).should('have.property','nome');

        cy.visit('http://wcaquino.me/cypress/componentes.html');
        cy.get('#formNome').then($el=>{
            cy.wrap($el).type('funciona via Cypress');
        })

        const promise = new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve(10);
            },500);
        })

        cy.get('#buttonSimple').then(()=>console.log('Encontrei o primeiro botão'));
        //promise.then(num=>console.log(num));
        cy.wrap(promise).then(retorno=>console.log(retorno));
        cy.get('#buttonList').then(()=>console.log('Encontrei o segundo botão'));

        cy.wrap(1).then(num=>{
            return 2
        }).should('be.equal',2);
    })

    it.only('Its...',()=>{
        const obj = {nome:'Raphael',idade:43};
        cy.wrap(obj).should('have.property','nome','Raphael');
        cy.wrap(obj).its('nome').should('be.equal','Raphael');

        const obj2 = {nome:'Raphael',idade:43,endereco:{rua:'Joaquina'}};
        cy.wrap(obj2).its('endereco').its('rua').should('contain','Joaquina');
        cy.wrap(obj2).its('endereco.rua').should('contain','Joaquina');

        cy.visit('http://wcaquino.me/cypress/componentes.html');
        cy.title().its('length').should('be.equal',20);
    })

    it.only('Invoke',()=>{
        const getValue = () => 1;
        const soma = (a,b) => a+b;

        cy.wrap({fn:getValue}).invoke('fn').should('be.equal',1);
        cy.wrap({fn:soma}).invoke('fn',2,5).should('be.equal',7);

        cy.visit('http://wcaquino.me/cypress/componentes.html');
        cy.get('#formNome').invoke('val','Texto via Invoke');

        cy.window().invoke('alert','Dá para ver?');
        
        cy.get('#resultado').invoke('html','<input type="button" value="hacked!"/>');
    })
})