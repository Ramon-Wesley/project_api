export default class CnpjValidator{
    


  
  private static calcularDigitoVerificador(digitos: string): string {
    let soma = 0;
    let peso = digitos.length + 1;
  
    for (let i = 0; i < digitos.length; i++) {
      soma += parseInt(digitos[i]) * peso;
      peso--;
    }
  
    const resto = soma % 11;
    const digito = resto < 2 ? 0 : 11 - resto;
  
    return digito.toString();
  }



  public static validate(cnpj: string): boolean {
      // Remover caracteres não numéricos
      cnpj = cnpj.replace(/[^\d]/g, '');
    
      // Verificar se o CNPJ tem 14 dígitos
      if (cnpj.length !== 14) {
        return false;
      }
  

  let soma = 0;
  let peso = 5;
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpj[i]) * peso;
    peso -= 1;
    if (peso === 1) {
      peso = 9;
    }
  }

  const resto = soma % 11;
  const digito1 = resto < 2 ? 0 : 11 - resto;

  // Calcular o segundo dígito verificador
  soma = 0;
  peso = 6;
  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpj[i]) * peso;
    peso -= 1;
    if (peso === 1) {
      peso = 9;
    }
  }

  const resto2 = soma % 11;
  const digito2 = resto2 < 2 ? 0 : 11 - resto2;

  // Verificar se os dígitos calculados coincidem com os dígitos do CNPJ
  return parseInt(cnpj[12]) === digito1 && parseInt(cnpj[13]) === digito2;

    }
    

}

