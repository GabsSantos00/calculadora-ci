const { somar, dividir } = require('../src/logic');

describe('Testes Unitários - Lógica da Calculadora', () => {
  
  describe('Função somar()', () => {
    test('deve somar dois números positivos corretamente', () => {
      expect(somar(10, 5)).toBe(15);
    });

    test('deve somar números negativos corretamente', () => {
      expect(somar(-10, -5)).toBe(-15);
    });

    test('deve somar strings numéricas convertendo-as', () => {
      expect(somar('7', '3')).toBe(10);
    });

    test('deve lançar erro se um dos parâmetros não for número', () => {
      expect(() => somar('abc', 5)).toThrow('Os valores informados devem ser números válidos.');
    });
  });

  describe('Função dividir()', () => {
    test('deve dividir dois números corretamente', () => {
      expect(dividir(20, 4)).toBe(5);
    });

    test('deve retornar números decimais quando a divisão não for exata', () => {
      expect(dividir(5, 2)).toBe(2.5);
    });

    test('deve lançar erro ao tentar dividir por zero', () => {
      expect(() => dividir(10, 0)).toThrow('Não é possível dividir por zero.');
    });

    test('deve lançar erro se um dos parâmetros não for número', () => {
      expect(() => dividir(10, 'xyz')).toThrow('Os valores informados devem ser números válidos.');
    });
  });

});
