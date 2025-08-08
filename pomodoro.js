let timerInterval;
        let isRunning = false;
        let isWorkMode = true; 
        let minutes = 25;
        let seconds = 0;

       
        const timerDisplay = document.getElementById('timer');
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const resetBtn = document.getElementById('resetBtn');
        const toggleBtn = document.getElementById('toggleBtn');
        const modeInfo = document.getElementById('mode-info');

        
        function updateTimerDisplay() {
            const min = String(minutes).padStart(2, '0');
            const sec = String(seconds).padStart(2, '0');
            timerDisplay.textContent = `${min}:${sec}`;
        }

        
        function startTimer() {
            if (isRunning) return;

            isRunning = true;
            timerInterval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        
                        clearInterval(timerInterval);
                        alert("Tempo esgotado!");
                        toggleMode();
                        startTimer(); 
                    }
                    minutes--;
                    seconds = 59;
                } else {
                    seconds--;
                }
                updateTimerDisplay();
            }, 1000);
        }

        
        function pauseTimer() {
            if (!isRunning) return;

            isRunning = false;
            clearInterval(timerInterval);
        }

        
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

        
        startBtn.addEventListener('click', startTimer);
        pauseBtn.addEventListener('click', pauseTimer);
        resetBtn.addEventListener('click', resetTimer);
        toggleBtn.addEventListener('click', toggleMode);

       
        updateTimerDisplay();