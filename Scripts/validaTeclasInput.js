import { ativaTeclaVirtual } from "./ativaTeclaVirtual.js";
import { realizaConta } from "./realizaConta.js";
import { validaExpressao } from "./validaExpressao.js";

const input = document.getElementById('inputCalculadora');
const regexNumeros =/^[0-9]*$/;
const regexOperadores = /[÷x√/\-!()\.+]/;
let tecla = ''
let expressao = ''

export function validaTeclaInput(){
    document.addEventListener('keydown',(evento)=>{
        tecla = (evento.key).toLocaleUpperCase();
        verificaTeclaPressionada(tecla);
        ativaTeclaVirtual(tecla);
    })
}

export function verificaTeclaPressionada(tecla){
    expressao = input.value;
    verificaInputVazio()
    if(regexOperadores.test(tecla)){
        validaExpressao(expressao, tecla);
        return
    }
    if (verificaTeclasAcao(tecla)){
        return
    }
    if (verificaLetraOperacao(tecla)){
        return
    }
    if(regexNumeros.test(tecla)){
        input.value +=`${tecla}`
        return
    }

    input.setAttribute('disabled', 'true');
}


export function verificaTeclasAcao(tecla){
    if(tecla === 'ENTER'){
        realizaConta(expressao)
    }
    if(tecla === 'BACKSPACE'){
        input.value = input.value.slice(0, input.value.length-1)
    }
    return false
}

function verificaInputVazio(){
    console.log(expressao)
    if(input.value == 0 ||input.value == 'Error' || input.value === 'Undefined'|| input.value === 'Infinity' || input.value == 'Nan' && tecla != '0'){
        input.value = ''
    }
}


function verificaLetraOperacao(tecla){
    switch (tecla) {
        case 'E':
            if(inputCalculadora.value == ''){
                return
            }
            input.value +='^'
            break;
        case 'R':
            input.value +='√'
            break;
        case 'P':
            if(inputCalculadora.value == ''){
                return
            }
            input.value +='%'
            break;
        case 'S':
            input.value +='sin('
            break;
        case 'T':
            input.value +='tan('
            break;
        case 'C':
            input.value +='cos('
            break;
        case 'X':
            if(inputCalculadora.value == ''){
                return
            }
            input.value +='*'
            break;
        case '/':
            if(inputCalculadora.value == ''){
                return
            }
            input.value +='/'
            break;
        case 'A':
            input.value =''
            break;
        default:
            break;
    }
}