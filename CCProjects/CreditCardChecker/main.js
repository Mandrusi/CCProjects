// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:
const validateCred = arr => {
  // Last digit (check Digit)
  let evenOrOdd = -1;
  let modifiedArray = [...arr];
  let sum = modifiedArray[modifiedArray.length - 1]; // start with checkvalue

  // start at rightmost digit and iterate left
  // Double every other value
  if (modifiedArray.length - 1 % 2 === 0 ) {
    evenOrOdd = 0;
  }
  else {
    evenOrOdd = 1;
  }
  for (let i = arr.length - 2; i>= 0; i--){
    if ( evenOrOdd === 0 && i % 2 === 0){
      modifiedArray[i] *= 2;
      // If number after double is > 9 subtract 9
      if (modifiedArray[i] > 9){
        modifiedArray[i] -= 9;
      }
    }
    if (evenOrOdd === 1 && i % 2 === 1){
      modifiedArray[i] *= 2;
      // If number after double is > 9 subtract 9
      if (modifiedArray[i] > 9){
        modifiedArray[i] -= 9;
      }
    }
    sum += modifiedArray[i];
  }
  // Sum all digits in the number
  //console.log(sum);
  // If sum modulo 10 is zero number is valid
  return sum % 10 === 0;
}

const findInvalidCards = (cardNums) => {
  return cardNums.filter((arr) => !validateCred(arr));
}
const idInvalidCardCompanies = (nestedArray) => {
  let result = []
  // we need to check the first digit of each card
  // if it's not in the array of companies we need to add it
  // so we could just do this with if / else
  for( let i = 0; i < nestedArray.length; i++){
    // iterate through the first digit of each array
    if (nestedArray[i][0] === 3){
      if (result.indexOf('Amex') === -1){
        result.push('Amex');


      }
    }
   else if (nestedArray[i][0] === 4){
      if (result.indexOf('Visa') === -1){
        result.push('Visa');
  }

    }
  else if (nestedArray[i][0] === 5){
      if (result.indexOf('Mastercard') === -1){
        result.push('Mastercard');
  }
}
else if (nestedArray[i][0] === 6){
      if (result.indexOf('Discover') === -1){
        result.push('Discover');
      }
}
else {
  result.push('Company not found!');
}
  }
  return result;
}

//console.log(validateCred(valid3));
console.log(findInvalidCards(batch));
console.log(idInvalidCardCompanies(batch));




