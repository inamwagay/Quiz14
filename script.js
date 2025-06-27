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
let count = 11;
let countdown;

//Questions and Options array
const quizArray = [
  {
    id: "0",
    question: "When did World War 1 begin?",
    options: ["1914", "1912", "1918", "1920"],
    correct: "1914",
  },
  {
    id: "1",
    question: "Which event is considered the immediate cause of World War 1?",
    options: [
      "Invasion of Poland",
      "Assassination of Archduke Franz Ferdinand",
      "Sinking of the Lusitania",
      "Zimmermann Telegram"
    ],
    correct: "Assassination of Archduke Franz Ferdinand",
  },
  {
    id: "2",
    question: "Which country was NOT part of the Allied Powers during WW1?",
    options: ["France", "Germany", "Russia", "United Kingdom"],
    correct: "Germany",
  },
  {
    id: "3",
    question: "Who was the leader of Germany during World War 1?",
    options: ["Adolf Hitler", "Kaiser Wilhelm II", "Otto von Bismarck", "Joseph Goebbels"],
    correct: "Kaiser Wilhelm II",
  },
  {
    id: "4",
    question: "What type of warfare was most common on the Western Front?",
    options: ["Naval Warfare", "Trench Warfare", "Air Warfare", "Guerrilla Warfare"],
    correct: "Trench Warfare",
  },
  {
    id: "5",
    question: "What was the name of the treaty that ended World War 1?",
    options: [
      "Treaty of Versailles",
      "Treaty of Tordesillas",
      "Treaty of Ghent",
      "Treaty of Paris"
    ],
    correct: "Treaty of Versailles",
  },
  {
    id: "6",
    question: "Which empire did Austria-Hungary belong to?",
    options: ["Roman Empire", "Holy Roman Empire", "Dual Monarchy", "Ottoman Empire"],
    correct: "Dual Monarchy",
  },
  {
    id: "7",
    question: "Which country joined WW1 in 1917 and helped tip the balance in favor of the Allies?",
    options: ["Russia", "Italy", "USA", "Japan"],
    correct: "USA",
  },
  {
    id: "8",
    question: "What was the main objective of the Gallipoli campaign?",
    options: [
      "To capture Berlin",
      "To open a sea route to Russia",
      "To invade France",
      "To occupy Egypt"
    ],
    correct: "To open a sea route to Russia",
  },
  {
    id: "9",
    question: "Which weapon was introduced during WW1 and caused severe injuries?",
    options: ["Tanks", "Mustard Gas", "Rifles", "Airplanes"],
    correct: "Mustard Gas",
  },
  {
    id: "10",
    question: "Who was the Prime Minister of the UK during most of WW1?",
    options: ["Winston Churchill", "David Lloyd George", "Neville Chamberlain", "Herbert Asquith"],
    correct: "David Lloyd George",
  },
  {
    id: "11",
    question: "What was the Zimmermann Telegram?",
    options: [
      "A German peace offer",
      "A British war declaration",
      "A German proposal to Mexico to join the war against the US",
      "A Russian surrender notice"
    ],
    correct: "A German proposal to Mexico to join the war against the US",
  },
  {
    id: "12",
    question: "Which battle is considered one of the longest of WW1?",
    options: ["Battle of Verdun", "Battle of the Somme", "Battle of Tannenberg", "Battle of Ypres"],
    correct: "Battle of Verdun",
  },
  {
    id: "13",
    question: "What was 'No Man's Land'?",
    options: [
      "Land owned by neutral countries",
      "Disputed land in Africa",
      "The land between opposing trenches",
      "A buffer zone in colonies"
    ],
    correct: "The land between opposing trenches",
  },
  {
    id: "14",
    question: "Which empire collapsed as a result of WW1?",
    options: [
      "British Empire",
      "German Empire",
      "Ottoman Empire",
      "Both B and C"
    ],
    correct: "Both B and C",
  },
  {
    id: "15",
    question: "What was the main role of women during WW1?",
    options: [
      "Combat soldiers",
      "Nurses and factory workers",
      "Spies",
      "Teachers"
    ],
    correct: "Nurses and factory workers",
  },
  {
    id: "16",
    question: "How did the United States justify entering WW1?",
    options: [
      "To avenge Pearl Harbor",
      "Due to unrestricted submarine warfare and the Zimmermann Telegram",
      "To support colonial independence",
      "To stop communism"
    ],
    correct: "Due to unrestricted submarine warfare and the Zimmermann Telegram",
  },
  {
    id: "17",
    question: "What was the name of the German plan to quickly defeat France?",
    options: ["Schlieffen Plan", "Blitzkrieg", "Barbarossa Plan", "Molotov Plan"],
    correct: "Schlieffen Plan",
  },
  {
    id: "18",
    question: "Which new vehicle played a significant role in breaking the trench stalemate?",
    options: ["Airplanes", "Ships", "Submarines", "Tanks"],
    correct: "Tanks",
  },
  {
    id: "19",
    question: "How many soldiers were estimated to have died in WW1?",
    options: ["1 million", "5 million", "10 million", "Over 16 million"],
    correct: "Over 16 million",
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
      count = 11;
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
  count = 11;
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
