const questions = [
    {
        category: "JavaScript",
        question: "What is the output of 'typeof null' in JavaScript?",
        options: ["object", "null", "undefined", "number"],
        correct: "object"
    },

];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let timerInterval;
let timeRemaining = 30;
let filteredQuestions = questions;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("cancelQuiz").addEventListener("click", cancelQuiz);
    document.getElementById("submitAnswer").addEventListener("click", submitAnswer);
    document.getElementById("restartQuiz").addEventListener("click", restartQuiz);
    document.getElementById("filterHTML").addEventListener("click", () => filterQuestions("HTML"));
    document.getElementById("filterCSS").addEventListener("click", () => filterQuestions("CSS"));
    document.getElementById("filterJavaScript").addEventListener("click", () => filterQuestions("JavaScript"));
    displayQuestion();
    startTimer();
});

function startTimer() {
    clearInterval(timerInterval);
    timeRemaining = 30;
    document.getElementById("timer").textContent = `00:${timeRemaining}`;
    timerInterval = setInterval(() => {
        timeRemaining--;
        document.getElementById("timer").textContent = `00:${timeRemaining < 10 ? '0' : ''}${timeRemaining}`;
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            submitAnswer();
        }
    }, 1000);
}

function displayQuestion() {
    const questionObj = filteredQuestions[currentQuestionIndex];
    document.getElementById("questionTitle").textContent = questionObj.question;
    const optionsList = document.getElementById("optionsList");
    optionsList.innerHTML = "";
    questionObj.options.forEach(option => {
        const li = document.createElement("li");
        li.textContent = option;
        li.addEventListener("click", () => {
            document.querySelectorAll("#optionsList li").forEach(li => li.classList.remove("selected"));
            li.classList.add("selected");
        });
        optionsList.appendChild(li);
    });
    updateQuestionList();
}

function submitAnswer() {
    const selectedOption = document.querySelector("#optionsList .selected");
    if (selectedOption) {
        const answer = selectedOption.textContent;
        if (answer === filteredQuestions[currentQuestionIndex].correct) {
            correctAnswers++;
            document.getElementById("questionList").children[currentQuestionIndex].classList.add("correct");
        } else {
            document.getElementById("questionList").children[currentQuestionIndex].classList.add("incorrect");
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < filteredQuestions.length) {
            displayQuestion();
            startTimer();
        } else {
            displayResult();
        }
    } else {
        alert("Please select an option before submitting.");
    }
}

function displayResult() {
    clearInterval(timerInterval);
    document.getElementById("quizContainer").style.display = "none";
    document.getElementById("resultCard").style.display = "block";
    document.getElementById("resultText").textContent = `You answered ${correctAnswers} out of ${filteredQuestions.length} questions correctly.`;
}

function cancelQuiz() {
    clearInterval(timerInterval);
    document.getElementById("quizContainer").style.display = "none";
    document.getElementById("resultCard").style.display = "block";
    document.getElementById("resultText").textContent = "Quiz cancelled.";
}

function restartQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    document.getElementById("resultCard").style.display = "none";
    document.getElementById("quizContainer").style.display = "flex";
    displayQuestion();
    startTimer();
}

function filterQuestions(category) {
    filteredQuestions = questions.filter(q => q.category === category);
    restartQuiz();
}

function updateQuestionList() {
    const questionList = document.getElementById("questionList");
    questionList.innerHTML = "";
    filteredQuestions.forEach((question, index) => {
        const li = document.createElement("li");
        li.textContent = `Quiz question ${index + 1}`;
        questionList.appendChild(li);
    });
}
