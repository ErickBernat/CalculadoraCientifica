import { ativaTeclaVirtual } from "./ativaTeclaVirtual.js";

const input = document.getElementById('inputCalculadora');
const regexTeclas =/^[0-9spactxreSPACTXRE\/\-!\.=+\(\)]*$/;
let tecla = ''

export function validaContaInput(){
    input.addEventListener('keydown',(evento)=>{
        tecla = evento.key
        verificaTeclaPressionada(tecla,regexTeclas);
        ativaTeclaVirtual(tecla)
        input.removeAttribute('disabled');
    })
}

function verificaTeclaPressionada(tecla,validacao){
    console.log(tecla)
    if(tecla === 'Backspace' || tecla.includes('Arrow') || tecla === 'Enter'){
        return
    }
    if(validacao.test(tecla)){
        return
    }
    input.setAttribute('disabled', 'true');
}