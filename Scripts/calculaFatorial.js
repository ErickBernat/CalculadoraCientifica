
export function calculaFatorial(numero){
    let respostaExpressao = new Function(`return ${numero}`);
    numero = respostaExpressao()
    let respostaFatorial = 1;
    for(let contadorFatorial = 1 ; contadorFatorial <=numero ; contadorFatorial++){
        respostaFatorial *=contadorFatorial;
    }
    return respostaFatorial;
}