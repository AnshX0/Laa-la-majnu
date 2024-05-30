"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const MAX_IMAGES = 10;

let play = true;
let noCount = 0;

const ws = new WebSocket('ws://localhost:3000');

document.querySelector('.btn--yes').addEventListener('click', function() {
    // Send 'Yes' message when 'Yes' button is clicked
    ws.send('Yes');
});

document.querySelector('.btn--no').addEventListener('click', function() {
    // Send 'No' message when 'No' button is clicked
    ws.send('No');
});

yesButton.addEventListener("click", function() {
    handleYesClick();
    ws.send('Yes'); // Send 'Yes' message only when 'Yes' button is clicked
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