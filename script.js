"use strict";

(function() {

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

	// Adding start button click event
	startButton.addEventListener("click", function() {

		// Booleans for recording whether or not both categories are checked
		var kanaSelected = false;
		var typeSelected = false;
		
		// Check if each category is checked
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

		// Only start game if both categories are checked
		if (kanaSelected && typeSelected) appWrapper.classList.add("started");
	});
})();
