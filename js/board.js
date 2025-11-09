function removeMiddleOfClusters(currentCombination) {
    let result = [...currentCombination].sort((a, b) => a - b);
    let indicesToRemove = new Set();

    for (let i = 0; i < result.length - 2; i++) {
        if (
            result[i + 1] === result[i] + 1 &&
            result[i + 2] === result[i + 1] + 1
        ) {
            indicesToRemove.add(i + 1);
            let j = i + 2;
            while (j < result.length - 1 && result[j + 1] === result[j] + 1) {
                indicesToRemove.add(j + 1);
                j++;
            }
            i = j;
        }
    }

    const sortedIndicesToRemove = Array.from(indicesToRemove).sort((a, b) => b - a);

    for (const index of sortedIndicesToRemove) {
        if (index >= 0 && index < result.length) {
            result.splice(index, 1);
        }
    }

    return result;
}

function getCombination(n1, n2, k) {
    if (typeof _ === 'undefined' || typeof _.sampleSize !== 'function') {
        return [7, 9, 13, 14, 17, 18];
    }

    const totalNumerosNoRange = n2 - n1 + 1;

    if (k < 0 || k > totalNumerosNoRange) {
        throw new Error(`O número de elementos a selecionar (k=${k}) é inválido para o range [${n1}, ${n2}]. Ele deve estar entre 0 e ${totalNumerosNoRange}.`);
    }

    const rangeCompleto = [];
    for (let i = n1; i <= n2; i++) {
        rangeCompleto.push(i);
    }
    return _.sampleSize(rangeCompleto, k);
}

function congifTemplateArea(squareNumber = 12) {
    if (squareNumber % 3 !== 0 || squareNumber === 0)
        return '';
    let area = `". . ceu ceu . ."`;
    let iterations = squareNumber / 3;
    for (let i = iterations; i > 0; i--) {
        let line1 = `". s-${3 * i - 1} s-${3 * i - 1} s-${3 * i} s-${3 * i} ."`
        let line2 = `". . s-${3 * i - 2} s-${3 * i - 2} . ."`
        area = area + ' ' + line1 + ' ' + line2
    }
    return area
}

function insertCells(squareNumber, board, chosenCells) {
    for (let i = 0; i < squareNumber; i++) {
        const cell = document.createElement('div')
        if (chosenCells.includes(i + 1)) {
            cell.classList.add('dark-cell')
        }
        cell.classList.add('cell');
        if (i === 0) {
            cell.classList.add('cell-1')
        }
        cell.style.gridArea = `s-${i + 1}`
        const spanNumber = document.createElement('span');
        spanNumber.classList.add('span-number');
        spanNumber.textContent = i + 1;
        cell.append(spanNumber);
        board.append(cell)
    }
    const ceu = document.createElement('div');
    ceu.classList.add('cell');
    ceu.style.gridArea = 'ceu';
    ceu.innerHTML = `<span class="span-ceu">CÉU</span>`;
    board.append(ceu);

}

function insertPlayers(quantity) {
    const svgHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="172" height="292" viewBox="0 0 172 292" fill="none">
<circle cx="86" cy="86" r="82" stroke="black" stroke-width="8" fill="color-player"/>
<path d="M153.55 288H18.4502L86 170.999L153.55 288Z" stroke="black" stroke-width="8" fill="color-player"/>
<ellipse cx="130.5" cy="85.5" rx="17.5" ry="16.5" fill="black"/>
<circle cx="41.5" cy="86.5" r="17.5" fill="black"/>
</svg>`;
    const cell1 = document.querySelector('.cell-1')
    for (let i = 0; i < quantity; i++) {
        const divSvg = document.createElement('div')
        divSvg.classList.add('player-icon')
        divSvg.id = `p-icon-${i + 1}`;
        divSvg.innerHTML = svgHtml.replaceAll('color-player', colors[i]);
        cell1.append(divSvg)
    }
}

async function loadBoard(quantity = 2, squareNumber = 12) {
    const board = document.querySelector('.board')
    let arr = getCombination(7, 21, 6)
    const chosenCells = removeMiddleOfClusters(arr);
    insertCells(squareNumber, board, chosenCells);
    insertPlayers(quantity);
    board.style.setProperty('grid-template-areas', congifTemplateArea(squareNumber))
    return true;
}

function loadPlayers(quantity = 2) {
    const playerGroup = document.querySelector('.player-group');
    for (let i = 0; i < quantity; i++) {
        const playerIcon = document.createElement('div');
        const spanNumber = document.createElement('span');
        playerIcon.classList.add('player-icons');
        playerIcon.id = `player-${i + 1}`;
        spanNumber.classList.add('number-player');
        spanNumber.textContent = i + 1;
        playerIcon.append(spanNumber);
        playerGroup.append(playerIcon);
    }
}

function startGame() {
    const cQuantity = document.querySelector('.c-quantity');
    const gameScreen = document.getElementById('game-screen');
    const initialScreen = document.getElementById('initial-screen');
    if (window.getComputedStyle(cQuantity).display === 'none') {
        cQuantity.style.display = 'flex';
    } else {
        const selectedButton = optionButtons.find(b => b.getAttribute('selected') === 'true')
        if (!selectedButton)
            return alert('Selecione a quantidade de jogadores')
        initialScreen.style.display = 'none';
        let q = Number(selectedButton.textContent)
        loadPlayers(q);
        loadBoard(q, 21).then(
            t => {
                const container = document.querySelector('.board-container');
                container.scrollTo({
                    top: container.scrollHeight,
                    behavior: 'smooth'
                });
            }
        )
        gameScreen.classList.add('open');
        audios[0].pause();
        game(q);
    }
}