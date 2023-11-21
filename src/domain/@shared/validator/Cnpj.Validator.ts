export default class CnpjValidator{
    
    public static validate(cnpj: string): boolean {
       
    const cnpjLimpo = cnpj.replace(/[^\d]/g, '');

 
  if (cnpjLimpo.length !== 14) {
    return false;
  }

  if (/^(\d)\1+$/.test(cnpjLimpo)) {
    return false;
  }

 
  const calcularDigitoVerificador = (slice: string): number => {
    let soma = 0;
    let peso = slice.length + 1;

    for (let i = 0; i < slice.length; i++) {
      soma += parseInt(slice.charAt(i)) * peso--;
    }

    const resto = soma % 11;

    return resto < 2 ? 0 : 11 - resto;
  };

  const primeiroDigito = calcularDigitoVerificador(cnpjLimpo.slice(0, 12));
  const segundoDigito = calcularDigitoVerificador(cnpjLimpo.slice(0, 12) + primeiroDigito);

  
  if (
    parseInt(cnpjLimpo.charAt(12)) !== primeiroDigito ||
    parseInt(cnpjLimpo.charAt(13)) !== segundoDigito
  ) {
    return false;
  }

  return true;
      }
      
}


