"use strict";

(function() {

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

		// Elements related to the reading trainer
		var readingKanaDisplay = document.getElementById("reading-kana-display");
		var readingKanaAnswer = document.getElementById("reading-kana-answer");
		var readingAnswerInput = document.getElementById("reading-answer-input");
		var readingSubmitButton = document.getElementById("reading-answer-submit");

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

		// Trainer states
		var states = {
			waiting: 0,
			started: 1,
			readingStarted: 2,
			readingCheck: 3
		};

		// Stores current application state
		var currState = states.waiting;

		// Stores currently displayed character
		var currChar;

		// Stores user answer
		var currAnswer = "";

		// Main looping function
		function run() {

			// Check current state and update trainer accordingly
			switch(currState) {

				// Start screen, waiting for user to start
				case states.waiting:

					// Show start screen
					appWrapper.classList.remove("started");
					break;

				// Application started, start appropriate trainers depending on user choice
				case states.started:

					// Show application screen
					appWrapper.classList.add("started");

					// Select the appropriate character set depending on user setting
					if (selectors.hiragana.checked && selectors.katakana.checked) {
						currCharSet = hiragana.concat(katakana);
					} else if (selectors.hiragana.checked) {
						currCharSet = hiragana;
					} else {
						currCharSet = katakana;
					}
					console.log(currCharSet);

					if (selectors.reading.checked) {
						// If user chose reading training, start reading training
						currState = states.readingStarted;
					}

					break;

				// Reading training started
				case states.readingStarted:

					// Show reading training screen
					appWrapper.classList.add("reading-training");

					// Clear previous input value
					readingAnswerInput.value = "";

					// Get random character from the character set
					currChar = currCharSet[Math.round(Math.random() * currCharSet.length)];

					// Update current word
					if (currChar) {
						readingKanaDisplay.innerHTML = currChar.character;
						readingKanaAnswer.innerHTML = "Answer: " + currChar.romaji;
						currState = states.readingCheck;
					}

					break;

				// Wait for answer submission and check for correctness
				case states.readingCheck:

					// If user submitted an answer, check for correctness
					if (currAnswer) {
						if (currChar.romaji.includes(currAnswer)) {

							// Remove current character from the set
							var index = currCharSet.indexOf(currChar);
							currCharSet.splice(index, 1);

							if (currCharSet.length > 0) {
								// Go to next character if the character set is not empty
								currState = states.readingStarted;
							} else {
								currState = states.waiting;
							}
						} else {
							console.log("Incorrect.");
						}

						// Reset current answer and input box
						currAnswer = "";
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
