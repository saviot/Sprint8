// Get the modal
const modalEditProfile = document.getElementById('modal');
const modalCreateCard = document.getElementById('modalCreateCard');
const modalPreviewImage = document.getElementById('modalImagePreview');

// Get the form inside the modal
const formOpen = modalEditProfile.querySelector('.modal__content');
const formCreateCard = modalCreateCard.querySelector('.modal__content');

// Get the button that opens the modal
const btnOpenModal = document.getElementById('openModalBtn');
const btnCreateCard = document.getElementById('openModalCardBtn');

// Get the <span> element that closes the modal
const spanExitProfile = modalEditProfile.querySelector('.modal__close');
const spanExitCard = modalCreateCard.querySelector('.modal__close');

// When the user clicks on <span> (x), close the modal
spanExitProfile.onclick = function () {
  modalEditProfile.style.display = 'none';
};
spanExitCard.onclick = function () {
  modalCreateCard.style.display = 'none';
};
modalPreviewImage.onclick = function () {
  modalPreviewImage.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modalEditProfile) {
    modalEditProfile.style.display = 'none';
  } else if (event.target == modalCreateCard) {
    modalCreateCard.style.display = 'none';
  }
};

// esc
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    modalEditProfile.style.display = 'none';
    modalCreateCard.style.display = 'none';
  }
});
