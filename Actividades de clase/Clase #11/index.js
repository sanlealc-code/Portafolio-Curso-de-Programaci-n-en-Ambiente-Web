const readline = require("readline/promises"); //Promises es para usar async/await en lugar de callbacks

const {stdin: input, stdout: output}=  require("process"); 

const rl = readline.createInterface({input, output}); //Lo que captura el usuario

async function iniciar(){ 
    const nombre = await rl.question("¿Cuál es tu nombre? ");
    
    const valLetras = /^([a-zA-Z]\s?)+$/; //Expresión regular para validar solo letras y espacios
    
    if (valLetras.test(nombre)) {
        console.log(`El nombre escrito fue: ${nombre}`); //alt 96 para las comillas invertidas
    } else {
        console.log("Debe digitar solo letras y espacios.");
    }

    console.log(`El nombre escrito fue: ${nombre}`); //alt 96 para las comillas invertidas

    rl.close(); //Cierra la interfaz de lectura
}

iniciar();