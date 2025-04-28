

const inputCalculadora = document.getElementById('inputCalculadora');
const regexValidaOperador =  /[+\-*/]{2,}/


export function validaExpressao(expressao, tecla){
        validaOperadoresExpressao(expressao,tecla);
}


export function validaOperadoresExpressao(expressao,tecla){
    if(inputCalculadora.value == '' && tecla != '(' && tecla != ')' && tecla != '-'){
        return
    }

    if(regexValidaOperador.test(expressao)){
        return
    }

    inputCalculadora.value +=`${tecla}`
}


export function formataExpressao(expressao){
    expressao = expressao.replaceAll("sin(","Math.sin(");
    expressao = expressao.replaceAll("cos(","Math.cos(");
    expressao = expressao.replaceAll("tan(","Math.tan(");
    expressao = expressao.replaceAll("%","/100");
    expressao = expressao.replaceAll("^","**");
    return expressao
}



function trocaOperador(expressao,operador,operacao){
    expressao.replace(operador, operacao);
}