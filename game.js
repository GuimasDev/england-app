const questionHTML = document.getElementById('question');
const choices = Array.from(document.querySelectorAll('button'));

const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let acceptingAnswers = false;


let currentQuestion;
let score = 0;
let questionCounter = 0;
let selectedQuestions = [];
let questions = loadAllQuestions();




//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    acceptingAnswers = true;

    selectedQuestions = mixOrder(questions, MAX_QUESTIONS);
    loadNewQuestion()
};


mixOrder = (array, count) => {
    let arrayReturn = [];
    for (let i = 0; arrayReturn.length < count; i++) {
        let aux;
        do {
            aux = array[Math.floor(Math.random() * array.length)];
        }while(arrayReturn.includes(aux))
        arrayReturn.push(aux);
    }

    console.log(array)
    console.log(arrayReturn)
    
    return arrayReturn;
}

saveHighScore = () => {
    let highScores = JSON.parse(localStorage.getItem('highScores') || "[]");
    
    let scoreObj = {
        score: score,
        num: highScores.length+1,
    };

    highScores.push(scoreObj);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    localStorage.setItem('mostRecentScore', score);
};

loadNewQuestion = () => {
    if (selectedQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
        saveHighScore();
        return window.location.assign('/england-app/end.html');
    }

    currentQuestion = selectedQuestions[questionCounter];

    progressText.innerText = `Question ${questionCounter + 1}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${((questionCounter + 1) / MAX_QUESTIONS)* 100}%`;
    questionHTML.innerHTML = selectedQuestions[questionCounter].question;

    choicesArray = currentQuestion.choices;

    let choicesMixed = mixOrder(choices, choices.length);
    for (let i = 0; i < choicesMixed.length; i++) {
        choicesMixed[i].innerHTML = choicesArray[i]

        choicesMixed[i].dataset['isCorrect'] = (i == currentQuestion.answer)
            ? true : false;

        // if (choices[i].dataset['isCorrect'] == 'true') {
        //     choices[i].classList.add('correct');
        // } else {
        //     choices[i].classList.add('incorrect');
        // }
    }

    acceptingAnswers = true;
    questionCounter++
}

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;

        const classToApply =
            (selectedChoice.dataset['isCorrect'] == 'true') ? 'correct' : 'incorrect';

            
        selectedChoice.classList.add(classToApply);
        
        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
            setTimeout(() => {
                selectedChoice.classList.remove(classToApply);
                loadNewQuestion();
            }, 1000);
        } else {
            let choiceTrue;
            choices.forEach((c)=>{
                if (c.dataset['isCorrect'] == 'true') {
                    c.classList.add('correct');
                    choiceTrue = c;
                }
            })
            setTimeout(() => {
                selectedChoice.classList.remove(classToApply);
                choiceTrue.classList.remove('correct');
                loadNewQuestion();
            }, 2000);
        }
    });
});


incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

startGame();


