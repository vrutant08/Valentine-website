const envelopes = document.querySelectorAll('.envelope');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const popupGif = document.getElementById('popup-gif');
const closePopup = document.querySelector('.close-popup');

envelopes.forEach((envelope) => {
  envelope.addEventListener('click', () => {
    const closed = envelope.querySelector('.closed');
    const open = envelope.querySelector('.open');
    const note = envelope.getAttribute('data-note');
    const gifLink = envelope.getAttribute('data-gif');

    // Switch envelope image and show popup with corresponding gif and note
    closed.classList.add('hidden');
    open.classList.remove('hidden');
    popupMessage.textContent = note;
    popupGif.src = gifLink;
    popup.classList.remove('hidden');
  });
});

closePopup.addEventListener('click', () => {
  popup.classList.add('hidden');
});
