// Declaring Variables
let startButton = document.getElementById('start-quiz')
let quizContainer = document.getElementById('card-container')
let currentQuestion = {
    elem: document.getElementById('card-question'),
    questionNum: 0
}
let pointsLabel = document.getElementById('worth')
let worthPoints = document.getElementById('points')
let answerContainer = document.getElementById('card-answers')
let submitButton = document.getElementById('submit')
let timeLeft = document.getElementById('time-left')
let result = document.getElementById('question-result')
let nextQuestionButton = document.getElementById('next-question')
let leaderboard = document.getElementById('leaderboard')
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
            'for (i is 0; i < 10; i++){}',
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
        answers: ['Empire State Building',
            'Freedom Tower (formerly World Trade Center)',
            'Burj Khalifa',
            'Sears Tower'],
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
        question: 'What is the name of the geographical region where civilization is theorized to have started?',
        answers: ['Fertile Valley', 'Fertile Crescent', 'The Dawnland', 'Serengetti'],
        correctAnswer: 'Fertile Crescent',
        points: 1000
    }

]
let timer, startTime, score, ansArray,saveButton



// Sets the user array to an empty string if there are no keys in localStorage
let userArray = JSON.parse(localStorage.getItem('users')) || []
let scoreArray = JSON.parse(localStorage.getItem('scores')) || []

// Creates a prototype property for arrays
// Shuffles the array
// Got this from Stack overflow at https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
// Fisher-Yates Shuffle
Object.defineProperty(Array.prototype, 'shuffle', {
    value: function () {
        for (let i = this.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this[i], this[j]] = [this[j], this[i]];
        }
        return this;
    }
});


// Starts the quiz, and shuffles answers and questions
function startQuiz() {
    
    startTime = questions.length * 30
    score = 0
    currentQuestion.questionNum = 0
    quizContainer.style.visibility = 'visible'
    startButton.style.visibility = 'hidden'
    pointsLabel.style.visibility = 'visible'
    questions.shuffle()
    for (i in questions) {
        questions[i].answers.shuffle()
    }
    updateQuestion()
}

function startTimer() {
    timeLeft.innerText = startTime
    timer = setInterval(function () {
        startTime--
        timeLeft.innerText = startTime
        if (startTime <= 0) {
            endQuiz('timeout')
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
    // Subtract 30 seconds for wrong answer and 10 seconds for correct one
    if (e.target.value === questions[currentQuestion.questionNum].correctAnswer) {
        score += questions[currentQuestion.questionNum].points
        result.innerText = 'Correct! Currently your score is ' + score
        quizContainer.classList.add('correct')
        console.log('Correct Answer')
        e.target.classList.add('correct')
        startTime -= 10
    } else {
        result.innerText = 'Incorrect answer, currently your score is ' + score
        console.log('Wrong Answer')
        quizContainer.classList.add('wrong')
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
    result.innerText
    quizContainer.classList.remove('wrong') || quizContainer.classList.remove('correct')
    answerContainer.innerHTML = ''
    ansArray = []
    // Checks if user answered all questions or if time is up
    if (currentQuestion.questionNum > (questions.length - 1)) {
        endQuiz('completed')
    } else if (startTime <= 0) {
        endQuiz('timeout')
    } else {
        startTimer()
        currentQuestion.elem.textContent = questions[currentQuestion.questionNum]['question']
        worthPoints.innerText = questions[currentQuestion.questionNum].points

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


// Ends the quiz and checks if time ran out or if user finished all questions
function endQuiz(endStatus) {
    startTime = 0
    timeLeft.innerText = startTime
    saveButton = document.createElement('button')
    saveButton.innerText = 'Save score?'
    saveButton.setAttribute('type', 'submit')
    saveButton.addEventListener('click', saveResults)
    answerContainer.appendChild(saveButton)
    startButton.style.visibility = 'visible'
    pointsLabel.style.visibility = 'hidden'
    result.innerText = 'You scored ' + score + ' points!'
    console.log('Quiz has ended')
    if (endStatus === 'timeout') {
        currentQuestion.elem.innerText = 'Time is up, study up a bit and retake the quiz!'
    } else {
        currentQuestion.elem.innerText = 'Congrats! You completed the quiz.'
    }
}

// Saves the results in localStorage
function saveResults(e) {
    e.preventDefault()
    e.target.removeEventListener('click', saveResults)
    let initials = prompt('What are your initials?')
    userArray.push(initials)
    scoreArray.push(score)
    localStorage.setItem('users', JSON.stringify(userArray))
    localStorage.setItem('scores', JSON.stringify(scoreArray))
    console.log('Results saved')
    saveButton.style.visibility = 'hidden'
    window.location.reload(true)
}

// Displays the leaderboard
function displayLeaderboard() {
    leaderboard.innerHTML = '<tr><th> Initials </th> <th> Score </th></tr> '
    for (i in userArray) {
        let tr = document.createElement('tr')
        let tdInitials = document.createElement('td')
        let tdScore = document.createElement('td')
        tdInitials.innerText = userArray[i]
        tdScore.innerText = scoreArray[i]

        tr.appendChild(tdInitials)
        tr.appendChild(tdScore)
        leaderboard.appendChild(tr)
    }

}




startButton.addEventListener('click', startQuiz)
nextQuestionButton.addEventListener('click', updateQuestion)
displayLeaderboard()