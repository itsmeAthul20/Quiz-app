const startBtn = document.getElementById("startbtn");
const startContainer = document.getElementById("start-container");
const quizContainer = document.getElementById("quiz-container");
const endContainer = document.getElementById("end-container");
const summaryContainer = document.getElementById("summary-container");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("time");
const nextBtn = document.getElementById("nextbtn");
const summaryEl = document.getElementById("summary");
const viewSummaryBtn = document.getElementById("view-summary-btn");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restartbtn");

let currentQuestionIndex = 0;
let timeLeft = 30;
let timer;
let userAnswers = [];
let score = 0;

const questions = [
    {
        question: "What keyword is used to declare a variable in JavaScript?",
        options: ["All of the above", "let", "var", "const"],
        correct: 0
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["/*", "#", "//", "--"],
        correct: 2
    },
    {
        question: "What is the correct syntax to create a function in JavaScript?",
        options: ["create function myFunction()", "func myFunction()", "function:myFunction()", "function myFunction()"],
        correct: 3
    },
    {
        question: "How do you write an 'if' statement in JavaScript?",
        options: ["if condition {}", "if {} else {}", "if (condition) then {}", "if (condition) {}"],
        correct: 3
    },
    {
        question: "Which of the following is used to output data to the console in JavaScript?",
        options: ["alert()", "document.write()", "console.log()", "print()"],
        correct: 2
    },
    {
        question: "What does 'NaN' stand for in JavaScript?",
        options: ["Name a Number", "None of the above", "Not a Number", "New a Number"],
        correct: 2
    },
    {
        question: "How do you declare a constant variable in JavaScript?",
        options: ["var variableName", "let variableName", "constant variableName", "const variableName"],
        correct: 3
    },
    {
        question: "What is the result of 5 + '5' in JavaScript?",
        options: ["5", "10", "55", "Error"],
        correct: 2
    },
    {
        question: "Which method is used to convert a string to an integer in JavaScript?",
        options: ["parse()", "convertToInt()", "toInteger()", "parseInt()"],
        correct: 3
    },
    {
        question: "How do you create an array in JavaScript?",
        options: ["let arr = new Array()", "Both of the above", "let arr = []", "None of the above"],
        correct: 1
    },
];


startBtn.addEventListener("click", startQuiz);
function startQuiz() {
    startContainer.style.display = "none";
    quizContainer.style.display = "block";
    showQuestion();
    startTimer();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionEl.textContent = question.question;
    optionsEl.innerHTML = "";
    nextBtn.disabled = true;
    question.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.textContent = option;
        li.addEventListener("click", () => selectOption(index, li));
        optionsEl.appendChild(li);
    });
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up!");
            selectOption(-1);
        }
    }, 1000);
}

function selectOption(index, li) {
    const previouslySelected = optionsEl.querySelector('.selected');
    if (previouslySelected) {
        previouslySelected.classList.remove('selected');
    }
    li.classList.add('selected');
    userAnswers[currentQuestionIndex] = index;
    nextBtn.disabled = false;
}




nextBtn.addEventListener("click", moveToNextQuestion);
function moveToNextQuestion() {
    const selectedOption = userAnswers[currentQuestionIndex];
    if (selectedOption === questions[currentQuestionIndex].correct) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        timeLeft = 30;
        showQuestion();
        resetTimer();
    } else {
        clearInterval(timer);
        quizContainer.style.display = "none";
        showEndScreen();
    }
}

function showEndScreen() {
    endContainer.style.display = "block";
    scoreEl.textContent = `${score} / ${questions.length}`;
}

viewSummaryBtn.addEventListener("click", showSummary);
function showSummary() {
    endContainer.style.display = "none";
    summaryContainer.style.display = "block";
    summaryEl.innerHTML = "";
    questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const correctAnswer = question.correct;

        const div = document.createElement("div");
        div.innerHTML = `<p>Question: ${question.question}</p>
                         <p>Your answer: ${userAnswer >= 0 ? question.options[userAnswer] : "No answer selected"}</p>
                         <p>Correct answer: ${question.options[correctAnswer]}</p><hr>`;
        summaryEl.appendChild(div);
    });
}



restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    timeLeft = 30;
    score = 0;
    userAnswers = [];
    summaryContainer.style.display = "none";
    startContainer.style.display = "block";
});
