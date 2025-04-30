const inputCalculadora = document.getElementById('inputCalculadora');
const regexValidaOperador =  /[+%\-.!*^%/]/


export function validaExpressao(expressao, tecla){
        validaOperadoresExpressao(expressao,tecla);
}

export function validaOperadoresExpressao(expressao,tecla){
    let ultimoCaracterOperador = regexValidaOperador.test(expressao[expressao.length-1]);
    if(expressao == '' && tecla != '(' && tecla != '-' && tecla != '√('){
        return
    }
    if(expressao[expressao.length-1] == '(' && tecla != ")"  && tecla != "(" &&tecla != "-"){
        return
    }

    if(tecla == '(' && ultimoCaracterOperador && expressao[expressao.length-1] != ')'){
        inputCalculadora.value +=`${tecla}`
    }

    if(ultimoCaracterOperador && expressao[expressao.length-1] != ')'&& expressao[expressao.length-1] != '('&& expressao[expressao.length-1] != '%'&& expressao[expressao.length-1] != '!'){
        return
    }
    inputCalculadora.value +=`${tecla}`;
}

export function calculaFatorial(numero){
    let resp = new Function(`return ${numero}`);
    numero = resp()
    let respostaFatorial = 1;
    for(let contadorFatorial = 1 ; contadorFatorial <=numero ; contadorFatorial++){
        respostaFatorial *=contadorFatorial;
    }
    return respostaFatorial;
}

export function calculaSeno(seno){
    const termos = 10;
    let resultado=0;
    let exponesialSeno=0;
    let fatorialContador=0;
    let calculoTermo=0;
    for(let contador =0 ; contador <termos;contador++){
            const sinal = Math.pow(-1, contador);
            exponesialSeno = seno**(2*contador+1);
            fatorialContador = calculaFatorial(2*contador+1);
            calculoTermo = sinal * (exponesialSeno/fatorialContador);
            resultado +=  calculoTermo;
    }
    return resultado
}

export function calculaCosseno(cosseno){
    const termos = 10;
    let resultado=0;
    let exponesialSeno=0;
    let fatorialContador=0;
    let calculoTermo=0;
    for(let contador =0 ; contador <termos;contador++){
            const sinal = Math.pow(-1, contador);
            exponesialSeno = cosseno**(2*contador);
            fatorialContador = calculaFatorial(2*contador);
            calculoTermo = sinal * (exponesialSeno/fatorialContador);
            resultado +=  calculoTermo;
    }
    return resultado
}

export function calculaTangente(tangente){
    let seno = calculaSeno(tangente)
    let cosseno = calculaCosseno(tangente)
    let resposta = seno/cosseno
    return resposta
}


export function formataParenteses(expressao) {
    const abertura = (expressao.match(/\(/g) || []).length;
    const fechamento = (expressao.match(/\)/g) || []).length;
    const faltando = abertura - fechamento;
    return faltando > 0 ? expressao + ')'.repeat(faltando) : expressao;
} 

export function formataExpressao(expressao){
    expressao = formataParenteseMultiplica(expressao)
    expressao = formataSenCosTan(expressao)
    expressao = formataExponencial(expressao)
    expressao = formataRaiz(expressao)
    expressao = formataPotencia(expressao)
    expressao = formataFatorial(expressao)
    expressao = formataParenteses(expressao);
    return expressao
}

function formataSenCosTan(expressao){
    expressao = expressao.replaceAll("sin(","Math.sin(");
    expressao = expressao.replaceAll("cos(","Math.cos(");
    expressao = expressao.replaceAll("tan(","Math.tan(");
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