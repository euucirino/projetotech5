export const validarCPF = (cpf: string): boolean => {
    const apenasNumeros = cpf.replace(/\D/g, '');
  
    if (!cpfValidoFormato( apenasNumeros )) return false;
  
    const primeiroDigito = calcularDigitoVerificador(apenasNumeros, 10);
    const segundoDigito = calcularDigitoVerificador(apenasNumeros, 11);
  
    const cpfCalculado = apenasNumeros.slice(0, 9) + primeiroDigito + segundoDigito;
  
    return apenasNumeros === cpfCalculado;
  };
  
  const cpfValidoFormato = (cpf: string): boolean => {
    return cpf.length === 11 && !/^(\d)\1{10}$/.test(cpf);
  };
  
  const calcularDigitoVerificador = (cpf: string, fator: number): number => {
    const base = cpf.slice(0, fator - 1);
  
    const soma = base
      .split('')
      .reduce((total, numero, index) => {
        return total + parseInt(numero) * (fator - index);
      }, 0);
  
    const resto = 11 - (soma % 11);
    return resto > 9 ? 0 : resto;
  };
  