const CODE = '1234';

export const codeIn = (code) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (code == CODE) {
        resolve(code);
      } else {
        reject('The code is wrong.');
      }
    }, 1000);
  });
};
