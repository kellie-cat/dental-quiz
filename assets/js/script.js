const questionText = document.getElementById('question-text');
const btnOneRef = document.getElementById('answer-one');
const btnTwoRef = document.getElementById('answer-two');
const btnThreeRef = document.getElementById('answer-three');
const feedback = document.getElementById('feedback');
const reason = document.getElementById('reasons');
const feedbackBackground = document.getElementById('feedback-background');
const incorrectModal = document.getElementById('incorrect-answer');
const btnNextRef = document.getElementById('next-button');
const finalResult = document.getElementById('final-result');

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

//if (window.location.href === ("https://kellie-cat.github.io/dental-quiz/quiz.html")) {
document.addEventListener('DOMContentLoaded', function () {
  let buttons = document.getElementsByTagName('button');
  let currentQuestion = 0;
  shuffleQuizData();
  loadQuestion();

  for (let button of buttons) {
    button.addEventListener('click', function () {
      /**
       *  Add active class (make button blue) to show the answer has been tried
       */
      if (this.getAttribute('data-answer')) {
        this.classList.add('active', 'disabled');
      }
      if (this.getAttribute('data-type') === 'next' && currentQuestion <= 9) {
        nextQuestion();
        loadQuestion();
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
      /**
       * closes incorrectModal when user clicks 'Try Again'
       */
      if (this.getAttribute('data-type') === 'close') {
        feedbackBackground.classList.remove('flex');
        feedbackBackground.classList.add('hide');
        incorrectModal.classList.remove('flex');
        incorrectModal.classList.add('hide');
      }
      if (this.getAttribute('data-type') === 'next' && currentQuestion >= 9) {
        btnNextRef.innerHTML = "Finish the Game!";
      }
      if (this.getAttribute('data-type') === 'next' && currentQuestion >= 10) {
        alertFinal();
      }
      if (this.getAttribute('data-type') === 'game') {
        reloadGame();
      }
    });
  }

  /**
   * Checks the users answer,
   * gives feedback and, if correct, rationale, if incorrect, an alert,
   * increments the correct or incorrect scores,
   * if incorrect then shows incorrect Modal, if correct
   * moves onto the next question in the quizData array
   */
  function checkAnswer(selected) {
    if (selected === quizData[currentQuestion].correct) {
      feedback.innerHTML = `
      <i class="fa-solid fa-circle-check pop-outin" style="color: #035E06"> Correct!</i >
      `;
      reason.innerHTML = `${quizData[currentQuestion].reason}`;
      incrementCorrectScore();
      currentQuestion += 1;
      disableButtons();
    } else {
      feedback.innerHTML = `
      <i class="fa-solid fa-circle-xmark" style="color: #cc0000"> Incorrect!</i>
      `;
      incrementIncorrectScore();
      showIncorrectModal();
      disableIncorrectRef();
    }
  }

  /**
   * Shuffles the quizData array to make the quiz more enjoyable for returning users
   */
  function shuffleQuizData() {
    for (let i = quizData.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let k = quizData[i];
      quizData[i] = quizData[j];
      quizData[j] = k;
    }
  }

  /**
  * Loads the questions and answers from quizData
  * */
  function loadQuestion() {
    questionText.innerHTML = quizData[currentQuestion].question;
    btnOneRef.innerHTML = quizData[currentQuestion].options[0];
    btnTwoRef.innerHTML = quizData[currentQuestion].options[1];
    btnThreeRef.innerHTML = quizData[currentQuestion].options[2];
  }

  /**
   * Disables the answer buttons so they can't duplicate answers
   */
  function disableButtons() {
    btnOneRef.disabled = true;
    btnTwoRef.disabled = true;
    btnThreeRef.disabled = true;
  }

  function disableIncorrectRef() {
    let incorrectRef = document.querySelector('.active');
    incorrectRef.disabled = true;
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

  /** Shows a modal when an incorrect answer is given so the
   * user knows to try again
     */
  function showIncorrectModal() {
    feedbackBackground.classList.remove('hide');
    feedbackBackground.classList.add('flex');
    incorrectModal.classList.remove('hide');
    incorrectModal.classList.add('flex');
  }

  /**
   * Refreshes the feedback and explanation text for the next question and then
   * loads the next question text and answer options from the quizData
   * array, and removed active class from buttons to deselect
   */
  function nextQuestion() {
    feedback.innerHTML = "Click an answer to see your result";
    reason.innerHTML = " ";
    btnOneRef.disabled = false;
    btnTwoRef.disabled = false;
    btnThreeRef.disabled = false;
    btnOneRef.classList.remove('active');
    btnTwoRef.classList.remove('active');
    btnThreeRef.classList.remove('active');
  }

  /**
    * Shows the final result modal and invites the user to play again
    * or go back to the home page
    */
  function alertFinal() {
    let finalCorrectScore = parseInt(document.getElementById("correct-score").innerText);
    let finalIncorrectScore = parseInt(document.getElementById("incorrect-score").innerText);
    let personalised = document.getElementById("personalised");

    document.getElementById("correct-result").innerHTML = finalCorrectScore + ` <i class="fa-solid fa-circle-check" style="color: #035E06"></i>`;
    document.getElementById("incorrect-result").innerHTML = finalIncorrectScore + ` <i class="fa-solid fa-circle-xmark" style="color: #cc0000"></i>`;

    /**
     * Personalised feedback
     */
    if (finalIncorrectScore > 4) {
      personalised.innerHTML = "Good try but you could definitely learn some new tricks to keep teeth strong, try again!";
    } else if (finalIncorrectScore > 2) {
      personalised.innerHTML = "Good work! You have a little bit to learn about teeth, why not play again!";
    } else {
      personalised.innerHTML = "Brilliant result! You know how to look after teeth!";
    }

    feedbackBackground.classList.remove('hide');
    feedbackBackground.classList.add('flex');
    finalResult.classList.remove('hide');
    finalResult.classList.add('flex');
  }

  /**
   * Gets final score data from document and displays the final result
   * in a pop up. When the pop up is acknowledged by the user, the
   * quiz refreshes
   */
  function reloadGame() {
    location.reload("quiz");
  }
});
//}