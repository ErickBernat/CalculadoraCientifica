import { formataExpressao, formataParenteses} from "./validaExpressao.js";

const input = document.getElementById('inputCalculadora');

export function realizaConta(expressao){
    try {
        expressao = formataExpressao(expressao);
        let resultado = new Function(`return ${expressao}`);
        input.value = resultado();
        if(isNaN(input.value) || input.value == 'Infinity'){
            throw new Error("Erro ao fazer o calculo");
        }
    } catch (error) {
        return input.value = 'Error';
    }
}

