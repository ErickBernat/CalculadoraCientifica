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
    if(regexOperadores.test(tecla)){
        validaExpressao(expressao, tecla);
        return
    }
    if(regexNumeros.test(tecla)){
        if(expressao[expressao.length-1] == ')'){
            return
        }
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
    if(tecla == 0){
        return
    }
    if(input.value == 0  ||input.value == 'Error' || input.value === 'Undefined'|| input.value === 'Infinity' || input.value == 'Nan' && tecla != '0'){
        input.value = ''
    }
}

function verificaLetraOperacao(tecla){
    expressao = input.value
    switch (tecla) {
        case 'E':
            validaOperador('^')
            break;
        case 'R':
            validaOperador('√(')
            break;
        case 'P':
            validaOperador('%')
            break;
        case 'S':
            validaSenoCosTang('sin(')
            break;
        case 'T':
            validaSenoCosTang('tan(')
            break;
        case 'C':
            validaSenoCosTang('cos(')
            break;
        case 'X':
            validaOperador('*');
            break;
        case '/':
            validaOperador('/');
            break;
        case 'A':
            input.value =''
            break;
        default:
            break;
    }
}

function validaSenoCosTang(operacao){
    if(regexOperadores.test(expressao[expressao.length-1]) || expressao == '' || expressao[expressao.length-1] == '*' && expressao[expressao.length-1] != ')'){
        console.log('entrou')
        input.value +=operacao
    }
}

function validaOperador(operador){
    let posicaoUltimoCarater = operador == '√(' ? 2 : 1
    if(inputCalculadora.value == '' || expressao[expressao.length-posicaoUltimoCarater] == operador[0]){
        return
    }
    input.value +=operador
}