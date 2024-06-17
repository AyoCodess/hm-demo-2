import CryptoJS from "crypto-js";

export function encrypt(text: string, EK: string) {
  if (!EK) {
    throw new Error(
      "EK for encryption must be defined and be 32 characters long",
    );
  }

  try {
    // Generate a random initialization vector
    const iv = CryptoJS.lib.WordArray.random(128 / 8);

    // Encrypt the text
    const cipher = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(EK), {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // Concatenate the IV and the ciphertext, and convert to Base64
    const cipherText = CryptoJS.enc.Base64.stringify(
      iv.concat(cipher.ciphertext),
    );

    console.log("1", { cipherText });
    return cipherText;
  } catch (error) {
    console.error({ error });
    throw new Error("Failed to encrypt the text");
  }
}

export function decrypt(cipherText: string, EK: string) {
  if (!EK) {
    throw new Error(
      "EK for decryption must be defined and be 32 characters long",
    );
  }

  try {
    // Convert the Base64 cipher text to a WordArray
    const cipherParams = CryptoJS.enc.Base64.parse(cipherText);

    // Extract the IV and the ciphertext from the WordArray
    const iv = CryptoJS.lib.WordArray.create(cipherParams.words.slice(0, 4));
    const cipher = CryptoJS.lib.WordArray.create(
      cipherParams.words.slice(4),
      cipherParams.sigBytes - 16,
    );

    // Decrypt the ciphertext
    const decipher = CryptoJS.AES.decrypt(
      { ciphertext: cipher } as any,
      CryptoJS.enc.Utf8.parse(EK),
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      },
    );

    // Convert the decrypted text from bytes to UTF-8 and return it
    const decryptedText = CryptoJS.enc.Utf8.stringify(decipher);

    console.log("2", { decryptedText });
    return decryptedText;
  } catch (error) {
    console.error({ error });
    throw new Error("Failed to decrypt the text");
  }
}
