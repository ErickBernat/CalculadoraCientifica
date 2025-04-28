const input = document.getElementById('inputCalculadora');

export function realizaConta(expressao){
    expressao =  input.value
    let resultado = new Function(`return ${expressao}`);
    input.value = resultado()
}