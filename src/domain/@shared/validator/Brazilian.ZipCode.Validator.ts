export default class BrazilianZipCodeValidator{

    public static validate(zipCode:string){
      
            const cepNumerico = zipCode.replace(/\D/g, '');
          
            if (cepNumerico.length !== 8) {
              return false;
            }
          
            const formatoValido = /^[0-9]{5}-[0-9]{3}$/;
          
            return formatoValido.test(zipCode);
          }
                 
    }
