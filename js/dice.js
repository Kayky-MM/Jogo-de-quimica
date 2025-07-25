function diceImgs() {
    const sprite = document.createElement('div');
    sprite.classList.add('sprite-dice');
    for (let i = 0; i < 7; i++) {
        const div = document.createElement('div');
        div.classList.add('dice-img');
        div.style.gridArea = (i === 6) ? 'dn' : `d${i + 1}`;
        const img = document.createElement('img');
        img.src = `dice/d${(i === 6) ? 1 : i + 1}.png`;
        div.append(img);
        sprite.append(div)
    }
    return sprite
}

function startRollAnimation() {
    spriteDice.style.top = '';
    spriteDice.style.left = '';
    spriteDice.style.animation = 'rollDice 1s linear infinite';
    isRolling = true;
}

function stopRollAnimation(finalNumber) {
    if (!isRolling) return;

    spriteDice.style.animation = 'none';

    const finalPosition = diceFacesPositions[finalNumber];

    if (finalPosition) {
        spriteDice.style.top = finalPosition.top;
        spriteDice.style.left = finalPosition.left;
        currentDiceValue = finalNumber;
    }
    isRolling = false;
}

function rollingDice(resolve) {
    if (isRolling)
        return;
    startRollAnimation();
    const randomNumber = random(1, 6);
    setTimeout(() => {
        stopRollAnimation(randomNumber);
        dice.removeEventListener('click', rollingDice)
        resolve(randomNumber);
    }, 2000);
}