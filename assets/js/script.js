const questionText = document.getElementById("question-text");
const btnOneRef = document.getElementById('answer-one');
const btnTwoRef = document.getElementById('answer-two');
const btnThreeRef = document.getElementById('answer-thee');

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
    options: ["Brushing teeth three times a day", "Changing toothpaste to a fluoride free veriety", "Reducing sugar intake from 5 times a day to once or twice a week"],
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
  let buttons = document.getElementsByTagName('button');

  for (button of buttons) {
    button.addEventListener('click', function () {
      if (this.getAttribute('data-type') === 'next') {
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

    });
  }
  let currentQuestion = 0;
  let correctAnswers = 0;
  let incorrectAnswers = 0;

  function showQuestion() {
    console.log('Am I connected?');
    questionText.textContent = qandas[currentQuestion].question;

    const options = document.querySelectorAll(".choice");
    options.forEach((choice, index) => {
      choice.textContent = qandas[currentQuestion].options[index];
    });

    const feedback = document.getElementById("feedback");
  }

  function checkAnswer(selected) {
    const feedback = document.getElementById("feedback");
    if (selected === qandas[currentQuestion].correct) {
      feedback.innerHTML = "Correct!";
      correctAnswers + 1;
      currentQuestion += 1;
      console.log('currentQuestion', currentQuestion);
    } else {
      feedback.innerHTML = "Incorrect!";
      incorrectAnswers + 1;
    }
  }
  function nextQuestion() {
    questionText.innerHTML = qandas[currentQuestion].question;
    btnOneRef.innerHTML = qandas[currentQuestion].options[0];
    btnTwoRef.innerHTML = qandas[currentQuestion].options[1];
    btnThreeRef.innerHTML = qandas[currentQuestion].options[2];
  }
});
