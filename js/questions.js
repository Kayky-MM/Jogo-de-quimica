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
const questions = [
    new Question('1) Você dissolveu 40g de glicose (C6H12O6) em 400 ml de água. Qual é a concentração comum da solução em g/L?', '100 g/L', '99 g/L'),

    new Question('2) Em uma solução de água e etanol, qual substância é considerada o solvente?', 'Água', 'uma palavra'),

    new Question('3) Em uma solução com 2 mol de NaOH em 1 L de solução, qual é a concentração molar?', '2 mol/L', '99 mol/L'),

    new Question('4) Você dissolveu 5g de soluto em 250ml de solução. Qual é a concentração comum em g/L?', '20 g/L', '99 g/L'),

    new Question('5) Quando o soluto se dissolve completamente no solvente, formando uma mistura homogênea, que tipo de sistema é esse?', 'Solução', 'uma palavra'),

    new Question('6) Uma solução foi preparada com 0,5 mol de KNO3 em 250 ml de água. Qual é a concentração molar?', '2 mol/L', '99 mol/L'),

    new Question('7) O que acontece com a concentração de uma solução se evaporarmos parte da água?', 'Aumenta', 'uma palavra'),

    new Question('8) Qual é o nome do processo de separar o soluto do solvente por evaporação e condensação?', 'Destilação', 'uma palavra'),

    new Question('9) Na solução de vinagre (ácido acético em água), o ácido acético atua como soluto ou solvente?', 'Soluto', 'uma palavra'),

    new Question('10) Você dissolveu 25g de soluto em 500ml de solução. Qual é a concentração comum em g/L?', '50 g/L', '99 g/L'),

    new Question('11) Em uma solução aquosa de açúcar, qual é o papel da água?', 'Solvente', 'uma palavra'),


    new Question('12) Você tem uma solução com concentração de 10g/L. Se preparar 2L dessa solução, quantos gramas de soluto serão necessários?', '20 g', '99 g'),

    new Question('13) Como chamamos a substância que se dissolve em uma solução?', 'Soluto', 'uma palavra'),

    new Question('14) Você tem 3 mol de HCl em 1,5L de solução. Qual é a concentração molar?', '2 mol/L', '99 mol/L'),

    new Question('15) Em uma mistura de água com areia, o sistema formado é uma solução ou uma mistura heterogênea?', 'Mistura heterogênea', 'duas palavras'),

    new Question('16) Ao aumentar a quantidade de soluto e manter o volume constante, o que acontece com a concentração da solução?', 'Aumenta', 'uma palavra'),

    new Question('17) Quando uma solução não dissolve mais soluto significa dizer que ela está...?', 'Saturada', 'uma palavra'),

    new Question('18) Se uma solução contém 0,25 mol de soluto em 500ml, qual é sua concentração molar?', '0.5 mol/L', '9.9 mol/L'),

    new Question('19) Qual é o nome dado ao processo de preparar uma solução menos concentrada a partir de uma mais concentrada?', 'Diluição', 'uma palavra'),

    new Question('20) Você dissolveu 60g de soluto em 300ml de solução. Qual é a concentração comum em g/L?', '200 g/L', '99 g/L'),

    new Question('21) Em uma solução salina, o sal representa qual componente da mistura?', 'Soluto', 'uma palavra'),

    new Question('22) Como chamamos a substância presente em maior quantidade em uma solução?', 'Solvente', 'uma palavra'),


    new Question('23) Você preparou uma solução com 1 mol de NaCl em 250ml. Qual é a concentração molar?', '4 mol/L', '99 mol/L'),

    new Question('24) Qual é a unidade usada para expressar concentração comum?', 'g/L', 'unidade de concentração comum'),

    new Question('25) Você tem uma solução com 5mol/L. Se quiser prepará-la com 1L de água, quantos mols de soluto deve usar?', '5 mol', '99 mol'),

    new Question('26) Em uma solução de 100ml contendo 10g de soluto, qual é a concentração comum em g/L?', '100 g/L', '99 g/L'),

    new Question('27) Qual é o nome do processo no qual o soluto se espalha uniformemente no solvente?', 'Dissolução', 'uma palavra'),

    new Question('28) Se a concentração de uma solução é 0,1mol/L e seu volume é 2L, quantos mols de soluto há?', '0.2 mol', '9.9 mol'),

    new Question('29) Qual o outro nome que damos para a solução verdadeira?', 'Mistura homogênea', 'duas palavras'),

    new Question('30) Você dissolveu 15g de KCl em 300ml de solução. Qual é a concentração comum em g/L?', '50 g/L', '99 g/L'),

    new Question('31) Em uma solução de vinagre e água, qual é o soluto?', 'vinagre', 'uma palavra'),

    new Question('32) Qual é a concentração molar de uma solução com 0,8 mol de soluto em 400ml de solução?', '2 mol/L', '99 mol/L'),

    new Question('33) Quando duas substâncias se misturam formando uma única fase visível, temos uma...', 'Solução', 'uma palavra'),

    new Question('34) Se uma solução contém 60g de soluto em 2L de solução, qual é a concentração comum?', '30 g/L', '99 g/L'),

    new Question('35) Qual é o nome do processo usado para separar sólidos dissolvidos em líquidos por evaporação?', 'Evaporação', 'uma palavra'),

    new Question('36) Você quer preparar 1L de uma solução 0,25mol/L de NaCl. Quantos mols de NaCl são necessários?', '0.25 mol', '9.9 mol'),

    new Question('37) Em uma solução de água com álcool, o álcool é o...', 'Soluto', 'uma palavra'),

    new Question('38) O que acontece com a concentração se aumentarmos o volume do solvente sem adicionar mais soluto?', 'Diminui', 'uma palavra'),

    new Question('39) Qual é o nome do processo em que adicionamos mais solvente a uma solução para reduzir sua concentração?', 'Diluição', 'uma palavra'),

    new Question('40) Você dissolveu 80g de soluto em 2L de solução. Qual é a concentração comum em g/L?', '40 g/L', '99 g/L'),

    new Question('41) Uma solução foi preparada com 0,6 mol de HNO3 em 300 ml de água. Qual é a concentração molar?', '2 mol/L', '99 mol/L'),

    new Question('42) Em uma solução de água com gás carbônico (CO2), qual é o soluto?', 'Gás carbônico', 'duas palavras'),

    new Question('43) Qual é o nome da técnica usada para separar os componentes de uma mistura por diferença no ponto de ebulição?', 'Destilação', 'uma palavra'),

    new Question('44) Você adicionou 5g de sal em 100 ml de água. Qual é a concentração comum em g/L?', '50 g/L', '99 g/L'),

    new Question('45) Uma solução contém 1,5 mol de NaOH em 750 ml. Qual é a concentração molar?', '2 mol/L', '99 mol/L'),

    new Question('46) Em uma solução açucarada, o açúcar representa qual componente?', 'Soluto', 'uma palavra'),

    new Question('47) Quando uma mistura tem duas ou mais fases visíveis, ela é chamada de...', 'Mistura heterogênea', 'duas palavras'),

    new Question('48) Qual é o nome da substância que dissolve outra em uma solução?', 'Solvente', 'uma palavra'),

    new Question('49) Você deseja preparar 500 ml de uma solução 1 mol/L. Quantos mols de soluto são necessários?', '0.5 mol', '9.9 mol'),

    new Question('50) Você dissolveu 12g de soluto em 400 ml de solução. Qual é a concentração comum em g/L?', '30 g/L', '99 g/L'),

    new Question('51) Uma solução foi preparada com 2 mol de HCl em 500 ml de solução. Qual é a concentração molar?', '4 mol/L', '99 mol/L'),

    new Question('52) Em uma solução de água e iodo (I2), o iodo atua como?', 'Soluto', 'uma palavra'),

    new Question('53) Qual o nome da transformação onde o soluto passa a estar disperso de forma homogênea no solvente?', 'Dissolução', 'uma palavra'),

    new Question('54) Se temos 100 ml de solução com 25g de soluto, qual é a concentração comum em g/L?', '250 g/L', '99 g/L'),

    new Question('55) Você quer preparar 1L de solução 0,75 mol/L. Quantos mols de soluto são necessários?', '0.75 mol', '99 mol'),

    new Question('56) Qual é o componente da solução presente em menor quantidade?', 'Soluto', 'uma palavra'),

    new Question('57) Se a concentração molar é 0,2 mol/L e o volume é 2L, qual é a quantidade de mols de soluto?', '0.4 mol', '9.9 mol'),

    new Question('58) Você tem 90g de soluto dissolvidos em 3L de solução. Qual é a concentração comum em g/L?', '30 g/L', '99 g/L'),

    new Question('59) Em uma solução de água com gás oxigênio (O2), qual é o solvente?', 'Água', 'uma palavra')

]

const availableQuestions = [...questions]