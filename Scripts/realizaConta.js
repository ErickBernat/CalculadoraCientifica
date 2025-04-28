import { formataExpressao } from "./validaExpressao.js";

const input = document.getElementById('inputCalculadora');

export function realizaConta(expressao){
    try {
        expressao = formataExpressao(expressao);
        let resultado = new Function(`return ${expressao}`);
    
        if(resultado == NaN || resultado == undefined){
            return input.value = 'Error';
        }
        input.value = resultado();
    } catch (error) {
        return input.value = 'Error';
    }

    
}

