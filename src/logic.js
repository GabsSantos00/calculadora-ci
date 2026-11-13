function somar(a, b) {
  const numA = Number(a);
  const numB = Number(b);

  if (isNaN(numA) || isNaN(numB)) {
    throw new Error('Os valores informados devem ser números válidos.');
  }

  return numA + numB;
}

function dividir(a, b) {
  const numA = Number(a);
  const numB = Number(b);

  if (isNaN(numA) || isNaN(numB)) {
    throw new Error('Os valores informados devem ser números válidos.');
  }

  if (numB === 0) {
    throw new Error('Não é possível dividir por zero.');
  }

  return numA / numB;
}

}
