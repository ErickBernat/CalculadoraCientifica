import { verificaTeclasNulas } from "./validaTeclasInput.js";

const inputCalculadora = document.getElementById('inputCalculadora');
const regexValidaOperador = /([+\-*/]{2,})(?![-+*/]*-)/;
let tecla = '';
let expressao = ''


export function validaExpressao(expressao, tecla){
        validaOperadoresExpressao(expressao,tecla);
}


export function validaOperadoresExpressao(expressao,tecla){
    expressao = inputCalculadora.value

    if(expressao === '0' || expressao.value === null){
        inputCalculadora.setAttribute('disabled', 'true');      
    } 
    if(regexValidaOperador.test(expressao)){
        inputCalculadora.setAttribute('disabled', 'true'); 
    }
    
}

