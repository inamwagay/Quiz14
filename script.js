//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 31;
let countdown;

//Questions and Options array
const quizArray = [
  // 🌍 World War 1 (5 Questions)
  {
    id: "0",
    question: "When did World War 1 begin?",
    options: ["1912", "1914", "1916", "1918"],
    correct: "1914",
  },
  {
    id: "1",
    question: "Which event triggered the start of World War 1?",
    options: [
      "Invasion of Poland",
      "Sinking of the Lusitania",
      "Assassination of Archduke Franz Ferdinand",
      "Treaty of Versailles"
    ],
    correct: "Assassination of Archduke Franz Ferdinand",
  },
  {
    id: "2",
    question: "Which countries made up the Triple Entente?",
    options: [
      "Germany, Austria-Hungary, Italy",
      "France, Russia, Britain",
      "USA, Britain, Italy",
      "Germany, Russia, USA"
    ],
    correct: "France, Russia, Britain",
  },
  {
    id: "3",
    question: "Which type of warfare was most common on the Western Front during WWI?",
    options: ["Trench Warfare", "Naval Warfare", "Air Strikes", "Guerrilla Warfare"],
    correct: "Trench Warfare",
  },
  {
    id: "4",
    question: "Which treaty ended World War 1?",
    options: [
      "Treaty of Paris",
      "Treaty of Tordesillas",
      "Treaty of Ghent",
      "Treaty of Versailles"
    ],
    correct: "Treaty of Versailles",
  },

  // 🕊️ Eastern Question & Crimean War (5 Questions)
  {
    id: "5",
    question: "What was the 'Eastern Question' mainly about in 19th-century Europe?",
    options: [
      "The decline of the Ottoman Empire",
      "The colonization of Asia",
      "The rise of Germany",
      "Border disputes in Africa"
    ],
    correct: "The decline of the Ottoman Empire",
  },
  {
    id: "6",
    question: "Who were the main allies fighting against Russia in the Crimean War?",
    options: [
      "France, Britain, Ottoman Empire",
      "Germany, Austria, Ottoman Empire",
      "USA, Britain, Italy",
      "France, Austria, Russia"
    ],
    correct: "France, Britain, Ottoman Empire",
  },
  {
    id: "7",
    question: "What issue sparked the Crimean War in 1853?",
    options: [
      "Oil disputes in the Black Sea",
      "Territorial conflict in Crimea",
      "Religious disputes over Christian sites in the Holy Land",
      "Ottoman attacks on Russian ships"
    ],
    correct: "Religious disputes over Christian sites in the Holy Land",
  },
  {
    id: "8",
    question: "What was a major consequence of the Crimean War for the Ottoman Empire?",
    options: [
      "It dissolved completely",
      "It gained more European territory",
      "It survived due to European support",
      "It annexed Crimea from Russia"
    ],
    correct: "It survived due to European support",
  },
  {
    id: "9",
    question: "Why was Crimea strategically important to Russia?",
    options: [
      "It had large coal reserves",
      "It provided a warm-water port in the Black Sea",
      "It bordered Austria-Hungary",
      "It was home to the Russian royal family"
    ],
    correct: "It provided a warm-water port in the Black Sea",
  },
];



//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 31;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 31;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
