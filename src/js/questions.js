class Question {
    #sentence;
    #answer;
    #answered;
    #answerFormat;

    constructor(sentence, answer, answerFormat) {
        this.#sentence = sentence;
        this.#answer = answer.toLowerCase().replace('.', ',');
        this.#answerFormat = answerFormat;
        this.#answered = false;
    }
    get sentence() {
        return this.#sentence;
    }
    get answerFormat() {
        return this.#answerFormat;
    }
    get answered() {
        return this.#answered
    }
    get answer(){
        return this.#answer
    }
    correctAnswer() {
        this.#answered = true;
    }
    isCorrect(ans) {
        ans = ans.trim().replaceAll(/\s+/g, ' ').replaceAll('.', ',');
        let correct = this.#answer == ans.toLowerCase();
        if (correct) {
            this.#answered = true;
        }
        return correct;
    }
}

const loadingOverlay = document.getElementById('loading-overlay');
let availableQuestions;

async function loadQuestions(subjectForm, subjectSelection){
    const formData = new FormData(subjectForm)
    const selection = formData.get('tema')
    if(!selection){
        return false
    }
    subjectSelection.style.display = 'none'
    loadingOverlay.style.display = 'flex'
    try {
        subjectForm.setAttribute('data-is-fetching', 'true')
        const data = await fetch(`./data/questions/json/${selection}.json`)
        await new Promise(resolve => setTimeout(resolve, 1000))
        const datafile = await data.json()
        availableQuestions = datafile.map(q => new Question(q.sentence, q.answer, q.answerFormat))
        loadingOverlay.style.display = 'none';
        subjectForm.setAttribute('data-is-fetching', 'false')
        return true
    } catch (error) {
        subjectForm.setAttribute('data-is-fetching', 'false')
        loadingOverlay.style.display = 'none';
        subjectSelection.style.display = 'flex'
        console.error('Não foi possível fetch', selection,'json', error)
        return false
    }
}