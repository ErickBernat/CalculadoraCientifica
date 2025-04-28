import { ativaTeclaVirtual } from "./ativaTeclaVirtual.js";
import { validaExpressao } from "./validaExpressao.js";

const input = document.getElementById('inputCalculadora');
const regexNumeros =/^[0-9]*$/;
const regexOperadores = /[%÷x√\-!\.=+]/;
let tecla = ''
let expressao = ''

export function validaTeclaInput(){
    input.addEventListener('keydown',(evento)=>{
        tecla = (evento.key).toLocaleUpperCase();
        expressao = input.value;
        verificaTeclaPressionada(tecla);
        ativaTeclaVirtual(tecla);
        input.removeAttribute('disabled');
    })
}

export function verificaTeclaPressionada(tecla){
    if(regexOperadores.test(tecla)){
        validaExpressao(expressao, tecla);
        return
    }
    if (verificaTeclasNulas(tecla)){
        return
    }
    if(regexNumeros.test(tecla)){
        verificaInputVazio()
        return
    }

    input.setAttribute('disabled', 'true');
}


export function verificaTeclasNulas(tecla){
    if(tecla === 'ENTER'){
        realizaConta()
    }
    if(tecla === 'BACKSPACE' || tecla.includes('ARROW') || tecla == 'SHIFT'){
        return true
    }
    return false
}

function verificaInputVazio(){
    if(input.value == 0 && tecla != '0'){
        input.value = ''
    }
}