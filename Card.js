export default class Card {
  #initialCards;
  #cardCounter;
  #cardContainer;
  #modalCreateCard;
  #formCreateCard;
  #btnCreateCard;
  #modalPreviewImage;

  constructor(initialCards) {
    this.#initialCards = initialCards;
    this.#cardCounter = 1;
    this.#cardContainer = document.querySelector('.card__container');
    this.#modalCreateCard = document.getElementById('modalCreateCard');
    this.#formCreateCard =
      this.#modalCreateCard.querySelector('.modal__content');
    this.#btnCreateCard = document.getElementById('openModalCardBtn');
    this.#modalPreviewImage = document.getElementById('modalImagePreview');

    this.#btnCreateCard.addEventListener(
      'click',
      this.#openModalCreateCard.bind(this),
    );
    this.#formCreateCard.addEventListener(
      'submit',
      this.#handleFormSubmit.bind(this),
    );
    this.#initExistingCards();
  }

  createCard(card) {
    this.#createCardHTML(card);
    this.#deleteCard();
  }

  // Private methods below

  #openModalCreateCard() {
    this.#modalCreateCard.style.display = 'flex';
    this.#modalCreateCard.classList.add('modal-show');
  }

  #handleFormSubmit(event) {
    event.preventDefault();
    const namaInput = this.#formCreateCard.querySelector(
      'input[name="nama_tempat"]',
    );
    const linkInput = this.#formCreateCard.querySelector(
      'input[name="link_gambar"]',
    );
    this.createCard({name: namaInput.value, link: linkInput.value});
    namaInput.value = '';
    linkInput.value = '';
    this.#modalCreateCard.style.display = 'none';
  }

  #createCardHTML(card) {
    const cardTemplate = document.getElementById('card-template');
    const currentCardID = `card${this.#cardCounter++}`;
    const cardClone = cardTemplate.content.cloneNode(true);
    const cardImage = cardClone.querySelector('.card__image img');
    const cardTitle = cardClone.querySelector('.card__info-title');
    const activeCardIcon = cardClone.querySelector('.card__icon.active');
    const xCardIcon = cardClone.querySelector('.card__icon-x');

    cardImage.addEventListener('click', () =>
      this.#showPopup(card.link, card.name),
    );
    activeCardIcon.id = `${currentCardID}_svg1`;
    xCardIcon.id = `${currentCardID}_svg2`;
    activeCardIcon.addEventListener('click', () =>
      this.#toggleSvgLove(`${currentCardID}_svg1`, `${currentCardID}_svg2`),
    );
    xCardIcon.addEventListener('click', () =>
      this.#toggleSvgLove(`${currentCardID}_svg1`, `${currentCardID}_svg2`),
    );

    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardTitle.textContent = card.name;

    if (this.#cardContainer.firstChild) {
      this.#cardContainer.insertBefore(
        cardClone,
        this.#cardContainer.firstChild,
      );
    } else {
      this.#cardContainer.appendChild(cardClone);
    }
  }

  #addCardToContainer(card) {
    this.#createCardHTML(card);
    this.#deleteCard();
  }

  #initExistingCards() {
    this.#initialCards.forEach((card) => {
      this.#addCardToContainer(card);
    });
  }

  #deleteCard() {
    const deleteButtons = document.querySelectorAll('.card__delete');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const cardItem = button.closest('.card__item');
        if (cardItem && this.#cardContainer.contains(cardItem)) {
          this.#cardContainer.removeChild(cardItem);
        }
      });
    });
  }

  #toggleSvgLove(svg_1, svg_2) {
    const svg1 = document.getElementById(svg_1);
    const svg2 = document.getElementById(svg_2);

    if (svg1.classList.contains('active')) {
      svg1.classList.remove('active');
      svg2.classList.add('active');
    } else {
      svg2.classList.remove('active');
      svg1.classList.add('active');
    }
  }

  #showPopup(imageSrc, nama) {
    this.#modalPreviewImage.style.display = 'flex';
    this.#modalPreviewImage.classList.add('modal-show');

    const priviewImage = this.#modalPreviewImage.querySelector('#previewImage');
    priviewImage.src = imageSrc;

    const previewTitle = this.#modalPreviewImage.querySelector('#namaImage');
    previewTitle.textContent = nama;
  }
}