function loadAllQuestions(){
    let questions = [
        {
            "id": 1,
            "question": "Qual a moeda utilizada na Inglaterra?",
            "choices": [
                "Libra",
                "Euro",
                "Libra Esterlina",
                "Dólar"
            ],
            "answer": 2
        },
        {
            "id": 2,
            "question": "Qual o nome do(a) monarca e do primeiro ministro da Inglaterra, respectivamente?",
            "choices": [
                "Rainha Elizabeth e Boris Johnson",
                "Rei Charles e Boris Johnson",
                "Rainha Elizabeth e Winston Churchill",
                "Rei Charles e Rishi Sunak"
            ],
            "answer": 3
        },
        {
            "id": 3,
            "question": "Dentres as atividades econômicas descritas abaixo, quais delas correspondem às comumentes realizadas pela Inglaterra:",
            "choices": [
                "Turismo, Pesca e Agricultura",
                "Pesca, Extração de Petróleo e Tecnologia",
                "Turismo, Indústria e Tecnologia",
                "Agricultura, Extração de Petróleo e Pesca"
            ],
            "answer": 2
        },
        {
            "id": 4,
            "question": "Em relação aos estereótipos da Inglaterra, quais alternativas a seguir correspondem a um deles:",
            "choices": [
                "Os Ingleses são conhecidos por serem muito preguiçosos",
                "O clima da Inglaterra é conhecido por ser ensolarado durante grande parte do ano.",
                "Os ingleses têm uma má fama de sempre estarem atrasados, sendo muito pouco pontuais.",
                "Existe um estereótipo de que o chá é uma bebida muito consumida por todos os ingleses."
            ],
            "answer": 3
        },
        {
            "id": 5,
            "question": "Com a saída do Reino Unido da União Europeia, a obtenção do visto de trabalho começou a utilizar um sistema baseado em pontos para a avaliação do candidato. Qual a pontuação mínima para a obtenção do visto?",
            "choices": [
                "70 pontos",
                "80 pontos",
                "60 pontos",
                "90 pontos"
            ],
            "answer": 0
        },
        {
            "id": 6,
            "question": "Qual o nome do visto necessário para turismo na Inglaterra e quanto tempo ele permite no país?",
            "choices": [
                "Tourist Visa, 3 meses",
                "Visitor Visa, 3 meses",
                "Tourist Visa, 6 meses",
                "Standard Visitor, 6 meses"
            ],
            "answer": 3
        },
        {
            "id": 7,
            "question": "Qual é a dança tradicional Inglesa comumente realizada por homens, baseada, principalmente, na movimentação rítmica dos pés, com a realização de saltos vigorosos alternando as pernas?",
            "choices": [
                "Merris Dance",
                "QuickStep",
                "Guigue Walk",
                "Morris Dance"
            ],
            "answer": 3
        },
        {
            "id": 8,
            "question": "O País foi local de nascimento para um grande poeta, extremamente famoso, qual foi esse poeta?",
            "choices": [
                "Willian Shakespeare",
                "Hilda Hilst",
                "William Butler Yeats",
                "Charles Bukowski"
            ],
            "answer": 0
        },
        {
            "id": 9,
            "question": "Qual a idade que é obrigatória fazer a educação primária?",
            "choices": [
                "5-7",
                "5-11",
                "7-9",
                "9-11"
            ],
            "answer": 1
        },
        {
            "id": 10,
            "question": "Qual desses empregos há necessidade na Inglaterra:",
            "choices": [
                "Indústria",
                "Turismo",
                "Polícia",
                "Traficante de órgãos"
            ],
            "answer": 1
        },
        {
            "id": 11,
            "question": "Qual o grupo étnico tem maior presença na Inglaterra dentre todos os países europeus?",
            "choices": [
                "Indianos",
                "Pakistani",
                "Africanos",
                "Asiáticos"
            ],
            "answer": 3
        },
        {
            "id": 12,
            "question": "O preço do tour gastronômico 'Docks to Dining' varia:",
            "choices": [
                "de 30£ a 60£",
                "de 40£ a 60£",
                "de 60£ a 80£",
                "de 20£ a 80£"
            ],
            "answer": 1
        },
        {
            "id": 13,
            "question": "Qual a Torre está no território de Londres?",
            "choices": [
                "Big Bang",
                "Torre de Pizza",
                "Torre de Eiffel",
                "Torre do CR7"
            ],
            "answer": 0
        },
        {
            "id": 14,
            "question": "Qual é a capital da Inglaterra?",
            "choices": [
                "Londres",
                "Manchester",
                "Birmingham",
                "Liverpool"
            ],
            "answer": 0
        },
        {
            "id": 15,
            "question": "Qual é o famoso relógio localizado em Londres?",
            "choices": [
                "Big Ben",
                "Tower Bridge",
                "Buckingham Palace",
                "Westminster Abbey"
            ],
            "answer": 0
        },
        {
            "id": 16,
            "question": "Quem escreveu a famosa peça de teatro 'Romeu e Julieta'?",
            "choices": [
                "William Shakespeare",
                "Oscar Wilde",
                "Charles Dickens",
                "Jane Austen"
            ],
            "answer": 0
        },
        {
            "id": 17,
            "question": "Qual é o nome da residência oficial da monarquia britânica em Londres?",
            "choices": [
                "Buckingham Palace",
                "Windsor Castle",
                "Kensington Palace",
                "Hampton Court Palace"
            ],
            "answer": 0
        },
        {
            "id": 18,
            "question": "Qual é o nome do sistema de transporte subterrâneo de Londres?",
            "choices": [
                "Metrô",
                "Tube",
                "Underground",
                "Subway"
            ],
            "answer": 2
        },
        {
            "id": 19,
            "question": "Qual é o nome da universidade mais antiga da Inglaterra?",
            "choices": [
                "University of Oxford",
                "University of Cambridge",
                "University of London",
                "University of Manchester"
            ],
            "answer": 0
        },
        {
            "id": 20,
            "question": "Qual é o nome do famoso museu de arte localizado em Londres?",
            "choices": [
                "Museu Britânico",
                "Tate Modern",
                "National Gallery",
                "Victoria and Albert Museum"
            ],
            "answer": 3
        },
        {
            "id": 21,
            "question": "Qual é a famosa rocha pré-histórica localizada em Salisbury, Inglaterra?",
            "choices": [
                "Stonehenge",
                "Hadrian's Wall",
                "Tower of London",
                "White Cliffs of Dover"
            ],
            "answer": 0
        },
        {
            "id": 22,
            "question": "Qual é o sobrenome da família real britânica?",
            "choices": [
                "Windsor",
                "Tudor",
                "Stuart",
                "Plantageneta"
            ],
            "answer": 0
        },
        {
            "id": 23,
            "question": "Qual é o nome da rua de compras famosa em Londres?",
            "choices": [
                "Oxford Street",
                "Regent Street",
                "Carnaby Street",
                "Bond Street"
            ],
            "answer": 0
        },
        {
            "id": 24,
            "question": "Qual é o famoso castelo situado na margem sul do rio Tâmisa, em Londres?",
            "choices": [
                "Torre de Londres",
                "Castelo de Windsor",
                "Castelo de Edimburgo",
                "Palácio de Buckingham"
            ],
            "answer": 0
        },
        {
            "id": 25,
            "question": "Qual é o escritor inglês famoso por suas obras 'Oliver Twist' e 'Great Expectations'?",
            "choices": [
                "Charles Dickens",
                "William Shakespeare",
                "Jane Austen",
                "George Orwell"
            ],
            "answer": 0
        },
        {
            "id": 26,
            "question": "Qual é o nome do famoso parque real em Londres, que abriga o Palácio de Kensington?",
            "choices": [
                "Hyde Park",
                "Regent's Park",
                "St. James's Park",
                "Green Park"
            ],
            "answer": 0
        },
        {
            "id": 27,
            "question": "Qual é a cidade conhecida por ser o centro financeiro e comercial da Inglaterra?",
            "choices": [
                "Londres",
                "Manchester",
                "Birmingham",
                "Liverpool"
            ],
            "answer": 0
        },
        {
            "id": 28,
            "question": "Qual é o nome do icônico ônibus de dois andares vermelho de Londres?",
            "choices": [
                "Double Decker Bus",
                "Red Bus",
                "Big Bus",
                "London Bus"
            ],
            "answer": 0
        },
        {
            "id": 29,
            "question": "Qual é o nome do famoso festival de música ao ar livre realizado em Glastonbury, Inglaterra?",
            "choices": [
                "Glastonbury Festival",
                "Reading Festival",
                "Isle of Wight Festival",
                "Download Festival"
            ],
            "answer": 0
        },
        {
            "id": 30,
            "question": "Qual é o nome do famoso arquiteto britânico que projetou a Torre de Londres e a Catedral de São Paulo?",
            "choices": [
                "Christopher Wren",
                "John Nash",
                "Inigo Jones",
                "Norman Foster"
            ],
            "answer": 0
        },
        {
            "id": 31,
            "question": "Qual é o nome do rio mais longo da Inglaterra?",
            "choices": [
                "Rio Severn",
                "Rio Tâmisa",
                "Rio Mersey",
                "Rio Trent"
            ],
            "answer": 3
        },
        {
            "id": 32,
            "question": "Qual é o nome do famoso autor de 'As Aventuras de Alice no País das Maravilhas'?",
            "choices": [
                "Lewis Carroll",
                "J.R.R. Tolkien",
                "C.S. Lewis",
                "Roald Dahl"
            ],
            "answer": 0
        },
        {
            "id": 33,
            "question": "Qual é o nome da famosa catedral gótica em York, Inglaterra?",
            "choices": [
                "Catedral de York",
                "Catedral de Westminster",
                "Catedral de Canterbury",
                "Catedral de Durham"
            ],
            "answer": 0
        }
    ];

    return questions;
}