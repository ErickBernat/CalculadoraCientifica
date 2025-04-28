import { ativaTeclaVirtual } from "./ativaTeclaVirtual.js";
import { realizaConta } from "./realizaConta.js";
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
    if (verificaOperador(tecla)){
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
        realizaConta(expressao)
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

function verificaOperador(tecla){
    switch (tecla) {
        case 'E':
            input.value +='^'
            break;
        case 'R':
            input.value +='√'
            break;
        case 'S':
            input.value +='sin()'
            break;
        case 'T':
            input.value +='tan()'
            break;
        case 'C':
            input.value +='cos()'
            break;
        default:
            break;
    }
}