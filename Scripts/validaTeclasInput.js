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
    verificaInputVazio(tecla);
    verificaTeclasAcao(tecla);
    verificaLetraOperacao(tecla)
    validaOperador(expressao, tecla)
    validaNumeros(expressao,tecla)
}   

function validaOperador(expressao,tecla){
    if(regexOperadores.test(tecla)){
        validaExpressao(expressao, tecla);
        return
    }
}

function validaNumeros(expressao,tecla){
    if(expressao[expressao.length-1] == ')'){
        return
    }
    if(regexNumeros.test(tecla)){
        input.value +=`${tecla}`
        return
    }
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

function verificaInputVazio(tecla){
    if(input.value == ''){
        input.value =0
    }
    if(tecla != 0 && input.value =='0' || input.value == 'Error'){
        input.value = ''
        return
    }
    if(input.value == 'Error'){
        input.value = ''
    }
}

function verificaLetraOperacao(tecla){
    expressao = input.value;
    switch (tecla) {
        case 'E':
            trocaLetraOperador('^');
            break;
        case 'R':
            trocaLetraOperador('√(');
            break;
        case 'P':
            trocaLetraOperador('%');
            break;
        case 'S':
            validaSenoCosTang('sin(');
            break;
        case 'T':
            validaSenoCosTang('tan(');
            break;
        case 'C':
            validaSenoCosTang('cos(');
            break;
        case 'X':
            trocaLetraOperador('*');
            break;
        case 'A':
            input.value =''
            break;
        default:
            break;
    }
}

function validaSenoCosTang(operacao){
    if(expressao[expressao.length-1] == ')'){
        return
    }
    if(regexOperadores.test(expressao[expressao.length-1]) || expressao == '' || expressao[expressao.length-1] == '*'){
        input.value +=operacao
    }
}

function trocaLetraOperador(operador){
    let posicaoUltimoCarater = operador == '√(' ? 2 : 1;

    if(operador == '√('){
        input.value +=operador
        return
    }
    if(inputCalculadora.value == '' || expressao[expressao.length-posicaoUltimoCarater] == operador[0] || expressao[expressao.length-posicaoUltimoCarater] == "(" ){
        return
    }
    input.value +=operador
}