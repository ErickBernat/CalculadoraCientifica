const inputCalculadora = document.getElementById('inputCalculadora');
const regexValidaOperador =  /[+%\-.!*^%/]/


export function validaExpressao(expressao, tecla){
        validaOperadoresNaExpressao(expressao,tecla);
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

export function calculaFatorial(numero){
    let respostaExpressao = new Function(`return ${numero}`);
    numero = respostaExpressao()
    let respostaFatorial = 1;
    for(let contadorFatorial = 1 ; contadorFatorial <=numero ; contadorFatorial++){
        respostaFatorial *=contadorFatorial;
    }
    return respostaFatorial;
}

export function calculaTrigonometria(tipoCalculo,valor){
    const termos = 10;
    let resultado=0;
    let exponesialSeno=0;
    let fatorialContador=0;
    let calculoTermo=0;
    let defineCalculo = tipoCalculo == 'seno' ? 1 : 0;
    for(let contadorTermo=0 ; contadorTermo<termos;contadorTermo++){
            const sinal = Math.pow(-1, contadorTermo);
            exponesialSeno = valor**(2*contadorTermo+defineCalculo);
            fatorialContador = calculaFatorial(2*contadorTermo+defineCalculo);
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