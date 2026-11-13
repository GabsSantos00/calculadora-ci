describe('Testes E2E - Interface e Persistência da Calculadora', () => {
  
  beforeEach(() => {
    // Limpa o localStorage e visita a página antes de cada teste
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it('deve realizar uma soma pela interface e exibir no resultado e no histórico', () => {
    cy.get('#num1').type('15');
    cy.get('#num2').type('25');
    cy.get('#btn-somar').click();

    cy.get('#resultado-texto').should('have.text', '40');
    cy.get('#lista-historico li').should('have.length', 1);
    cy.get('#lista-historico li').first().should('have.text', '15 + 25 = 40');
  });

  it('deve realizar uma divisão pela interface', () => {
    cy.get('#num1').type('50');
    cy.get('#num2').type('2');
    cy.get('#btn-dividir').click();

    cy.get('#resultado-texto').should('have.text', '25');
    cy.get('#lista-historico li').first().should('have.text', '50 ÷ 2 = 25');
  });

  it('deve exibir mensagem de erro na tela ao dividir por zero', () => {
    cy.get('#num1').type('10');
    cy.get('#num2').type('0');
    cy.get('#btn-dividir').click();

    cy.get('#resultado-texto').should('have.text', 'Não é possível dividir por zero.');
    cy.get('#lista-historico li').should('have.length', 0);
  });

  it('deve persistir o histórico no localStorage mesmo após recarregar a página', () => {
    cy.get('#num1').type('8');
    cy.get('#num2').type('2');
    cy.get('#btn-somar').click();

    // Recarrega a página (F5)
    cy.reload();

    // Verifica se o item continua na tela
    cy.get('#lista-historico li').should('have.length', 1);
    cy.get('#lista-historico li').first().should('have.text', '8 + 2 = 10');
  });

  it('deve limpar o histórico ao clicar no botão Limpar', () => {
    cy.get('#num1').type('5');
    cy.get('#num2').type('5');
    cy.get('#btn-somar').click();

    cy.get('#btn-limpar').click();

    cy.get('#lista-historico li').should('have.length', 0);
    cy.get('#resultado-texto').should('have.text', 'Histórico limpo.');
  });

});
