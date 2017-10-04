"use strict";

(function() {

	var mobilecheck = function() {
		var check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	};

	if (mobilecheck()) {
		document.getElementsByTagName('body')[0].classList.remove('hover-enable');
	};

	// Trainer class definition
	function Trainer() {

		// Creating cache of elements
		var startButton = document.getElementById("start-button");
		var appWrapper = document.getElementsByClassName("app-wrapper")[0];
		var kanaSelectors = document.getElementById("kana-selector").getElementsByClassName("selector");
		var typeSelectors = document.getElementById("type-selector").getElementsByClassName("selector");
		var selectors = {
			hiragana: document.getElementById("hiragana"),
			katakana: document.getElementById("katakana"),
			writing: document.getElementById("writing"),
			reading: document.getElementById("reading")
		};
		var menuButtons = document.getElementsByClassName("menu-button");

		// Different application screens
		var startScreen = document.getElementById("start-screen");
		var readingTraining = document.getElementById("reading-training");
		var readingResult = document.getElementById("reading-result");

		// Elements related to the reading trainer
		var readingTrainingProgress = document.getElementById("reading-training-progress");
		var readingProgressBar = document.getElementById("reading-progress-bar");
		var readingKanaDisplay = document.getElementById("reading-kana-display");
		var readingKanaAnswer = document.getElementById("reading-kana-answer");
		var readingAnswerInput = document.getElementById("reading-answer-input");
		var readingSubmitButton = document.getElementById("reading-answer-submit");
		var readingSkipButton = document.getElementById("reading-skip");

		// Elements related to the result screen
		var resultScore = document.getElementById("result-score");
		var resultPercentage = document.getElementById("result-percentage");
		var wrongAnswersContainer = document.getElementById("wrong-answers-container");
		var wrongAnswersTitle = document.getElementById("wrong-answers-title");
		var wrongAnswersList = document.getElementById("wrong-answers-list");

		// Defining the character set
		var characters = [
			{romaji: ["a"], hiragana: "あ", katakana: "ア"},
			{romaji: ["i"], hiragana: "い", katakana: "イ"},
			{romaji: ["u"], hiragana: "う", katakana: "ウ"},
			{romaji: ["e"], hiragana: "え", katakana: "エ"},
			{romaji: ["o"], hiragana: "お", katakana: "オ"}
		];

		// Hiragana character set
		var hiragana = [
			{romaji: ["a"], character: "あ"},
			{romaji: ["i"], character: "い"},
			{romaji: ["u"], character: "う"},
			{romaji: ["e"], character: "え"},
			{romaji: ["o"], character: "お"}
		]

		// Katakana character set
		var katakana = [
			{romaji: ["a"], character: "ア"},
			{romaji: ["i"], character: "イ"},
			{romaji: ["u"], character: "ウ"},
			{romaji: ["e"], character: "エ"},
			{romaji: ["o"], character: "オ"}
		]

		// Current character set chosen depending on user setting
		var currCharSet = [];

		// Characters which the user answered wrong
		var wrongChars = [];

		// Trainer states
		var states = {
			waiting: 0,
			started: 1,
			readingStarted: 2,
			readingCheck: 3,
			readingResult: 4,
			readingResultWait: 5
		};

		// Stores current application state
		var currState = states.waiting;

		// Stores currently displayed character
		var currChar;

		// Stores user answer
		var currAnswer = "";

		// Variables to keep score
		var totalChars;
		var correctChars = 0;
		var attempted = false;

		// Keeps track of user actions
		var goToMenu = false;
		var skipQuestion = false;

		// Main looping function
		function run() {

			// Check current state and update trainer accordingly
			switch(currState) {

				// Start screen, waiting for user to start
				case states.waiting:

					// Show start screen
					startScreen.classList.add("show");
					readingKanaAnswer.classList.remove("show-wrong");
					readingKanaDisplay.innerHTML = "";
					readingProgressBar.style.width = 0;

					var child = wrongAnswersList.firstChild;

					// Remove all the wrong answers displayed
					while(child) {
						wrongAnswersList.removeChild(child);
						child = wrongAnswersList.firstChild;
					}

					// Reset user actions
					goToMenu = false;
					skipQuestion = false;

					break;

				// Application started, start appropriate trainers depending on user choice
				case states.started:

					// Show application screen
					startScreen.classList.remove("show");

					// Reset current character set and wrong characters
					currCharSet = [];
					wrongChars = [];

					// Select the appropriate character set depending on user setting
					if (selectors.hiragana.checked && selectors.katakana.checked) {
						currCharSet = hiragana.concat(katakana);
					} else if (selectors.hiragana.checked) {
						currCharSet.push.apply(currCharSet, hiragana);
					} else {
						currCharSet.push.apply(currCharSet, katakana);
					}

					if (selectors.reading.checked) {

						// If user chose reading training, start reading training
						currState = states.readingStarted;

						// Initialize score
						totalChars = currCharSet.length;
						correctChars = 0;
					}

					break;

				// Reading training started
				case states.readingStarted:

					// Show reading training screen
					readingTraining.classList.add("show");

					// Focus cursor on input
					readingAnswerInput.focus();

					// Clear previous input value
					readingAnswerInput.value = "";

					// Get random character from the character set
					currChar = currCharSet[Math.round(Math.random() * currCharSet.length)];

					// Update current word
					if (currChar) {

						// Update progress
						var progress = (totalChars - currCharSet.length + 1) / totalChars;
						readingProgressBar.style.width = progress * 100 + "%";
						readingTrainingProgress.innerHTML = (totalChars - currCharSet.length + 1) + " / " + totalChars;

						// Show new character
						readingKanaDisplay.innerHTML = currChar.character;
						readingKanaAnswer.classList.remove("show-wrong");
						attempted = false;
						skipQuestion = false;
						currState = states.readingCheck;
					}

					break;

				// Wait for answer submission and check for correctness
				case states.readingCheck:

					// If user submitted an answer, check for correctness
					if (currAnswer) {
						if (currChar.romaji.includes(currAnswer)) {

							// If this was the first attempt, add 1 to score
							if (!attempted) {
								correctChars++;
							}

							// Remove current character from the set
							var index = currCharSet.indexOf(currChar);
							currCharSet.splice(index, 1);

							if (currCharSet.length > 0) {
								// Go to next character if the character set is not empty
								currState = states.readingStarted;
							} else {
								readingTraining.classList.remove("show");
								currState = states.readingResult;
							}
						} else {

							// Mark question as attempted and show text saying wrong answer
							attempted = true;
							readingKanaAnswer.classList.add("show-wrong");

							// Store the character that the user got wrong
							if (wrongChars.length <= 0 || wrongChars[wrongChars.length - 1] !== currChar) {
								wrongChars.push(currChar);
							}
						}

						// Reset current answer and input box
						currAnswer = "";
					}

					// Go back to main menu
					if (goToMenu) {
						readingTraining.classList.remove("show");
						currState = states.waiting;
					}

					// Skip the current question
					if (skipQuestion) {

						// Remove current character from the set
						var index = currCharSet.indexOf(currChar);
						currCharSet.splice(index, 1);

						if (currCharSet.length > 0) {
							// Go to next character if the character set is not empty
							currState = states.readingStarted;
						} else {
							readingTraining.classList.remove("show");
							currState = states.readingResult;
						}

						// Mark the current character as wrong
						wrongChars.push(currChar);
					}

					break;
				
				// Show training results
				case states.readingResult:

					// Show result screen
					readingResult.classList.add("show");

					// Result from training
					resultPercentage.innerHTML = correctChars / totalChars * 100 + "%";
					resultScore.innerHTML = correctChars + " out of " + totalChars;

					// Set container title
					wrongAnswersTitle.innerHTML = (wrongChars.length > 0) ? "Things to work on:" : "Perfect score, well done!";

					// If user had wrong answers, show all the questions answered wrong
					for (var i = 0; i < wrongChars.length; i++) {
						var container = document.createElement("div");
						container.classList.add("correction-container")

						// Show the character
						var questionDiv = document.createElement("div");
						var question = document.createTextNode(wrongChars[i].character);
						questionDiv.classList.add("correct-character")
						questionDiv.appendChild(question);

						// Show the correct reading
						var answerDiv = document.createElement("div");
						var answer = document.createTextNode(wrongChars[i].romaji[0]);
						answerDiv.classList.add("correct-reading");
						answerDiv.appendChild(answer);

						container.appendChild(questionDiv);
						container.appendChild(answerDiv);

						wrongAnswersList.appendChild(container);
					}

					// Reset wrong characters
					wrongChars = [];

					currState = states.readingResultWait;

					break;

				// Wait for user action on result screen
				case states.readingResultWait:

					// Go to menu
					if (goToMenu) {
						readingResult.classList.remove("show");
						currState = states.waiting;
					}

					break;

				default:
					console.log("Default");
			}
		};

		// Sets event listeners for trainer buttons
		function setListeners() {

			// Set start button listener
			startButton.addEventListener("click", function() {

				// Booleans for recording whether or not both categories are checked
				var kanaSelected = false;
				var typeSelected = false;

				// Check if at least one thing in each category is checked
				for (var i = 0; i < kanaSelectors.length; i++) {
					if (kanaSelectors[i].checked) {
						kanaSelected = true;
						break;
					}
				}	

				for (var i = 0; i < typeSelectors.length; i++) {
					if (typeSelectors[i].checked) {
						typeSelected = true;
						break;
					}
				}

				// Only start if both categories are checked
				if (kanaSelected && typeSelected) {
					currState = states.started;
				};
			});

			// Reading trainer submit button event listener
			readingSubmitButton.addEventListener("click", function() {
				// Store current answer when user pressed submit
				currAnswer = readingAnswerInput.value;
			});

			// Reading trainer input event listener
			readingAnswerInput.addEventListener("keypress", function(e) {
				if (e.keyCode === 13) {
					// If the user pressed enter while focused on the input, take it as a submission
					currAnswer = readingAnswerInput.value;
				}
			});

			// Attach event listeners for returning to main menu
			for (var i = 0; i < menuButtons.length; i++) {
				menuButtons[i].addEventListener("click", function() {
					goToMenu = true;
				});
			}

			readingSkipButton.addEventListener("click", function() {
				skipQuestion = true;
			});
		};

		// Trainer initialization function
		this.start = function() {
			currState = states.waiting;
			setListeners();
			setInterval(run, 30);
		};
	};

	// Instantiate Trainer object and start
	var trainer = new Trainer();
	trainer.start();
})();
