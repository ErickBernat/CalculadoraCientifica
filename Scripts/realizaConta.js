import { formataExpressao, formataSenCosTan } from "./validaExpressao.js";

const input = document.getElementById('inputCalculadora');

export function realizaConta(expressao){
    try {
        expressao = formataExpressao(expressao);
        let resultado = new Function(`return ${expressao}`);
        input.value = resultado();
        if(input.value == NaN || input.value == undefined){
            return input.value = 'Error';
        }
    } catch (error) {
        return input.value = 'Error';
    }
}

