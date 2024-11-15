export const templateForgotPassword=( numberEmailIdentification:string)=>{
    const numbersValues=numberEmailIdentification.split("")
    const numbersLength=numbersValues.length

    const valuesFormated=numbersValues.map((value,index)=>{

        if(index<numbersLength-1){
            return `<p  style="border:3px solid #000; padding:5px 20px ;text-align: center; font-weight: bold; font-size: large;"> ${value}</p>`
        }
        if(index===numbersLength-1){
              return `<p  style="border:3px solid #000; padding:5px 20px ;text-align: center; font-weight: bold; font-size: large;"> ${value}</p>`
        }
    }).join("")


    return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Recuperar senha</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin: 0; padding: 0;">
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
                <h1>Recuperar Senha</h1>
            </div>
            <p style="font-size:1.1em; gap:2px; display:flex">Aqui esta o numero de identificação para recuperar a sua senha.
                  <div style="display: flex; gap: 5px;">

                   <div style="display: flex; gap: 5px;">
            ${valuesFormated}
            </div>
            </p>
            <p>
</body>
</html>
    
    `
}