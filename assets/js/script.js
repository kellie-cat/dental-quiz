const questionText = document.getElementById('question-text');
const btnOneRef = document.getElementById('answer-one');
const btnTwoRef = document.getElementById('answer-two');
const btnThreeRef = document.getElementById('answer-three');
const feedback = document.getElementById('feedback');
const reason = document.getElementById('reasons');

//Set the Quiz Data
const quizData = [
  {
    question: "What is the hardest layer of tooth?",
    options: ["Enamel", "Pulp", "Dentine"],
    correct: 0,
    reason: "The outer layer of tooth is called enamel, protecting the softer inner dentine and the nerves and blood vessels, also called pulp",
  },
  {
    question: "Which one of these foods will cause tooth decay?",
    options: ["Salt", "Sugar", "Protein"],
    correct: 1,
    reason: "The bacteria that cause tooth decay feed on simple carbohydrates",
  },
  {
    question: "Which one of these is the worst for teeth?",
    options: ["Sparkling water", "Cheese", "Sweet chilli flavoured crisps"],
    correct: 2,
    reason: "Crisps often have added sugar to the flavouring, and the simple carbohydrates get stuck in our teeth for a long time and break down into sugar",
  },
  {
    question: "Which one of these is safe for teeth?",
    options: ["Tap water", "Diluting juice / squash that says - No Added Sugar", "Pure orange juice"],
    correct: 0,
    reason: "Plain water is always the best for teeth. Even if something says No Added Sugar, the bacteria are well able to use the natural sugars"
  },
  {
    question: "What is the biggest help to prevent tooth decay?",
    options: ["Brushing teeth three times a day", "Changing toothpaste to a fluoride free variety", "Reducing sugar intake from 8 times a day to once or twice a week"],
    correct: 2,
    reason: "The biggest factor in tooth decay is how often we feed the bacteria. If we reduce the frequency of sugar attacks, we reduce our risk of cavities"
  },
  {
    question: "Which one of these minerals is amazing for teeth?",
    options: ["Phosphorous", "Fluoride", "Carbon"],
    correct: 1,
    reason: "Fluoride is very beneficial for teeth. Most toothpastes contain fluoride to be effective. In some areas it is added to the water"
  },
  {
    question: "What is the best way to get the most protection from fluoride toothpaste?",
    options: ["Spit it out but don't rinse", "Spit it out and rinse the mouth with water", "Only use it once a day"],
    correct: 0,
    reason: "Toothpaste is like a cream we put on our skin - the most effect is from letting it soak in"
  },
  {
    question: "How many times a day is usually a good amount to brush with fluoride toothpaste to prevent cavities?",
    options: ["Twice", "Once", "Five"],
    correct: 0,
    reason: "Brushing really well, spending 3-4 minutes getting all the plaque off, twice a day, and definitely at night, is proven to reduce the risk of cavities"
  },
  {
    question: "What is tooth decay?",
    options: ["A cavity / a hole / rotten tooth / dental caries", "A sensitive tooth / sore for a few seconds when drinking sweet or hot or cold", "Bleeding gums / gum disease / bone loss / periodontal disease"],
    correct: 0,
    reason: "When we feed the bacteria in our mouths sugar, they make acid. The acid melts into our teeth and softens them. If this happens frequently and the teeth don't get a chance to heal, they can form a hole"
  },
  {
    question: "What is the best treatment for bleeding gums?",
    options: ["Antibiotics", "Leaving them alone until they heal", "Gentle but thorough cleaning that removes all the plaque, regular professional cleaning if needed"],
    correct: 2,
    reason: "The cause of gum inflammation is the bacteria, or plaque. By removing the plaque, gently but thoroughly, we reduce the inflammation with the lowest chance of side effects"
  },
];

document.addEventListener('DOMContentLoaded', function () {
  /**
   * Loads the 1st question from quizData
   * */
  function firstQuestion() {
    questionText.innerHTML = quizData[0].question;
    btnOneRef.innerHTML = quizData[0].options[0];
    btnTwoRef.innerHTML = quizData[0].options[1];
    btnThreeRef.innerHTML = quizData[0].options[2];
  }

  firstQuestion();

  let buttons = document.getElementsByTagName('button');
  let currentQuestion = 0;

  for (button of buttons) {
    button.addEventListener('click', function () {
      /**
       * if (this.getAttribute('data-type') === 'close') {
        function closeWelcomePopup();
      }
      */

     /**
      *  Add active class to show the answer has been tried
      */
      if (this.getAttribute('data-answer')) {
        this.classList.add('active');
      }
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

  /**
   * function closeWelcomePopup {
    let welcomePopup = document.getElementsByClassName('welcome-popup-outer');
    welcomePopup.classList.add('hidden');
  }
  */

  /**
   * Checks the users answer,
   * gives feedback and, if correct, rationale, if incorrect, an alert,
   * increments the correct or incorrect scores
   * moves onto the next question in the quizData array
   */
  function checkAnswer(selected) {
    if (selected === quizData[currentQuestion].correct) {
      feedback.innerHTML = `
      <i class="fa-solid fa-circle-check" style="color: #04c307"> Correct!</i >
      `;
      reason.innerHTML = `${quizData[currentQuestion].reason}`;
      incrementCorrectScore();
      currentQuestion += 1;
      disableButtons();
    } else {
      feedback.innerHTML = `
      <i class="fa-solid fa-circle-xmark" style="color: #ff0000"> Incorrect!</i>
      `;
      incrementIncorrectScore();
      showIncorrectAlert();
    }
  }

  /**
   * Disables the answer buttons so they can't duplicate answers
   */
  function disableButtons() {
    btnOneRef.disabled = true;
    btnTwoRef.disabled = true;
    btnThreeRef.disabled = true;
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

  /**
   * Refreshes the feedback and explanation text for the next question and then
   * loads the next question text and answer options from the quizData
   * array, and removed active class from buttons to deselect
   */
  function nextQuestion() {
    feedback.innerHTML = "Click an answer to see your result";
    reason.innerHTML = " ";
    questionText.innerHTML = quizData[currentQuestion].question;
    btnOneRef.innerHTML = quizData[currentQuestion].options[0];
    btnTwoRef.innerHTML = quizData[currentQuestion].options[1];
    btnThreeRef.innerHTML = quizData[currentQuestion].options[2];
    btnOneRef.disabled = false;
    btnTwoRef.disabled = false;
    btnThreeRef.disabled = false;
    btnOneRef.classList.remove('active');
    btnTwoRef.classList.remove('active');
    btnThreeRef.classList.remove('active');
  }

  /**
   * Gets final score data from document and displays the final result
   * in a pop up. When the pop up is acknowledged by the user, the
   * quiz refreshes
   */
  function reloadGame() {
    alertFinal();
    location.reload("quiz");
  }

  /**
   * Shows the final score as an alert and invites the user to play again
   */
  function alertFinal() {
    let finalCorrectScore = parseInt(document.getElementById("correct-score").innerText);
    let finalIncorrectScore = parseInt(document.getElementById("incorrect-score").innerText);
    alert(`Congratulations on finishing the Cavity Preventer Quiz! \nFinal score \nCorrect answers ${finalCorrectScore} \nIncorrect answers ${finalIncorrectScore} \nTo play again please press ok`);
  }
});
