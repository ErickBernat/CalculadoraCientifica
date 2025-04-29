const inputCalculadora = document.getElementById('inputCalculadora');
const regexValidaOperador =  /[+%\-.!()*^%/]/


export function validaExpressao(expressao, tecla){
        validaOperadoresExpressao(expressao,tecla);
}


export function validaOperadoresExpressao(expressao,tecla){
    let ultimoCaracterOperador = regexValidaOperador.test(expressao[expressao.length-1]);
    if(expressao == '' && tecla != '(' && tecla != '-'){
        return
    }
    if(tecla == '(' && !(ultimoCaracterOperador) && expressao != ''){
        return
    }
    if(tecla == '(' && ultimoCaracterOperador && expressao[expressao.length-1] != '(' && expressao[expressao.length-1] != ')'){
        inputCalculadora.value +=`${tecla}`
    }
    if(ultimoCaracterOperador&& expressao[expressao.length-1] != '(' && expressao[expressao.length-1] != ')'){
        return
    }
    if(ultimoCaracterOperador && expressao[expressao.length-1] != ')'){
        return
    }
    inputCalculadora.value +=`${tecla}`;
}


export function formataExpressao(expressao){
    expressao = expressao.replaceAll("sin(","Math.sin(");
    expressao = expressao.replaceAll("cos(","Math.cos(");
    expressao = expressao.replaceAll("tan(","Math.tan(");
    expressao = expressao.replaceAll("√","Math.sqrt");
    expressao = expressao.replace(/%(\d)/g, '/100*$1');
    expressao = expressao.replace(/%/g, '/100');
    expressao = expressao.replaceAll("^","**");
    expressao = expressao.replace(/\((\d+)\)!/g, (_, numero) => {
    return calculaFatorial(numero);
    });
    expressao = expressao.replace(/(\d+)!/g, (_, numero) => {
        return calculaFatorial(numero);
        });
    expressao = formataSenCosTan(expressao);
    console.log(expressao)
    return expressao
}


export function calculaFatorial(numero){
    let respostaFatorial = 1;
    for(let contadorFatorial = 1 ; contadorFatorial <=numero ; contadorFatorial++){
        respostaFatorial *=contadorFatorial;
    }
    return respostaFatorial;
}

export function formataSenCosTan(expressao) {
    const abertura = (expressao.match(/\(/g) || []).length;
    const fechamento = (expressao.match(/\)/g) || []).length;
    const faltando = abertura - fechamento;
    return faltando > 0 ? expressao + ')'.repeat(faltando) : expressao;
} 

