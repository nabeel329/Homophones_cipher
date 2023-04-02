let cipher = {};

function updateCipher() {
  // Clear the current cipher
  cipher = {};
  
  // Get the user input from the key field
  const keyText = document.getElementById('key').value;
  
  // Split the input into lines and process each line
  const lines = keyText.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Ignore empty lines and comments
    if (line.length === 0 || line.startsWith('#')) {
      continue;
    }
    
    // Split the line into a letter and its homophones
    const [letter, ...homophones] = line.split(/\s+/);
    
    // Add the letter and its homophones to the cipher
    cipher[letter] = homophones;
  }
}

function encrypt() {
  updateCipher();
  const plainText = document.getElementById('plain-text').value;
  let cipherText = '';

  for (let i = 0; i < plainText.length; i++) {
    const character = plainText.charAt(i).toLowerCase();
    if (cipher[character]) {
      const randomIndex = Math.floor(Math.random() * cipher[character].length);
      cipherText += cipher[character][randomIndex];
    } else {
      cipherText += character;
    }
  }

  document.getElementById('cipher-text').value = cipherText;
}

function decrypt() {
  updateCipher();
  const cipherText = document.getElementById('cipher-text').value;
  let plainText = '';

  for (let i = 0; i < cipherText.length; i++) {
    let found = false;
    for (const [key, value] of Object.entries(cipher)) {
      if (value.includes(cipherText.charAt(i))) {
        plainText += key;
        found = true;
        break;
      }
    }
    if (!found) {
      plainText += cipherText.charAt(i);
    }
  }

  document.getElementById('plain-text').value = plainText;
}