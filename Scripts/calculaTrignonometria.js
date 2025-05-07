import { calculaFatorial } from "./calculaFatorial.js";
import { formataExpressao } from "./validaExpressao.js";


export function calculaTrigonometria(tipoCalculo,valor){
    valor = formataExpressao(valor)
    let respostaExpressao = new Function(`return ${valor}`);
    valor = respostaExpressao()
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
    let seno = calculaTrigonometria('seno',tangente)
    let cosseno = calculaTrigonometria('cosseno',tangente)
    let resposta = seno/cosseno
    return resposta
}