/*Criando constantes seletores para todos os itens*/
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

/*Perguntas*/
let questions = [{
        question: 'A terra Gira ao redor do Sol?',
        choice1: 'Sim',
        choice2: 'Rotaciona no sentido anti-horário',
        choice3: 'Rotaciona no mesmo eixo',
        choice4: 'Ela gira com a força do vento',
        answer: 1,
    },
    {
        question: 'A maior parte das aranhas possuem oito olhos, ou seja?',
        choice1: 'Elas são cegas',
        choice2: 'Enxergam vários pontos de vista',
        choice3: 'Possuem quatro pares de olhos',
        choice4: 'O homem aranha não é uma aranha',
        answer: 3,
    },
    {
        question: 'Quantos braços tem um polvo?',
        choice1: 'Uma lula tem 8 tentaculos',
        choice2: 'Nenhum',
        choice3: 'Tem oito braços',
        choice4: 'Tem sete tentaculos',
        answer: 2,
    },
    {
        question: 'Qual o significado das setas do símbolo da reciclagem?',
        choice1: 'O ciclo do lixo',
        choice2: 'O lixo sempre volta',
        choice3: 'Fabricação, utilização e reutilização',
        choice4: 'Reutilização,fabricação e utilização',
        answer: 3,
    },
    {
        question: 'Qual a quantidade de letras tem na palavra FACEBOK?',
        choice1: 'F.A.C.E.B.O.O.K',
        choice2: '7',
        choice3: 'Não Existe FACEBOK',
        choice4: '8',
        answer: 4,
    },
    {
        question: 'Em uma corrida venceram os carros|3|2|1|, o 1 lugar é?',
        choice1: 'Os três venceram como foi mencionado ',
        choice2: 'O carro 3 já que esta em primeiro na ordem ',
        choice3: 'O carro 1 já que seu número é o um',
        choice4: 'O primeiro lugar é do vencedor',
        answer: 4,
    },
    {
        question: 'Qual das seguências de letra forma palavra?',
        choice1: 'O-L-B-A-S ',
        choice2: 'A-V-R-A-A-L-P',
        choice3: 'P-I-A-C-R-S-E-O',
        choice4: 'A-G-D-A-J-M-A',
        answer: 2,
    },
    {
        question: 'Qual das sequências é diferente?',
        choice1: 'KLMN',
        choice2: 'ABDE',
        choice3: 'FGIJ',
        choice4: 'RSUV',
        answer: 1,
    },
    {
        question: 'Qual lugar mais vivem cangurus do que pessoas?',
        choice1: 'EUA',
        choice2: 'Jamaica',
        choice3: 'África',
        choice4: 'Austrália',
        answer: 4,
    },
    {
        question: 'A velocidade do som esta entre 320m/s -- 361m/s ou seja?',
        choice1: '340 m/s é correto',
        choice2: '320 m/s é correto',
        choice3: '361 m/s é correto',
        choice4: '-',
        answer: 1,
    },
    {
        question: '"Amigo" está para "Inimigo" assim como "Alegria" está para:',
        choice1: 'Sonho',
        choice2: 'Risos',
        choice3: 'Alergia',
        choice4: 'Tristeza',
        answer: 4,
    },
    {
        question: 'Dentre os itens abaixo, qual aquele que pode ser considerado um intruso?',
        choice1: 'Hiena',
        choice2: 'Lobo',
        choice3: 'Vaca',
        choice4: 'Leão',
        answer: 3,
    },
    {
        question: 'Um médico receitou que João tomasse 3 pílulas, uma a cada meia hora. Em quanto tempo João tomou todas as pílulas?',
        choice1: 'Meia hora ',
        choice2: '1h 30m',
        choice3: '1h',
        choice4: '3h',
        answer: 3,
    },
    {
        question: 'Quando eu tinha 8 anos, a minha irmã tinha a metade da minha idade. Agora que tenho 54 anos, com quantos anos minha irmã está?',
        choice1: '50 anos',
        choice2: '58 anos',
        choice3: '27 anos',
        choice4: '8 anos',
        answer: 1,
    },
    {
        question: 'Se uma borboleta vive cinco dias e a cada dia ela voa quatro metros. Quantos metros ela terá percorrido em uma semana?',
        choice1: '28 metros',
        choice2: '20 metros',
        choice3: '4 metros',
        choice4: '10 metros',
        answer: 2,
    },
    {
        question: 'Se o amanhã de ontem era sexta-feira, que dia é o dia depois de amanhã de ontem?',
        choice1: 'Sexta-feira',
        choice2: 'Quinta-feira',
        choice3: 'Domingo',
        choice4: 'Sábado',
        answer: 4,
    },
    {
        question: 'Em uma corrida de carros, se você ultrapassa o segundo colocado , em qual colocação você fica após a ultrapassagem?',
        choice1: '2º lugar',
        choice2: '1º lugar',
        choice3: '3º lugar',
        choice4: 'último lugar',
        answer: 1,
    },
    {
        question: 'No táxi que Pedro entrou havia 8 passageiros. Três pessoas desceram e duas entraram. Quantas pessoas há no táxi?',
        choice1: '8 pessoas',
        choice2: '7 pessoas',
        choice3: '13 pessoas',
        choice4: '9 pessoas',
        answer: 4,
    },
    {
        question: 'Num aquário viviam sete peixes. Dois morreram afogados. Quantos ficaram?',
        choice1: '5 peixes',
        choice2: '7 peixes',
        choice3: '9 peixes',
        choice4: 'Nenhum peixe',
        answer: 2,
    },
]

/*Pontuação por acerto*/
const SCORE_POINTS = 100

/*Limite de questões*/
const MAX_QUESTIONS = 19

startGame = () => {
        questionCounter = 0
        score = 0
        availableQuestions = [...questions]
        getNewQuestion()
    }
    /*Funções para receber as perguntas e a barra de progresso*/
getNewQuestion = () => {
        if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
            localStorage.setItem('mostRecentScore', score)

            return window.location.assign('/end.html')
        }

        questionCounter++
        progressText.innerText = `Questão ${questionCounter} de ${MAX_QUESTIONS}`
        progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

        const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
        currentQuestion = availableQuestions[questionsIndex]
        question.innerText = currentQuestion.question

        choices.forEach(choice => {
            const number = choice.dataset['number']
            choice.innerText = currentQuestion['choice' + number]
        })

        availableQuestions.splice(questionsIndex, 1)

        acceptingAnswers = true

    }
    /*Procedimento para avaliar se esta correta ou errada*/
choices.forEach(choice => {
        choice.addEventListener('click', e => {
            if (!acceptingAnswers) return

            acceptingAnswers = false
            const selectedChoice = e.target
            const selectedAnswer = selectedChoice.dataset['number']

            let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
                'incorrect'

            if (classToApply === 'correct') {
                incrementScore(SCORE_POINTS)
            }

            selectedChoice.parentElement.classList.add(classToApply)

            /*Definindo o intervalo entre as perguntas*/
            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply)
                getNewQuestion()

            }, 1000)

        })

    })
    /*Adicionar valor da pontuação ao contador*/
incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()