let startButton = document.getElementById('start-quiz')
let quizContainer = document.getElementById('card-container')
let currentQuestion = {
    elem: document.getElementById('card-question'),
    questionNum: 0
}
let answerContainer = document.getElementById('card-answers')
let submitButton = document.getElementById('submit')
let timeLeft = document.getElementById('time-left')
let nextQuestionButton = document.getElementById('next-question')
const questions = [
    {
        question: 'Which keyword defines a function?',
        answers: ['function', 'def', 'define', 'static void main'],
        correctAnswer: 'function'
    },
    {
        question: 'Which syntax correctly initiates a for loop?',
        answers: ['for (var i = 0: i < 10: i++){}',
            'for (i is 0; i < 10; i+){}',
            'for i in array.length:',
            'for (var i = 0; i < 10; i++){}'],
        correctAnswer: 'for (var i = 0; i < 10; i++){}'
    },
    {
        question: 'DOM stand for:',
        answers: ['Documents Oriented Modeling', 
        'Document Object Model', 
        'Document Object Manipulation', 
        'Documents Over Manuals'],
        correctAnswer: 'Document Object Model'
    },
    {
        question: '4',
        answers: [1, 2, 3, 4],
        correctAnswer: false
    },
    {
        question: '5',
        answers: [1, 2, 3, 4],
        correctAnswer: false
    }
]
let timer
let startTime = questions.length * 30
let points = 0
let ansArray


function startQuiz() {
    quizContainer.style.visibility = 'visible'
    startButton.style.visibility = 'hidden'
    updateQuestion()
}

function startTimer() {
    timeLeft.innerText = startTime
    timer = setInterval(function () {
        startTime--
        timeLeft.innerText = startTime
        if (startTime <= 0) {
            endQuiz()
            clearInterval(timer)
        }
    }, 1000)
}

function submitAnswer(e) {
    e.preventDefault()
    for (i in ansArray) {
        ansArray[i].removeEventListener('click', submitAnswer)
    }

    // Make sure the question is correct, if so, add points and changes answer red or green
    if (e.target.value === questions[currentQuestion.questionNum].correctAnswer) {
        points += 10
        console.log('Correct Answer')
        e.target.classList.add('correct')
        startTime -= 30
    } else {
        console.log('Wrong Answer')
        e.target.classList.add('wrong')
        startTime -= 30
    }
    currentQuestion.questionNum++

    // Stops the timer until the user presses next question button
    if (timer) {
        clearInterval(timer)
        timer = null
    }

    console.log('Answer has been submitted')
    nextQuestionButton.style.visibility = 'visible'
}


// Displays the question and generates the buttons for the answers
function updateQuestion() {
    answerContainer.innerHTML = ''
    ansArray = []
    if (currentQuestion.questionNum > (questions.length - 1)) {
        endQuiz()
    } else {
        startTimer()
        currentQuestion.elem.textContent = questions[currentQuestion.questionNum]['question']
        for (let i = 0; i < questions[currentQuestion.questionNum]['answers'].length; i++) {
            let ansButton = document.createElement('input')
            ansButton.setAttribute('type', 'button')
            ansButton.setAttribute('value', questions[currentQuestion.questionNum].answers[i])
            answerContainer.appendChild(ansButton)
            ansButton.addEventListener('click', submitAnswer)
            ansArray.push(ansButton)
        }

        console.log('The next question is displayed')
    }
    nextQuestionButton.style.visibility = 'hidden'
}

function endQuiz() {
    startTime = 0
    timeLeft.innerText = startTime
    console.log('Quiz has ended')
}

startButton.addEventListener('click', startQuiz)



nextQuestionButton.addEventListener('click', updateQuestion)