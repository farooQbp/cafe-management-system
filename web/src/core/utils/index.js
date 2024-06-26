export const passwordEncrypt = (str) => {
    // Simple SHA-256 hashing function (not suitable for secure password storage)
    const crypto = window.crypto || window.msCrypto;
    if (!crypto) {
      console.error('Crypto API not supported.');
      return '';
    }
    
    const buffer = new TextEncoder('utf-8').encode(str);
    return crypto.subtle.digest('SHA-256', buffer)
      .then(hash => {
        let result = '';
        const view = new DataView(hash);
        for (let i = 0; i < view.byteLength; i += 4) {
          result += ('00000000' + view.getUint32(i).toString(16)).slice(-8);
        }
        return result;
      })
      .catch(error => console.error('Error hashing password:', error));
  };