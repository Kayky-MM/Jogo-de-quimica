function walking(value, turn, cells) {
    const playerIcon = document.getElementById(`p-icon-${turn}`);
    const currentCell = cells.findIndex(c => playerIcon.parentElement === c);
    const nextCell = (currentCell + value > 21) ? 21 : currentCell + value;
    cells[nextCell].append(playerIcon);
}

function verifyWinner(turn, cells) {
    const playerIcon = document.getElementById(`p-icon-${turn}`);
    const currentCell = cells.find(c => playerIcon.parentElement === c);
    return (currentCell.querySelector('span').textContent === 'CÉU') ? turn : 0;
}

function checkAnswer(resolve, currentQuestion, handler) {
    const answer = answerArea.value.trim();
    if (!answer) {
        feedback.textContent = 'Por favor, insira uma resposta.';
        return;
    }
    form.removeEventListener('submit', handler)
    audios[1].pause()
    if (currentQuestion.isCorrect(answer)) {
        feedback.classList.add('correct');
        feedback.textContent = 'Resposta correta!';
        setTimeout(() => {
            audios[2].pause();
            if (audios[2].currentTime >= limit) {
                audios[2].currentTime = 0
            }
        }, 2000)
        audios[2].play().catch(audioError)
        resolve(true)
    } else {
        feedback.classList.add('incorrect');
        feedback.textContent = `Resposta incorreta!`;
        audios[3].play().catch(audioError)
        resolve(false);
    }
}

async function sleep(timer) {
    return new Promise(resolve => setTimeout(resolve, timer))
}

function randomQuestion() {
    let q = random(0, availableQuestions.length - 1)
    return availableQuestions[q]
}

function updateAvaible(question){
        let i = availableQuestions.indexOf(question)
        availableQuestions.splice(i, 1)
        if(availableQuestions.length === 0){
            availableQuestions = [...questions]
        }
}

async function game(quantity = 2) {
    const cells = Array.from(document.querySelectorAll('.cell')).sort((c1, c2) => {
        if (c1.style.gridArea === 'ceu') {
            return 1;
        }
        if (c2.style.gridArea === 'ceu') {
            return -1;
        }
        return c1.style.gridArea.substring(2) - c2.style.gridArea.substring(2);
    })
    let turn = 1;
    let winner = 0;
    let diceValue = 0;
    const disables = new Set();
    const divPlayers = Array.from(document.querySelectorAll('.player-icons')).sort((a, b) => Number(a.id[a.id.length - 1]) - Number(b.id[b.id.length - 1]));
    const advice = document.querySelector('.advice');
    while (!winner) {
        const playerIcon = document.getElementById(`p-icon-${turn}`);
        const currentPlayer = divPlayers[turn - 1]
        advice.textContent = `É a vez do jogador ${turn}!`;
        currentPlayer.classList.add('blinking');
        await sleep(2000);
        if (disables.has(turn)) {
            advice.textContent = `Mas ele(a) não pode se mover! Será a vez do próximo...`
            disables.delete(turn)
            await sleep(2000)
            divPlayers[turn - 1].classList.remove('disabled')
            currentPlayer.classList.remove('blinking');
            turn = (turn % quantity) + 1;
            continue
        }
        advice.textContent = `Vamos ver a pergunta para o jogador ${turn}...`;
        const currentQuestion = randomQuestion();
        sentence.textContent = `${currentQuestion.sentence}\nModelo da resposta: ${currentQuestion.answerFormat}`;
        answerArea.value = '';
        questionCard.classList.add('appear');
        const playerResponse = await new Promise((resolve) => {
            audios[1].play().catch(audioError);
            const submitHandler = (e) => {
                e.preventDefault();
                checkAnswer(resolve, currentQuestion, submitHandler);
            }
            form.addEventListener('submit', submitHandler);
        })
        await sleep(2000);
        feedback.classList.remove('correct', 'incorrect');
        feedback.textContent = '';
        questionCard.classList.remove('appear');

        if (playerResponse) {
            updateAvaible(currentQuestion)
            advice.textContent = `Acertaste! Gire o dado.`
            diceValue = await new Promise(resolve => {
                const clickHandler = () => {
                    dice.removeEventListener('click', clickHandler);
                    rollingDice(resolve);
                }
                dice.addEventListener('click', clickHandler);
            })
            advice.textContent = `Jogador ${turn} girou o dado e tirou ${diceValue}.`;
            await sleep(1500)
            walking(diceValue, turn, cells);
            audios[4].play().catch(audioError)
            if (playerIcon.parentElement.classList.contains('dark-cell')) {
                let again = true;
                let beforeCell = null;
                while (again && playerIcon.parentElement.classList.contains('dark-cell')) {
                    advice.textContent = `Jogador ${turn} caiu numa casa escura! Vamos ver o que ele deve fazer...`
                    await sleep(2000)
                    let currentCell = Number(playerIcon.parentElement.querySelector('.span-number').textContent.trim());
                    const cardToExecuteName = cardsMap.get(currentCell);
                    if (beforeCell === 'goBack' && cardToExecuteName === 'oneMoreJump') {
                        break;
                    }
                    if (cardToExecuteName && specialCards[cardToExecuteName]) {
                        again = specialCards[cardToExecuteName]({ turn, cells, disables, advice, divPlayers });
                        beforeCell = cardToExecuteName;
                    } else {
                        again = false;
                    }
                    await sleep(2000);
                }
            }
            winner = verifyWinner(turn, cells);
        } else {
            advice.textContent = `O jogador errou! Não poderá avançar...`
        }
        await sleep(2000);
        currentPlayer.classList.remove('blinking');
        turn = (turn % quantity) + 1;
    }
    divPlayers[winner - 1].classList.add('winner');
    advice.textContent = `Jogador ${winner} venceu!`
    audios[7].play().catch(audioError)
}