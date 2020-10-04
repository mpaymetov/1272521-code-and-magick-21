'use strict';

const WIZARD_COUNT = 4;
const NAMES = [
  "Иван",
  "Хуан Себастьян",
  "Мария",
  "Кристоф",
  "Виктор",
  "Юлия",
  "Люпита",
  "Вашингтон"
];
const SURNAMES = [
  "да Марья",
  "Верон",
  "Мирабелла",
  "Вальц",
  "Онопко",
  "Топольницкая",
  "Нионго",
  "Ирвинг"
];
const COAT_COLORS = [
  "rgb(101, 137, 164)",
  "rgb(241, 43, 107)",
  "rgb(146, 100, 161)",
  "rgb(56, 159, 117)",
  "rgb(215, 210, 55)",
  "rgb(0, 0, 0)"
];
const EYES_COLORS = [
  "black",
  "red",
  "blue",
  "yellow",
  "green"
];

const setupBlock = document.querySelector('.setup');
setupBlock.classList.remove('hidden');

const getRandom = function (number = 1) {
  const result = Math.round(number * Math.random());
  return result;
};

const createWizard = function () {
  const wizardName = NAMES[getRandom(NAMES.length - 1)] + ' ' + SURNAMES[getRandom(SURNAMES.length - 1)];
  const wizardCoatColor = COAT_COLORS[getRandom(COAT_COLORS.length - 1)];
  const wizardEyesColor = EYES_COLORS[getRandom(EYES_COLORS.length - 1)];
  const wizard = {
    name: wizardName,
    coatColor: wizardCoatColor,
    eyesColor: wizardEyesColor
  };
  return wizard;
};

const createWizards = function () {
  let wizards = [];
  for (let i = 0; i < WIZARD_COUNT; i++) {
    wizards.push(createWizard());
  }
  return wizards;
};

const wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('div');

const renderWizard = function (wizard) {
  let element = wizardTemplate.cloneNode(true);
  element.querySelector('.setup-similar-label').textContent = wizard.name;
  element.querySelector('.wizard-coat').setAttribute("fill", wizard.coatColor);
  element.querySelector('.wizard-eyes').setAttribute("fill", wizard.eyesColor);
  return element;
};

const renderWizards = function () {
  const similarListContainer = document.querySelector('.setup-similar-list');
  const wizards = createWizards();
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < WIZARD_COUNT; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListContainer.appendChild(fragment);
};

const showSimilarWizards = function () {
  renderWizards();
  const similarListBlock = document.querySelector('.setup-similar');
  similarListBlock.classList.remove('hidden');
};

showSimilarWizards();
