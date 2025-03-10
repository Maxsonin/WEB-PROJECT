var audioPlayer = document.getElementById('audioPlayer');
var musicButton = document.getElementById('musicButton');
var musicIcon = document.getElementById('musicIcon');
var backToTopButton = document.getElementById('backToTop');

window.onload = function () {
  audioPlayer.volume = 0.2;
  if (localStorage.getItem('music') === 'playing') {
    audioPlayer.play();
  } else if (localStorage.getItem('music') === 'paused') {
    audioPlayer.pause();
  } else {
    createPopup();
  }
  updateIcon();
};

window.onscroll = function () {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    backToTopButton.style.visibility = 'visible';
  } else {
    backToTopButton.style.visibility = 'hidden';
  }
};

backToTopButton.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.addEventListener('visibilitychange', (event) => {
  if (document.visibilityState === 'hidden') {
    audioPlayer.pause();
  } else {
    if (localStorage.getItem('music') === 'playing') {
      audioPlayer.play();
    }
  }
  updateIcon();
});

musicButton.addEventListener('click', function () {
  if (audioPlayer.paused) {
    audioPlayer.play();
    localStorage.setItem('music', 'playing');
  } else {
    audioPlayer.pause();
    localStorage.setItem('music', 'paused');
  }
  updateIcon();
});

function updateIcon() {
  if (audioPlayer.paused) {
    musicIcon.classList.remove('fa', 'fa-volume-up');
    musicIcon.classList.add('fa', 'fa-volume-mute');
  } else {
    musicIcon.classList.remove('fa', 'fa-volume-mute');
    musicIcon.classList.add('fa', 'fa-volume-up');
  }
}

function createPopup() {
  var popup = document.createElement('div');
  popup.id = 'popup';
  popup.classList.add('popup');

  var message = document.createElement('span');
  message.textContent = 'Музики?';
  popup.appendChild(message);

  var buttonContainer = document.createElement('div');
  buttonContainer.style.marginTop = '10px';

  var yesButton = document.createElement('button');
  yesButton.textContent = 'Так';
  yesButton.style.marginRight = '10px';
  yesButton.onclick = function () {
    audioPlayer.play();
    localStorage.setItem('music', 'playing');
    updateIcon();
    closePopup();
  };

  var noButton = document.createElement('button');
  noButton.textContent = 'Ні';
  noButton.onclick = function () {
    audioPlayer.pause();
    localStorage.setItem('music', 'pause');
    closePopup();
    updateIcon();
  };

  buttonContainer.appendChild(yesButton);
  buttonContainer.appendChild(noButton);
  popup.appendChild(buttonContainer);

  document.body.appendChild(popup);

  setTimeout(function () {
    closePopup();
  }, 8000);
}

function closePopup() {
  var popup = document.getElementById('popup');
  if (popup) {
    popup.remove();
  }
}
