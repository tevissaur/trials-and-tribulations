/*  // TODO: Ask if user wants to save their score and initials to leaderboard, save to localStorage
       TODO: create button to reveal the leader board in separate HTML element...OVERLAY???
*/



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
        correctAnswer: 'function',
        points: 5
    },
    {
        question: 'Which syntax correctly initiates a for loop?',
        answers: ['for (var i = 0: i < 10: i++){}',
            'for (i is 0; i < 10; i+){}',
            'for i in array.length:',
            'for (var i = 0; i < 10; i++){}'],
        correctAnswer: 'for (var i = 0; i < 10; i++){}',
        points: 10
    },
    {
        question: 'DOM stands for:',
        answers: ['Documents Oriented Modeling', 
        'Document Object Model', 
        'Document Object Manipulation', 
        'Documents Over Manuals'],
        correctAnswer: 'Document Object Model',
        points: 5
    },
    {
        question: 'Which JavaScript library allows you to "Write less, and do more"?',
        answers: ['AJAX', 'jQuery', 'React', 'Angular.js'],
        correctAnswer: 'jQuery',
        points: 10
    },
    {
        question: 'How many miles of mycelium are there per square foot in a forest floor?',
        answers: ['300', '10', '3.14', '42'],
        correctAnswer: '300',
        points: 1000
    },
    {
        question: 'What building is the tallest building the world?',
        answers: ['Empire State Building', 'Freedom Tower (formerly World Trade Center)', 'Burj Khalifa', 'Sears Tower'],
        correctAnswer: 'Burj Khalifa',
        points: 50
    },
    {
        question: 'Which word is legal in the game of Scrabble?',
        answers: ['QI', 'TE', 'UY', 'OL'],
        correctAnswer: 'QI',
        points: 100
    },
    {
        question: 'Which HTML tag defines an unordered list?',
        answers: ['<ol>', '<list>', '<ul>', '<li>'],
        correctAnswer: '<ul>',
        points: 30
    },
    {
        question: 'What is the name of the geographical region',
        answers: ['300', '10', '3.14', '42'],
        correctAnswer: '300',
        points: 1000
    }

]
let timer
let startTime = questions.length * 30
let score = 0
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

// Pauses timer, and checks if question is correct
function submitAnswer(e) {
    e.preventDefault()
    // Removes eventListeners so the user can't click the buttons
    for (i in ansArray) {
        ansArray[i].removeEventListener('click', submitAnswer)
    }

    // Make sure the question is correct, if so, add points and changes answer red or green
    if (e.target.value === questions[currentQuestion.questionNum].correctAnswer) {
        score += questions[currentQuestion.questionNum].points
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
    // Checks if user answered all questions or if time is up
    if (currentQuestion.questionNum > (questions.length - 1)) {
        endQuiz()
    } else if (startTime <= 0) {
        endQuiz()
    } else {
        startTimer()
        currentQuestion.elem.textContent = questions[currentQuestion.questionNum]['question']
        for (i in questions[currentQuestion.questionNum]['answers']) {
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
    currentQuestion.elem.innerText = 'Congrats! You completed the quiz.'
    answerContainer.innerHTML = score
    console.log('Quiz has ended')
}

startButton.addEventListener('click', startQuiz)



nextQuestionButton.addEventListener('click', updateQuestion)