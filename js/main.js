document.addEventListener('DOMContentLoaded', () => {
    const audioHandler = () => {
        document.removeEventListener('click', audioHandler)
        audios[0].play()
    }
    document.addEventListener('click', audioHandler)
    document.querySelector('.options').addEventListener('click', (e) => {
        if (optionButtons.includes(e.target)) {
            optionButtons.forEach(b => {
                b.setAttribute('selected', (b === e.target).toString())
            })
        }
    })
    document.querySelector('.article-help button').addEventListener('click', (e) => {
        articleHelp.classList.remove('open')
        if (hasQuestion) {
            setTimeout(() => {
                questionCard.classList.add('appear')
                hasQuestion = false;
            }, 500)
        }
    })
    document.querySelector('.help').addEventListener('click', (e) => {
        if (questionCard.classList.contains('appear')) {
            questionCard.classList.remove('appear')
            hasQuestion = true;
        }
        setTimeout(() => articleHelp.classList.add('open'), 500)
    })
    document.querySelector('.start').addEventListener('click', startGame)
    form.addEventListener('submit', (e) => e.preventDefault());
    dice.append(diceImgs())
    spriteDice = document.querySelector('.sprite-dice');
})