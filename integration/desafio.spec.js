/// <reference types="cypress" />

describe('Desafio',()=>{
    before(()=>{
        cy.visit('http://wcaquino.me/cypress/componentes.html');
    })

    it('Cadastro',()=>{
        // cy.on('window:alert',msg=>{
        //     expect(msg).to.be.equal('Nome eh obrigatorio');
        // })
        // cy.on('window:alert',msg=>{
        //     expect(msg).to.be.equal('Sobrenome eh obrigatorio');
        // })
        
        const stub = cy.stub().as('alerta');
        cy.on('window:alert',stub);

        cy.get('#formCadastrar').click()
            .then(()=>expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'));
        cy.get('#formNome').type('Raphael');

        cy.get('#formCadastrar').click()
        .then(()=>expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'));
        cy.get('#formSobrenome').type('Mantilha');

        cy.get('#formCadastrar').click()
        .then(()=>expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'));
        
        cy.get('#formSexoMasc').click();
        cy.get('#formCadastrar').click();

        cy.get('#resultado span').should('contain','Cadastrado!');
    })
})