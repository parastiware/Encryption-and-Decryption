
var messageBoxEncrypt = document.getElementById("caesar-encryption-result");
var messageBoxDecryption = document.getElementById("caesar-decryption-result");
var encryptButton= document.getElementById("encrypt");
var decryptButton= document.getElementById("decrypt");

encryptButton.addEventListener('click',handleEncrypt);
decryptButton.addEventListener('click',handleDecrypt);

function handleEncrypt(event){
    event.preventDefault();
    var plainText = document.getElementById("plaintext").value;
var shift = document.getElementById("shift").value;
console.log(plainText);
console.log(shift);
var encryptedMessage = caesarEncrypt(plainText,shift);

messageBoxEncrypt.innerHTML= `<h3> Result:</h3><br><h4 class="text-bg-dark p-2">${encryptedMessage}</h4>`;;

}

function handleDecrypt(event){
    event.preventDefault();
var cipherText = document.getElementById("ciphertext").value;
var shift = document.getElementById("shift").value;
console.log(cipherText);
console.log(shift);
var decryptedMessage = caesarDecrypt(cipherText,shift);
messageBoxDecryption.innerHTML=`<h3> Result:</h3><br><h4 class="text-bg-dark p-2">${decryptedMessage}</h4>`;

}


// Function to encrypt a message using the Caesar Cipher
function caesarEncrypt(message, shift) {
    let encryptedMessage = '';
    for (let i = 0; i < message.length; i++) {
        let char = message[i];
        // Encrypt uppercase letters
        if(!isNaN(char))
        {
            encryptedMessage += char;
            continue;

        }

        let code = message.charCodeAt(i);
        if(32>=code || code>=126){
             encryptedMessage +=message[i];
                continue;
            }
        let newCode = code+(+shift);
        console.log("code: ",code);  
        console.log("newCode: ",newCode);  
        if(newCode>126)
            {
                newCode=newCode-126+31;
            }
        else if(newCode<32)
            {
                newCode= 127-newCode+31;
            }
         encryptedMessage += String.fromCharCode(newCode);
       
    }
    return encryptedMessage;
}

// Function to decrypt a message using the Caesar Cipher
function caesarDecrypt(encryptedMessage, shift) {
    // decryption using ceaser is similar to encryption just the shift is negative
    return caesarEncrypt(encryptedMessage, -(+shift));
}
