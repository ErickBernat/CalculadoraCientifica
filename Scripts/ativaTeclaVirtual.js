const teclasVirtuais = document.querySelectorAll('button');


export function ativaTeclaVirtual(teclaTeclado){
    desativaTeclaVirtual();
    teclasVirtuais.forEach(teclaVirtual =>{
        if(verificaTeclaVirtual(teclaVirtual, teclaTeclado)){
            teclaVirtual.classList.add('teclaPressionada');
            setTimeout(() => {
                desativaTeclaVirtual()
            }, 1000);
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