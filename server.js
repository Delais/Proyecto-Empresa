const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));
app.get('/', function (req, res) {
  res.send('hola este es mi primer sevidor');
})

app.listen(port, () => {
  console.log(`servidor conectado en el puerto ${port}`);
});

app.post('/multiplicar',(req,res)=>{

  let num = req.body.baseingresada;
  num = parseInt(num);
  let resultado = `<h1> TABLA DE MULTIPLICAR DEL ${num} </h1>\n`

  for(let i= 0; i<=10;i++){
    resultado += `<p>${num} * ${i} = ${num+i}</p> \n` 
  }

  let resul = `<h1> TABLA DE MULTIPLICAR DEL ${num} </h1>\n`;
  for(let i= 0; i<=10;i++){
    resul += `${num} * ${i} = ${num+i} \n` 
  }
  fs.writeFile(`./TABLA_DE_MULTIPLICAR_DEL_${num}.txt`,resul,(err)=>{
    if(err){
      console.log(err);
    }else{
      console.log(`archivo creado`);
    }
  })

  res.send(
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resultado multiplicar</title>
        <link rel="stylesheet" href="assets/css/normalize.css">
        <link rel="stylesheet" href="assets/css/styles.css">
    </head>
    <body class="formulario">
      
    

    <div>
      <a href="multiplicar.html" class="atras boton">Regresar</a>  
    </div>

      <div class="box">
        ${resultado}
      </div>
      
                  
    </body>
    </html>
    `
  );



})

