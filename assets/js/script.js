const clock = document.querySelector('.clock');
const iniciar = document.querySelector('.iniciar');
const pausar = document.querySelector('.pausar');
const zerar = document.querySelector('.zerar');
const gravar = document.querySelector('.gravar');
const limpar = document.querySelector('.limpar');
const resultado = document.querySelector('.resultados')
let time;
let startTime;
let elapsedTime = 0;
let animationRequest;
let qntResul = 1;
gravar.setAttribute('disabled', '');
pausar.setAttribute('disabled', '');
limpar.setAttribute('disabled','');

function mostrarRelogio(ms){
    const data = new Date(ms);
    const dataFormatada = data.toLocaleTimeString('pt-BR', {
        hour12 : false,
        hour : "2-digit",
        minute : "2-digit",
        second : "2-digit",
        fractionalSecondDigits : 2,
        timeZone : "UTC"
    })
    
    return dataFormatada.replace(',', ':');
}

iniciar.addEventListener('click', () => {
    iniciarTimer();
})

pausar.addEventListener('click', ()=> {
    pausarTimer();
})

zerar.addEventListener('click', ()=>{
    zerarTimer();
})

gravar.addEventListener('click', ()=>{
    gravarTimer();
})

limpar.addEventListener('click', ()=>{
    limparResultados();
})


function atualizarTimer(){
    elapsedTime = Date.now() - startTime;
    clock.innerHTML = mostrarRelogio(elapsedTime);
    animationRequest = requestAnimationFrame(atualizarTimer)
}

function iniciarTimer(){

    startTime = Date.now() - elapsedTime;

   animationRequest = requestAnimationFrame(atualizarTimer)
   iniciar.setAttribute('disabled', '');
   pausar.removeAttribute('disabled', '');
   zerar.removeAttribute('disabled', '');
   zerar.classList.add('desaparecer')
   pausar.classList.remove('desaparecer');
   gravar.removeAttribute('disabled', '')
}

function pausarTimer(){
    cancelAnimationFrame(animationRequest);
    iniciar.removeAttribute('disabled', '');
    pausar.classList.add('desaparecer')
    zerar.classList.remove('desaparecer');
}

function zerarTimer(){
    cancelAnimationFrame(animationRequest);
    clock.innerHTML = mostrarRelogio(0);
    elapsedTime = 0;
    iniciar.removeAttribute('disabled', '');
    pausar.setAttribute('disabled', '');
    zerar.classList.add('desaparecer')
    pausar.classList.remove('desaparecer');
    gravar.setAttribute('disabled', '');
}

function criarP(){
   return document.createElement('p');
}

function gravarTimer(){
    if(qntResul === 1){
        resultado.innerHTML = '';
    }
    const p = criarP();
    p.innerHTML = `${qntResul}) ${mostrarRelogio(elapsedTime)}`;
    resultado.appendChild(p);
    qntResul++;
    limpar.removeAttribute('disabled','');
}

function limparResultados(){
    qntResul = 1;
    resultado.innerHTML = '';
    const p = criarP();
    p.innerHTML = 'Não há resultados gravados';
    resultado.appendChild(p)
    limpar.setAttribute('disabled','');
}

