// *Grab the elements
const padElements = document.querySelectorAll(".pad");
const bpmBtnTextElement = document.querySelector(".bpm__btn span");
const bpmChangeInput = document.querySelector(".bpm__range");
const bpmChangeArea = document.querySelector(".bpm__change-area");
const playButton = document.querySelector(".play-stop__btn");
const clearButton = document.querySelector(".clear__btn");
const mainPads = document.querySelectorAll(
  ".main-pad[data-anotherSound='true']"
);
const soundPopUp = document.querySelector(".sound-popup");

// *Music Sound
const clapSound = document.querySelector(".clap-sound");
const cowbellSound = document.querySelector(".cowbell-sound");
const hihatSound = document.querySelector(".hihat-sound");
const kickSound = document.querySelector(".kick-sound");
const openhatSound = document.querySelector(".openhat-sound");
const shakerSound = document.querySelector(".shaker-sound");
const snareSound = document.querySelector(".snare-sound");
const tomSound = document.querySelector(".tom-sound");
const typeOfSound = ["808", "acoustic", "analog"];

// *Variables
let index = 0;
let bpm = 120;
let isPlaying = false;

// *EventListeners
padElements.forEach((padElement) => {
  padElement.addEventListener("click", colorButton);
  padElement.addEventListener("animationend", function () {
    padElement.style.animation = "";
  });
});

mainPads.forEach((mainPad) => {
  mainPad.addEventListener("click", function (e) {
    openSoundPopUp(e);
  });
});

bpmBtnTextElement.addEventListener("click", function () {
  bpmChangeArea.classList.toggle("active");
});

bpmChangeInput.addEventListener("input", changeBPMValueText);

bpmChangeInput.addEventListener("change", changeBPMValue);

playButton.addEventListener("click", function () {
  startPlay();
  updatePlayBtn();
});

clearButton.addEventListener("click", clearPads);

// *Functions
function play() {
  let step = index % 14;
  const activePadRow = document.querySelectorAll(`[data-pudnumber="${step}"`);
  activePadRow.forEach((pad) => {
    pad.style.animation = `blur 1s alternate ease-in-out`;
    if (pad.classList.contains("colored")) {
      if (pad.classList.contains("clap-row__pad")) {
        clapSound.currentTime = 0;
        clapSound.play();
      }
      if (pad.classList.contains("cowbell-row__pad")) {
        cowbellSound.currentTime = 0;
        cowbellSound.play();
      }
      if (pad.classList.contains("hihat-row__pad")) {
        hihatSound.currentTime = 0;
        hihatSound.play();
      }
      if (pad.classList.contains("kick-row__pad")) {
        kickSound.currentTime = 0;
        kickSound.play();
      }
      if (pad.classList.contains("openhat-row__pad")) {
        openhatSound.currentTime = 0;
        openhatSound.play();
      }
      if (pad.classList.contains("shaker-row__pad")) {
        shakerSound.currentTime = 0;
        shakerSound.play();
      }
      if (pad.classList.contains("snare-row__pad")) {
        snareSound.currentTime = 0;
        snareSound.play();
      }
      if (pad.classList.contains("tom-row__pad")) {
        tomSound.currentTime = 0;
        tomSound.play();
      }
    }
  });
  index++;
}

function startPlay() {
  const interval = (60 / bpm) * 1000;
  if (!isPlaying) {
    isPlaying = setInterval(play, interval);
  } else {
    clearInterval(isPlaying);
    isPlaying = false;
  }
}

function clearPads() {
  padElements.forEach((pad) => {
    pad.classList.remove("colored");
  });
}

function changeBPMValueText() {
  const bpmValueText = document.querySelector(".bpm__change-text");
  bpmValueText.innerText = bpmChangeInput.value;
}

function changeBPMValue() {
  bpm = Number(bpmChangeInput.value);
  clearInterval(isPlaying);
  isPlaying = false;
  if (playButton.classList.contains("active")) {
    startPlay();
  }
}

function updatePlayBtn() {``
  playButton.classList.toggle("active");
  if (playButton.classList.contains("active")) {
    playButton.children[0].children[0].src = "img/pause.svg";
  } else {
    playButton.children[0].children[0].src = "img/play.svg";
  }
}

function colorButton(e) {
  e.target.classList.toggle("colored");
}

function openSoundPopUp(e) {
  soundPopUp.classList.add("active");
  tunePopUp(e);
}

function tunePopUp(e) {
  const soundCategoryName = e.target.dataset.sound;
  const soundPopUpBody = soundPopUp.children[0];
  const soundPopUpName = soundPopUpBody.children[0];
  const soundPopUpBeats = soundPopUpBody.children[1].children;
  soundPopUpName.innerText = soundCategoryName;
  [...soundPopUpBeats].forEach((sound, index) => {
    sound.innerText = `${soundCategoryName} ${typeOfSound[index]}`;
    sound.addEventListener("click", function (e) {
      changeSound(e);
    });
  });
}

function changeSound(e) {
  const target = e.target;
  const pathSound = target.innerText.toLowerCase().split(" ").join("-");
  const targetPopUpTitle = target.parentNode.previousElementSibling.innerText;
  if (targetPopUpTitle.toLowerCase() == "hihat") {
    hihatSound.src = `sounds/${pathSound}.wav`;
    soundPopUp.classList.remove("active");
    return;
  }
  if (targetPopUpTitle.toLowerCase() == "kick") {
    kickSound.src = `sounds/${pathSound}.wav`;
    soundPopUp.classList.remove("active");
    return;
  }
  if (targetPopUpTitle.toLowerCase() == "openhat") {
    openhatSound.src = `sounds/${pathSound}.wav`;
    soundPopUp.classList.remove("active");
    return;
  }
  if (targetPopUpTitle.toLowerCase() == "snare") {
    snareSound.src = `sounds/${pathSound}.wav`;
    soundPopUp.classList.remove("active");
    return;
  }
  if (targetPopUpTitle.toLowerCase() == "tom") {
    tomSound.src = `sounds/${pathSound}.wav`;
    soundPopUp.classList.remove("active");
    return;
  }
}
