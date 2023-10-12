const usedNumbers = new Set();

// Define a function that generates random numbers
export function getRndomeNumber() {
  let randomValue;
  const maxValue = 1000000; // Adjust the maximum value as needed

  do {
    randomValue = Math.floor(Math.random() * maxValue);
  } while (usedNumbers.has(randomValue));

  usedNumbers.add(randomValue);

  // Reset the set when all values are used
  if (usedNumbers.size === maxValue) {
    usedNumbers.clear();
  }

  return randomValue;
}