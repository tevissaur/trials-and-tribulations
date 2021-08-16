let startButton = document.getElementById('start-quiz')
let quizContainer = document.getElementById('card-container')
let currentQuestion = document.getElementById('card-question')
let submitButton = document.getElementById('submit')
let timeLeft = document.getElementById('time-left')
let nextQuestionButton = document.getElementById('next-question')
const questions = [
    {
        question: 'What is my name?',
        answers: [1, 2, 3, 4],
        isCorrect: false
    },
    {
        question: 'What is my name?',
        answers: [1, 2, 3, 4],
        isCorrect: false
    },
    {
        question: 'What is my name?',
        answers: [1, 2, 3, 4],
        isCorrect: false
    },
    {
        question: 'What is my name?',
        answers: [1, 2, 3, 4],
        isCorrect: false
    },
    {
        question: 'What is my name?',
        answers: [1, 2, 3, 4],
        isCorrect: false
    }
]



function startQuiz() {
    quizContainer.style.visibility = 'visible'
    currentQuestion.textContent =  questions[0]['question']
    let startTime = 5
    timeLeft.innerText = startTime
    let x = setInterval(function(){
        startTime--
        timeLeft.innerText = startTime
        if (startTime === 0) {
            endQuiz()
            clearInterval(x)
        }
    }, 1000)
}

function submitAnswer(e) {
    e.preventDefault()
    console.log('Answer has been submitted')
}

function nextQuestion(e) {
    e.preventDefault()
    console.log('The next question is displayed')
}

function endQuiz() {
    console.log('Quiz has ended')
}

startButton.addEventListener('click', startQuiz)

submitButton.addEventListener('click', submitAnswer)

nextQuestionButton.addEventListener('click', nextQuestion)