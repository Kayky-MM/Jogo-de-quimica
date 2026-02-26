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

let availableQuestions;

async function loadQuestions(subjectForm){
    const formData = new FormData(subjectForm)
    const selection = formData.get('tema')
    if(!selection){
        return false
    }
    const data = await fetch(`../../data/questions/json/${selection}.json`)
    const datafile = await data.json()
    availableQuestions = datafile.map(q => new Question(q.sentence, q.answer, q.answerFormat))
    return true
}