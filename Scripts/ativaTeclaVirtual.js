const teclasVirtuais = document.querySelectorAll('button');
const tempoTeclaAtiva = 1000;

export function ativaTeclaVirtual(teclaTeclado){
    desativaTeclaVirtual();
    teclasVirtuais.forEach(teclaVirtual =>{
        if(verificaTeclaVirtual(teclaVirtual, teclaTeclado)){
            teclaVirtual.classList.add('teclaPressionada');
            setTimeout(() => {
                desativaTeclaVirtual()
            },tempoTeclaAtiva);
        };
    })
}

function desativaTeclaVirtual(){
    teclasVirtuais.forEach(tecla =>{
        tecla.classList.remove('teclaPressionada');
    })
}

function verificaTeclaVirtual(teclaVirtual, teclaTeclado){
    if(teclaVirtual.id == teclaTeclado){
        return true
    }
}