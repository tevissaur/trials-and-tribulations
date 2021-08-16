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
        question: 'What is my name?',
        answers: ['Tevis', 'Reilly', 'Monika', 'Mikulova'],
        isCorrect: false
    },
    {
        question: '2',
        answers: [5, 6, 7, 8],
        isCorrect: false
    },
    {
        question: '3',
        answers: [1, 2, 3, 4],
        isCorrect: false
    },
    {
        question: '4',
        answers: [1, 2, 3, 4],
        isCorrect: false
    },
    {
        question: '5',
        answers: [1, 2, 3, 4],
        isCorrect: false
    }
]
let timer
let startTime = questions.length * 30 + 30
let points = 0



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
    if (timer) {
        clearInterval(timer)
        timer = null
    }
    console.log('Answer has been submitted')
    nextQuestionButton.style.visibility = 'visible'
}

function updateQuestion() {
    // Make sure the question is correct, if so, add points
    if (true) {
        points += 10
    }
    if (currentQuestion.questionNum >= questions.length) {
        endQuiz()
    } else {
        startTimer()
        currentQuestion.elem.textContent = questions[currentQuestion.questionNum]['question']
        for (let i = 0; i < questions[currentQuestion.questionNum]['answers'].length; i++) {
            let ansButton = document.createElement('input')
            ansButton.setAttribute('type', 'button')
            ansButton.setAttribute('value', questions[currentQuestion.questionNum].answers[i])
            answerContainer.prepend(ansButton)
        }
        currentQuestion.questionNum++
        startTime -= 30
        console.log('The next question is displayed')
    }
    nextQuestionButton.style.visibility = 'hidden'
}

function endQuiz() {
    startTime = 0
    timeLeft.innerText = startTime
    submitButton.style.visibility = 'hidden'
    console.log('Quiz has ended')
}

startButton.addEventListener('click', startQuiz)

submitButton.addEventListener('click', submitAnswer)

nextQuestionButton.addEventListener('click', updateQuestion)