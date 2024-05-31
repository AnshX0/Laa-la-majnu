"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const MAX_IMAGES = 10;

let play = true;
let noCount = 0;

async function sendResponse(message) {
  try {
    const response = await fetch('/.netlify/functions/send-response', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: { 'Content-Type': 'application/json' }
    });
    const result = await response.json();
    console.log(result.status);
  } catch (error) {
    console.error('Error sending response:', error);
  }
}

yesButton.addEventListener("click", function() {
    handleYesClick();
    sendResponse('Yes');
});

noButton.addEventListener("click", function() {
    if (play) {
        noCount++;
        const imageIndex = Math.min(noCount, MAX_IMAGES);
        changeImage(imageIndex);
        resizeYesButton();
        updateNoButtonText();
        if (noCount === MAX_IMAGES) {
            play = false;
        }
    }
    sendResponse('No');
});

function handleYesClick() {
    titleElement.innerHTML = "Yay! <3";
    buttonsContainer.classList.add("hidden");
    changeImage("yes");
}

function resizeYesButton() {
    const computedStyle = window.getComputedStyle(yesButton);
    const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
    const newFontSize = fontSize * 1.6;

    yesButton.style.fontSize = `${newFontSize}px`;
}

function generateMessage(noCount) {
    const messages = [
        "No",
        "Are you sure? 🌷🌷",
        "Really sure? 🥺",
        "Please ??",
        "I'll invite you to a pizza 🍕",
        "Then a chocolate cake 🍫",
        "We'll watch movies 🎥",
        "We'll go Gwarighat 🏖️",
        "We'll play video games together 👾",
        "I'm gonna cry...! 😭",
        "You're breaking my heart 💔",
    ];

    const messageIndex = Math.min(noCount, messages.length - 1);
    return messages[messageIndex];
}

function changeImage(image) {
    catImg.src = `assets/img/cat-${image}.jpg`;

    if (image === "no") {
        const floatHeart = document.createElement("span");
        floatHeart.classList.add("float-heart");
        floatHeart.innerHTML = "❤️"; // You can use any symbol or image here
        document.body.appendChild(floatHeart);

        floatHeart.addEventListener("animationend", () => {
            floatHeart.remove();
        });
    }
}

function updateNoButtonText() {
    noButton.innerHTML = generateMessage(noCount);
}
