// Quiz Q and As

const quizData = [
  {
    question: "What is the hardest layer of tooth?",
    answerOne: "Enamel",
    answerTwo: "Pulp",
    answerThree: "Dentine",
    correct: "answer-one",
  },
  {
    question: "Which one of these foods will cause tooth decay?",
    answerOne: "Salt",
    answerTwo: "Sugar",
    answerThree: "Protein",
    correct: "answer-two",
  },
  {
    question: "Which one of these is bad for teeth?",
    answerOne: "Sparkling water",
    answerTwo: "Cheese",
    answerThree: "Sweet chilli flavoured crisps",
    correct: "answer-three",
  },
];

//Collect all the elements
const question = document.getElementById("question");
const answerOne = document.getElementById("answer-one");
const answerTwo = document.getElementById("answer-two");
const answerThree = document.getElementById("answer-three");
const submitButton = document.getElementById("submit-button");
const allAnswer = document.querySelectorAll(".answer");

//Define the quiz logic
let score = 0;
let i = 0;

//Get the User Answer
function getUserAnswer() {
  let ans = undefined;

  allAnswer.forEach((el) => {
    if (el.checked) {
      ans = el.id;
    }
  });
  return ans;
}

//Disselect all answers
function deselectans() {
  allAnswer.forEach((el) => {
    el.checked = false;
  });
}

//Get the quiz data
function getQuiz() {
  deselectans();
  question.textContent = quizData[i].question;
  answerOne.textContent = quizData[i].answerOne;
  answerTwo.innerText = quizData[i].answerTwo;
  answerThree.innerText = quizData[i].answerThree;
}

//Move onto the next question
function moveOn() {
  submitButton.addEventListener('click', () => {
    let ans = getUserAnswer();
    if (ans) {
      if (ans == quizData[i].correct) {
        score++;
      }
    }
    i++;
    if (i < quizData.length) {
      getQuiz();
    } else {
      alert('score :' + score);
      location.reload();
    }
  });
}

getQuiz();
moveOn();
