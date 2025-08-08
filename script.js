let banco = [];

const getBanco = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem ('todoList', JSON.stringify(banco));

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `;
    document.getElementById('todoList').appendChild(item);
}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco(); 
    banco.forEach ( (item, indice) => criarItem (item.tarefa, item.status, indice));
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter'){
        const banco = getBanco();
        banco.push ({'tarefa': texto, 'status': ''});
        setBanco(banco);
        atualizarTela();
        evento.target.value = '';
    }
}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice (indice, 1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    console.log (elemento.type);
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem (indice);
    }else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem (indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();

const chk = document.getElementById('chk')

chk.addEventListener('change', () => {
    document.body.classList.toggle('dark')
})

let timerInterval;
        let isRunning = false;
        let isWorkMode = true; // true = Trabalho, false = Descanso
        let minutes = 25;
        let seconds = 0;

        // Elementos do DOM
        const timerDisplay = document.getElementById('timer');
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const resetBtn = document.getElementById('resetBtn');
        const toggleBtn = document.getElementById('toggleBtn');
        const modeInfo = document.getElementById('mode-info');

        // Função para atualizar o display do timer
        function updateTimerDisplay() {
            const min = String(minutes).padStart(2, '0');
            const sec = String(seconds).padStart(2, '0');
            timerDisplay.textContent = `${min}:${sec}`;
        }

        // Função para iniciar o timer
        function startTimer() {
            if (isRunning) return;

            isRunning = true;
            timerInterval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        // O tempo acabou, alterna o modo
                        clearInterval(timerInterval);
                        alert("Tempo esgotado!");
                        toggleMode();
                        startTimer(); // Inicia o próximo ciclo automaticamente
                        return;
                    }
                    minutes--;
                    seconds = 59;
                } else {
                    seconds--;
                }
                updateTimerDisplay();
            }, 1000);
        }

        // Função para pausar o timer
        function pauseTimer() {
            if (!isRunning) return;

            isRunning = false;
            clearInterval(timerInterval);
        }

        // Função para resetar o timer para o modo atual
        function resetTimer() {
            pauseTimer();
            if (isWorkMode) {
                minutes = 25;
            } else {
                minutes = 5;
            }
            seconds = 0;
            updateTimerDisplay();
        }

        // Função para alternar entre os modos
        function toggleMode() {
            pauseTimer();
            isWorkMode = !isWorkMode;
            if (isWorkMode) {
                minutes = 25;
                modeInfo.textContent = 'Modo de Trabalho';
                toggleBtn.textContent = 'Descanso';
            } else {
                minutes = 5;
                modeInfo.textContent = 'Modo de Descanso';
                toggleBtn.textContent = 'Trabalho';
            }
            seconds = 0;
            updateTimerDisplay();
        }

        // Adiciona os eventos aos botões
        startBtn.addEventListener('click', startTimer);
        pauseBtn.addEventListener('click', pauseTimer);
        resetBtn.addEventListener('click', resetTimer);
        toggleBtn.addEventListener('click', toggleMode);

        // Atualiza a tela inicial
        updateTimerDisplay();
