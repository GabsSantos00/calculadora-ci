APP.JS	

const CHAVE_STORAGE = 'calculadora_historico_v1';

// Recupera o histórico salvo ou retorna um array vazio
function carregarHistorico() {
  const dados = localStorage.getItem(CHAVE_STORAGE);
  return dados ? JSON.parse(dados) : [];
}

// Salva o histórico atualizado no localStorage
function salvarHistorico(historico) {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(historico));
}

// Atualiza a lista na tela
function renderizarHistorico() {
  const lista = document.getElementById('lista-historico');
  const historico = carregarHistorico();
  lista.innerHTML = '';

  historico.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    lista.appendChild(li);
  });
}

// Inicialização dos eventos quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calc-form');
  const inputNum1 = document.getElementById('num1');
  const inputNum2 = document.getElementById('num2');
  const resultadoTexto = document.getElementById('resultado-texto');
  const btnLimpar = document.getElementById('btn-limpar');

  // Carrega dados persistidos ao abrir a página
  renderizarHistorico();

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    // Identifica qual botão disparou o submit (Somar ou Dividir)
    const operacao = evento.submitter.getAttribute('data-op');
    const val1 = inputNum1.value;
    const val2 = inputNum2.value;

    try {
      let resultado;
      let registro;

      if (operacao === 'soma') {
        resultado = somar(val1, val2);
        registro = `${val1} + ${val2} = ${resultado}`;
      } else if (operacao === 'divisao') {
        resultado = dividir(val1, val2);
        registro = `${val1} ÷ ${val2} = ${resultado}`;
      }

      resultadoTexto.textContent = resultado;
      resultadoTexto.style.color = '#212529';

      // Atualiza persistência local
      const historicoAtual = carregarHistorico();
      historicoAtual.unshift(registro); // Adiciona no início da lista
      salvarHistorico(historicoAtual);
      renderizarHistorico();

    } catch (erro) {
      resultadoTexto.textContent = erro.message;
      resultadoTexto.style.color = '#dc3545';
    }
  });

  btnLimpar.addEventListener('click', () => {
    localStorage.removeItem(CHAVE_STORAGE);
    renderizarHistorico();
    resultadoTexto.textContent = 'Histórico limpo.';
  });
});
