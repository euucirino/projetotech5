export const validarSeASenhaEForte = (senha: string): boolean => {
    if (!senha) return false;
  
    return (
      possuiMinimoDeCaracteres(senha) &&
      possuiLetraMaiuscula(senha) &&
      possuiLetraMinuscula(senha) &&
      possuiNumero(senha) &&
      possuiCaractereEspecial(senha)
    );
  };
  
  const possuiMinimoDeCaracteres = (senha: string): boolean => senha.length >= 8;
  const possuiLetraMaiuscula = (senha: string): boolean => /[A-Z]/.test(senha);
  const possuiLetraMinuscula = (senha: string): boolean => /[a-z]/.test(senha);
  const possuiNumero = (senha: string): boolean => /[0-9]/.test(senha);
  const possuiCaractereEspecial = (senha: string): boolean => /[\W_]/.test(senha);
  
  