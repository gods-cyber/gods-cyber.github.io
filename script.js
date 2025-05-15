// script.js

const unitTypeSelect = document.getElementById('unit-type');
const fromUnitSelect = document.getElementById('from-unit');
const toUnitSelect = document.getElementById('to-unit');
const inputValue = document.getElementById('input-value');
const resultDisplay = document.getElementById('result');
const convertBtn = document.getElementById('convert-btn');

const units = {
  length: ['meter', 'kilometer', 'mile', 'foot'],
  weight: ['gram', 'kilogram', 'pound', 'ounce'],
  temperature: ['celsius', 'fahrenheit', 'kelvin']
};

// Populate dropdowns based on unit type
function populateUnitOptions(type) {
  const options = units[type];
  fromUnitSelect.innerHTML = '';
  toUnitSelect.innerHTML = '';
  options.forEach(unit => {
    const option1 = document.createElement('option');
    option1.value = unit;
    option1.textContent = unit;

    const option2 = option1.cloneNode(true);

    fromUnitSelect.appendChild(option1);
    toUnitSelect.appendChild(option2);
  });
}

// Handle unit type change
unitTypeSelect.addEventListener('change', () => {
  populateUnitOptions(unitTypeSelect.value);
});

// Initial population
populateUnitOptions(unitTypeSelect.value);

// Handle conversion
convertBtn.addEventListener('click', () => {
  const type = unitTypeSelect.value;
  const from = fromUnitSelect.value;
  const to = toUnitSelect.value;
  const value = parseFloat(inputValue.value);

  if (isNaN(value)) {
    resultDisplay.textContent = "Please enter a valid number.";
    return;
  }

  const result = convert(type, from, to, value);
  resultDisplay.textContent = `Result: ${result} ${to}`;
});

// Conversion logic
function convert(type, from, to, value) {
  if (type === 'length') {
    const conversions = {
      meter: 1,
      kilometer: 1000,
      mile: 1609.34,
      foot: 0.3048
    };
    return (value * conversions[from] / conversions[to]).toFixed(4);
  }

  if (type === 'weight') {
    const conversions = {
      gram: 1,
      kilogram: 1000,
      pound: 453.592,
      ounce: 28.3495
    };
    return (value * conversions[from] / conversions[to]).toFixed(4);
  }

  if (type === 'temperature') {
    return convertTemperature(from, to, value).toFixed(2);
  }

  return value;
}

// Temperature-specific conversions
function convertTemperature(from, to, value) {
  if (from === to) return value;

  let celsius;

  // Convert to Celsius
  switch (from) {
    case 'fahrenheit':
      celsius = (value - 32) * 5 / 9;
      break;
    case 'kelvin':
      celsius = value - 273.15;
      break;
    case 'celsius':
    default:
      celsius = value;
  }

  // Convert from Celsius to target
  switch (to) {
    case 'fahrenheit':
      return (celsius * 9 / 5) + 32;
    case 'kelvin':
      return celsius + 273.15;
    case 'celsius':
    default:
      return celsius;
  }
}
