export const validarEmail = (email: string): boolean => {
    if (!email) return false;
    return formatoEmailValido(email);
  };
  
  const formatoEmailValido = (email: string): boolean => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };
  