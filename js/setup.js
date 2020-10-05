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

const getRandomArray = function (array) {
  const element = array[getRandom(array.length - 1)];
  return element;
};

const createWizard = function () {
  const wizardName = getRandomArray(NAMES) + ' ' + getRandomArray(SURNAMES);
  const wizardCoatColor = getRandomArray(COAT_COLORS);
  const wizardEyesColor = getRandomArray(EYES_COLORS);
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

const wizardTemplateBlock = document.querySelector('#similar-wizard-template');
const wizardTemplate = wizardTemplateBlock.content.querySelector('div');

const renderWizard = function (wizard) {
  let element = wizardTemplate.cloneNode(true);
  element.querySelector('.setup-similar-label').textContent = wizard.name;
  element.querySelector('.wizard-coat').setAttribute("fill", wizard.coatColor);
  element.querySelector('.wizard-eyes').setAttribute("fill", wizard.eyesColor);
  return element;
};

const renderWizards = function (wizardCount) {
  const similarListContainer = document.querySelector('.setup-similar-list');
  const wizards = createWizards();
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < wizardCount; i++) {
    const currentWizard = wizards[i];
    const currentWizardElement = renderWizard(currentWizard);
    fragment.appendChild(currentWizardElement);
  }
  similarListContainer.appendChild(fragment);
};

const showSimilarWizards = function () {
  renderWizards(WIZARD_COUNT);
  const similarListBlock = document.querySelector('.setup-similar');
  similarListBlock.classList.remove('hidden');
};

showSimilarWizards();
