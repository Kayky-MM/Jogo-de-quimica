const colors = ['rgba(255, 50, 50, 1)', 'rgba(0, 255, 0, 1)', 'rgba(0, 0, 255, 1)', 'rgba(255, 165, 0, 1)'];
const optionButtons = Array.from(document.querySelectorAll('.options button'));
let cardsMap = null;
const surpriseCells = [];
const audios = Array.from(document.querySelectorAll('audio')).sort((a, b) => a.id[2] - b.id[2])
const dice = document.querySelector('.dice');
let spriteDice;
const questionCard = document.querySelector('.question-card');
const sentence = document.querySelector('p.sentence');
const checkButton = document.querySelector('.check')
const answerArea = document.getElementById('answer-area');
const feedback = document.querySelector('.feedback');
const form = document.getElementById('answer-form');
const articleHelp = document.querySelector('.article-help')
let hasQuestion = false
const diceFacesPositions = {
    1: { top: '-300%', left: '0%' },
    2: { top: '-200%', left: '0%' },
    3: { top: '-200%', left: '-100%' },
    4: { top: '-100%', left: '-100%' },
    5: { top: '-100%', left: '-200%' },
    6: { top: '-100%', left: '-300%' }
};
let currentDiceValue = 1;
const limit = 5
let isRolling = false;
const audioError = e => console.error('Não foi possível tocar o som', e);
const cardsName = ['oneMoreJump', 'goBack', 'goToTheEnd', 'disablePlayer']
const specialCards = Object.freeze({
    'oneMoreJump': function ({ turn, cells, disables, advice }) {
        advice.textContent = `Jogador ${turn} avança mais uma casa!`
        walking(1, turn, cells)
        audios[4].play().catch(audioError)
        return true
    },
    'goBack': function ({ turn, cells, disables, advice }) {
        advice.textContent = `Jogador ${turn} volta uma casa!`
        walking(-1, turn, cells)
        audios[5].play().catch(audioError)
        return true
    },
    'goToTheEnd': function ({ turn, cells, disables, advice }) {
        advice.textContent = `Wow! Jogador ${turn} volta para o começo!`
        const playerIcon = document.getElementById(`p-icon-${turn}`);
        cells[0].append(playerIcon)
        audios[6].play().catch(audioError)
        return false
    },
    'disablePlayer': function ({ turn, cells, disables, advice, divPlayers }) {
        advice.textContent = `Jogador ${turn} não se moverá no próximo turno!`
        disables.add(turn);
        divPlayers[turn-1].classList.add('disabled')
        audios[5].play().catch(audioError)
        return false
    }
})
const random = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const mapFunction = () => {
    const map = new Map();
    const availableCells = [...surpriseCells];
    cardsName.forEach(card => {
        if (availableCells.length === 0) {
            return; 
        }
        const randomIndex = random(0, availableCells.length - 1);
        const cell = availableCells.splice(randomIndex, 1)[0];
        map.set(cell, card);
    });
    
    availableCells.forEach(cell => {
        const randomIndex = random(0, cardsName.length - 1);
        const card = cardsName[randomIndex];
        map.set(cell, card);
    });

    return map;
};