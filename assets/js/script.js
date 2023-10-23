const questionText = document.getElementById("question-text");
const btnOneRef = document.getElementById('answer-one');
const btnTwoRef = document.getElementById('answer-two');
const btnThreeRef = document.getElementById('answer-three');

//Set the Q and As
const qandas = [
  {
    question: "What is the hardest layer of tooth?",
    options: ["Enamel", "Pulp", "Dentine"],
    correct: 0
  },
  {
    question: "Which one of these foods will cause tooth decay?",
    options: ["Salt", "Sugar", "Protein"],
    correct: 1
  },
  {
    question: "Which one of these is the worst for teeth?",
    options: ["Sparkling water", "Cheese", "Sweet chilli flavoured crisps"],
    correct: 2
  },
  {
    question: "Which one of these is safe for teeth?",
    options: ["Tap water", "Diluting juice / squash that says - No Added Sugar", "Pure orange juice"],
    correct: 0
  },
  {
    question: "What is the biggest help to prevent tooth decay?",
    options: ["Brushing teeth three times a day", "Changing toothpaste to a fluoride free variety", "Reducing sugar intake from 5 times a day to once or twice a week"],
    correct: 2
  },
  {
    question: "Which one of these minerals is amazing for teeth?",
    options: ["Phosphorous", "Fluoride", "Carbon"],
    correct: 1
  },
  {
    question: "What is the best way to get the most protection from fluoride toothpaste?",
    options: ["Spit it out but don't rinse", "Spit it out and rinse the mouth with water", "Only use it once a day"],
    correct: 0
  },
  {
    question: "How many times a day is usually a good amount to brush with fluoride toothpaste to prevent cavities?",
    options: ["Twice", "Once", "Five"],
    correct: 0
  },
  {
    question: "What is tooth decay?",
    options: ["A cavity / a hole / rotten tooth / dental caries", "A sensitive tooth / sore for a few seconds when drinking sweet or hot or cold", "Bleeding gums / gum disease / bone loss / periodontal disease"],
    correct: 0
  },
  {
    question: "What is the best treatment for bleeding gums?",
    options: ["Antibiotics", "Leaving them alone until they heal", "Gentle but thorough cleaning that removes all the plaque, regular professional cleaning if needed"],
    correct: 2
  },
];

document.addEventListener('DOMContentLoaded', function () {
  function welcomeAlert() {
    alert("Welcome to the Cavity Preventer Quiz! We hope you enjoy this game. To begin, close this window, then take your time before clicking the correct answer. Once you have answered correctly, click the Next button to move onto the next question");
  }
  welcomeAlert();
  /**
   * Loads the 1st question from qandas
   * */
  function firstQuestion() {
    questionText.innerHTML = qandas[0].question;
    btnOneRef.innerHTML = qandas[0].options[0];
    btnTwoRef.innerHTML = qandas[0].options[1];
    btnThreeRef.innerHTML = qandas[0].options[2];
  }

  firstQuestion();

  let buttons = document.getElementsByTagName('button');
  let currentQuestion = 0;

  for (button of buttons) {
    button.addEventListener('click', function () {
      if (this.getAttribute('data-type') === 'next' && currentQuestion <= 9) {
        nextQuestion();
      }
      switch (this.getAttribute('data-answer')) {
        case "0":
          checkAnswer(0);
          break;
        case "1":
          checkAnswer(1);
          break;
        case "2":
          checkAnswer(2);
          break;
        default:
          break;
      }
      if (this.getAttribute('data-type') === 'next' && currentQuestion > 9) {
        console.log("Reload game?");
        reloadGame();
      }
    });
  }

  function checkAnswer(selected) {
    const feedback = document.getElementById("feedback");
    if (selected === qandas[currentQuestion].correct) {
      feedback.innerHTML = "Correct!";
      incrementCorrectScore();
      currentQuestion += 1;
    } else {
      feedback.innerHTML = "Incorrect!";
      incrementIncorrectScore();
      showIncorrectAlert();
    }
  }

  /** Gets the previous correct score from the DOM, increments it
   * by one and displays the new score
   */
  function incrementCorrectScore() {
    let previousScore = parseInt(document.getElementById("correct-score").innerText);
    document.getElementById("correct-score").innerText = ++previousScore;
  }

  /** Gets the previous incorrect score from the DOM, increments it
   * by one and displays the new score
   */
  function incrementIncorrectScore() {
    let previousIncorrectScore = parseInt(document.getElementById("incorrect-score").innerText);
    document.getElementById("incorrect-score").innerText = ++previousIncorrectScore;
  }

  /** Shows an alert when an incorrect answer is given so the
   * user knows to try again
     */
  function showIncorrectAlert() {
    alert("That's not correct. Please try again");
  }

  function nextQuestion() {
    questionText.innerHTML = qandas[currentQuestion].question;
    btnOneRef.innerHTML = qandas[currentQuestion].options[0];
    btnTwoRef.innerHTML = qandas[currentQuestion].options[1];
    btnThreeRef.innerHTML = qandas[currentQuestion].options[2];
  }

  function reloadGame() {
    alert("Congratulations, you have finished the Cavity Preventer Quiz! Your results = . To play again, please click ok");
    location.reload("quiz");
  }
});