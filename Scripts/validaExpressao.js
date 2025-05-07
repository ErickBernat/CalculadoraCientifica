import { calculaFatorial } from "./calculaFatorial.js";
import { calculaTangente, calculaTrigonometria } from "./calculaTrignonometria.js";


const inputCalculadora = document.getElementById('inputCalculadora');
const regexValidaOperador =  /[+%\-.!*^%/]/


export function validaExpressao(expressao, tecla){
        validaOperadoresNaExpressao(expressao,tecla);
}
export function formataParenteses(expressao) {
    const abertura = (expressao.match(/\(/g) || []).length;
    const fechamento = (expressao.match(/\)/g) || []).length;
    const faltando = abertura - fechamento;
    return faltando > 0 ? expressao + ')'.repeat(faltando) : expressao;
} 

export function formataExpressao(expressao){
    expressao = formataParenteseMultiplica(expressao)
    expressao = formataParenteses(expressao);
    expressao = formataSenCosTan(expressao)
    expressao = formataExponencial(expressao)
    expressao = formataRaiz(expressao)
    expressao = formataPotencia(expressao)
    expressao = formataFatorial(expressao)
    return expressao
}


function formataParenteseMultiplica(expressao){
    expressao = expressao.replace(/(?<=[\d%\)])\(/g, '*(');
    return expressao
}

function formataPotencia(expressao){
    expressao = expressao.replace(/%(\d)/g, '/100*$1');
    expressao = expressao.replace(/%/g, '/100');
    return expressao
}

function formataFatorial(expressao){
    expressao = expressao .replace(/(\([\d\+\-\*\/\.]+\)|\d+)(\!)/g, (_, numero) => {
        return calculaFatorial(numero);
    });
    expressao = expressao.replace(/(\d+)!/g, (_, numero) => {
    return calculaFatorial(numero);
    });
    expressao = expressao.replace(/!(?=\d)/g, (_, numero) => {
        return calculaFatorial(numero) +'*';
    });
    return expressao
}

function formataRaiz(expressao){
    expressao = expressao.replace(/(?<=[\d\)])√/g, '*Math.sqrt');
    expressao = expressao.replaceAll("√","Math.sqrt");
    return expressao
}

function formataExponencial(expressao){
    return expressao.replaceAll("^","**");
}

function formataSenCosTan(expressao){
    expressao = expressao.replace(/\bsin\s*\(\s*([^)]+?)\s*\)/g, (_, valor) => {
        return  calculaTrigonometria('seno',valor);
    });
    expressao = expressao.replace(/\bcos\s*\(\s*([^)]+?)\s*\)/g, (_, valor) => {
        return  calculaTrigonometria('cosseno',valor);
    });
    expressao = expressao.replace(/\btan\s*\(\s*([^)]+?)\s*\)/g, (_, valor) => {
        return  calculaTangente(valor);
    });
    return expressao
}

export function validaOperadoresNaExpressao(expressao,tecla){
    let ultimoCaracter = expressao[expressao.length-1]
    let ultimoCaracterOperador = regexValidaOperador.test(ultimoCaracter);
    if(expressao == '' && tecla != '(' && tecla != '-' && tecla != '√('){
        return
    }
    if(ultimoCaracter == '(' && tecla != ")"  && tecla != "(" &&tecla != "-"){
        return
    }
    if(tecla == '(' && ultimoCaracterOperador && ultimoCaracter != ')'){
        inputCalculadora.value +=`${tecla}`
    }
    if(ultimoCaracterOperador && ultimoCaracter != ')'&& ultimoCaracter != '('&& ultimoCaracter != '%'&& ultimoCaracter != '!'){
        return
    }
    inputCalculadora.value +=`${tecla}`;
}