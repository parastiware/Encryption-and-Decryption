var messageBoxEncryption = document.getElementById("monoalphabetic-encryption-result");
var messageBoxDecryption = document.getElementById("monoalphabetic-decryption-result");

var decryptButton = document.getElementById("decrypt");
var encryptButton = document.getElementById("encrypt");

decryptButton.addEventListener('click', handleDecrypt);
encryptButton.addEventListener('click', handleEncrypt);

function handleEncrypt(event) {
    event.preventDefault();
    var plainText = document.getElementById("plaintext").value;
    var encryptedMessage = monoalphabeticEncrypt(plainText, getKeyFromLocalStorage());
    messageBoxEncryption.innerHTML = `<h3> Result:</h3><br><h4 class="text-bg-dark p-2">${encryptedMessage}</h4>`;
}

function handleDecrypt(event) {
    event.preventDefault();
    var cipherText = document.getElementById("ciphertext").value;
    var decryptedMessage = monoalphabeticDecrypt(cipherText, getKeyFromLocalStorage());
    messageBoxDecryption.innerHTML = `<h3> Result:</h3><br><h4 class="text-bg-dark p-2">${decryptedMessage}</h4>`;
}

function saveKeyToLocalStorage(key) {
    localStorage.setItem('substitutionKey', JSON.stringify(key));
}

// Function to retrieve the key from local storage
function getKeyFromLocalStorage() {
    let key = localStorage.getItem('substitutionKey');
    if (!key) {
        key = createSubstitutionKey();
        saveKeyToLocalStorage(key);
    } else {
        key = JSON.parse(key);
    }
    return key;
}

// Function to create a monoalphabetic substitution key
function createSubstitutionKey() {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let shuffledAlphabet = alphabet.split('').sort(() => Math.random() - 0.5).join('');
    let key = {};
    for (let i = 0; i < alphabet.length; i++) {
        key[alphabet[i]] = shuffledAlphabet[i];
    }
    return key;
}

// Function to encrypt a message using the Monoalphabetic Cipher
function monoalphabeticEncrypt(message, substitutionKey) {
    let encryptedMessage = '';
    for (let i = 0; i < message.length; i++) {
        let char = message[i].toLowerCase();
        if (substitutionKey[char]) {
            // Preserve case of the original message
            encryptedMessage += message[i] === char ? substitutionKey[char] : substitutionKey[char].toUpperCase();
        } else {
            // Leave non-alphabetic characters unchanged
            encryptedMessage += message[i];
        }
    }
    return encryptedMessage;
}

// Function to decrypt a message using the Monoalphabetic Cipher
function monoalphabeticDecrypt(encryptedMessage, substitutionKey) {
    let decryptedMessage = '';
    let reverseKey = {};
    // Create a reverse key to decrypt the message
    for (let char in substitutionKey) {
        reverseKey[substitutionKey[char]] = char;
    }
    for (let i = 0; i < encryptedMessage.length; i++) {
        let char = encryptedMessage[i].toLowerCase();
        if (reverseKey[char]) {
            // Preserve case of the original message
            decryptedMessage += encryptedMessage[i] === char ? reverseKey[char] : reverseKey[char].toUpperCase();
        } else {
            // Leave non-alphabetic characters unchanged
            decryptedMessage += encryptedMessage[i];
        }
    }
    return decryptedMessage;

    
}
