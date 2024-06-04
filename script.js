// API endpoints
const API_BASE_URL = 'https://x-colors.yurace.pro/api';

// DOM elements
const optionBtns = document.querySelectorAll('.option-btn');
const optionMenus = document.querySelectorAll('.option-menu');
const copyBtns = document.querySelectorAll('.copy-btn');
const backBtns = document.querySelectorAll('.back-btn');
const colorDisplays = document.querySelectorAll('.color-display');
const hexCodes = document.querySelectorAll('.hex-code');
const rgbCodes = document.querySelectorAll('.rgb-code');
const hslCodes = document.querySelectorAll('.hsl-code');
const hueInput = document.getElementById('hue-input');
const converterInputType = document.getElementById('converter-input-type');
const converterInput = document.getElementById('converter-input');
const converterOutputType = document.getElementById('converter-output-type');
const resultCode = document.querySelector('.result-code');

// Show option menu
function showOptionMenu(option) {
  optionMenus.forEach(menu => menu.classList.remove('active'));
  document.getElementById(`${option}-menu`).classList.add('active');
  document.querySelector('.options').style.display = 'none';
}

// Hide option menu
function hideOptionMenu() {
  optionMenus.forEach(menu => menu.classList.remove('active'));
  document.querySelector('.options').style.display = 'flex';
}

// Get random color
async function getRandomColor() {
  const response = await fetch(`${API_BASE_URL}/random`);
  const data = await response.json();
  updateColorDisplay(data);
}

// Get random color with hue
async function getRandomColorByHue() {
  const hue = hueInput.value || 0;
  const response = await fetch(`${API_BASE_URL}/random/${hue}`);
  const data = await response.json();
  updateColorDisplay(data);
}

// Convert color
async function convertColor() {
  const inputType = converterInputType.value;
  const outputType = converterOutputType.value;
  const value = converterInput.value;
  const endpoint = `${API_BASE_URL}/${inputType}2${outputType}?value=${value}`;
  const response = await fetch(endpoint);
  const data = await response.text();
  resultCode.textContent = data;
  updateColorDisplay({ [outputType]: data });
}

// Update color display and codes
function updateColorDisplay(data) {
  colorDisplays.forEach(display => {
    display.style.backgroundColor = data.hex;
  });
  hexCodes.forEach(code => {
    code.textContent = data.hex;
  });
  rgbCodes.forEach(code => {
    code.textContent = data.rgb;
  });
  hslCodes.forEach(code => {
    code.textContent = data.hsl;
  });
}

// Copy color code
function copyColorCode(event) {
  const code = event.target.previousElementSibling.textContent;
  navigator.clipboard.writeText(code);
}

// Event listeners
optionBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const option = btn.dataset.option;
    showOptionMenu(option);
    if (option === 'random') {
      getRandomColor();
    }
  });
});

backBtns.forEach(btn => {
  btn.addEventListener('click', hideOptionMenu);
});

copyBtns.forEach(btn => {
  btn.addEventListener('click', copyColorCode);
});

hueInput.addEventListener('input', getRandomColorByHue);

converterInput.addEventListener('input', convertColor);
converterInputType.addEventListener('change', convertColor);
converterOutputType.addEventListener('change', convertColor);

// Initial state
getRandomColor();