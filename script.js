const quizData = [
  {
    question: "Q:1 Which type of JavaScript language is ___",
    options: ["object", "Object-Based", "Berlin", "Madrid"],
    correct: "Object-Based",
  },
  {
    question: "Q:2  What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correct: "4",
  },
  {
    question: "Q:3 What is the capital of Spain?",
    options: ["Madrid", "Paris", "Rome", "Berlin"],
    correct: "Madrid",
  },
  {
    question: "Q:4 What is the capital of Germany?",
    options: ["Berlin", "Paris", "Rome", "Madrid"],
    correct: "Berlin",
  },
  {
    question: "Q:5 What is the capital of Italy?",
    options: ["Rome", "Paris", "Berlin", "Madrid"],
    correct: "Rome",
  },
  {
    question:
      "Q:6 Can be redeclare a variable that is declared with var keyword?",
    options: ["Yes", "No"],
    correct: "Yes",
  },
  {
    question:
      "Q:7 How many keywords are there in JavaScript to declare variables or constants",
    options: ["1", "2", "3", "4"],
    correct: "3",
  },
  {
    question: "Q:8 In JavaScript, single line comment begins with ___.",
    options: ["#", "/*", "$", "//"],
    correct: "//",
  },
  {
    question: "Q:9 avaScript ignores?",
    options: ["newlines", "tabs", "spaces", "All"],
    correct: "All",
  },
  {
    question: "Q:10   JavaScript is the programming language of the _____.",
    options: ["Desktop", "Mobile", "Web", "Server"],
    correct: "Web",
  },
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;

const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const questionNumberElement = document.getElementById("question-number");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");
const submitButton = document.getElementById("submit-btn");

function startQuiz() {
  loadQuestion();
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;
  timerElement.textContent = `Time: ${timeLeft}`;
  if (timeLeft === 0) {
    clearInterval(timer);
    showFeedback("Time's up!");
    disableOptions();
  }
}

function loadQuestion() {
  const currentQuizData = quizData[currentQuestion];
  questionElement.textContent = currentQuizData.question;
  questionNumberElement.textContent = `Question ${currentQuestion + 1} of ${
    quizData.length
  }`;
  optionsElement.innerHTML = "";

  currentQuizData.options.forEach((option) => {
    const button = document.createElement("button");
    button.classList.add(option);
    button.textContent = option;
    button.addEventListener("click", () => selectOption(button));
    optionsElement.appendChild(button);
  });
}

function selectOption(selectButton) {
  disableOptions();
  const correctAnswer = quizData[currentQuestion].correct;
  if (selectButton.textContent === correctAnswer) {
    score++;
    scoreElement.textContent = `score: ${score}`;
    showFeedback("Correct!");
  } else {
    showFeedback(`wrong! the correct answer is ${correctAnswer}`);
  }
}

function disableOptions() {
  document.querySelectorAll(".option").forEach((button) => {
    button.classList.add("disabled");
    button.disabled = true;
  });
}

function showFeedback(message) {
  feedbackElement.textContent = message;
}

submitButton.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
    feedbackElement.textContent = "";
    reSetTimer();
  } else {
    endQuiz();
  }
});

function reSetTimer() {
  clearInterval(timer);
  timeLeft = 30;
  timerElement.textContent = `Time: ${timeLeft}`;
  timer = setInterval(updateTimer, 1000);
}

function endQuiz() {
  clearInterval(timer);
  questionElement.textContent = "Quiz Over!";
  optionsElement.innerHTML = "";
  submitButton.style.display = "none";
}

startQuiz();
