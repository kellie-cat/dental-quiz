// Quiz Q and As

var quizData = [
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
function startQuiz() {
  console.log('Start quiz?');
}

startQuiz();