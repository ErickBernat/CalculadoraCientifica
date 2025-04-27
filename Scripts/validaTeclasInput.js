import { ativaTeclaVirtual } from "./ativaTeclaVirtual.js";

const input = document.getElementById('inputCalculadora');
const regexTeclas =/^[0-9spactxreSPACTXRE\/\-!%\.=+\(\)]*$/;
let tecla = ''

export function validaContaInput(){
    input.addEventListener('keydown',(evento)=>{
        tecla = (evento.key).toLocaleUpperCase()
        verificaTeclaPressionada(tecla,regexTeclas);
        ativaTeclaVirtual(tecla)
        input.removeAttribute('disabled');
    })
}

function verificaTeclaPressionada(tecla,validacao){
    if(tecla === 'BACKSPACE' || tecla.includes('ARROW') || tecla === 'ENTER'|| tecla == 'SHIFT'){
        return
    }
    if(validacao.test(tecla)){
        return
    }
    input.setAttribute('disabled', 'true');
}