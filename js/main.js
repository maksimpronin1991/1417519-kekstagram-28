// eslint-disable-next-line no-unused-vars
const checkStringLength = (string,maxLength) => string.length <= maxLength;

// eslint-disable-next-line no-unused-vars
const checkPalindrome = (string) => {
  const lowerString = string.toLowerCase().replaceAll(' ','');
  let reversedString = '';
  for(let i = lowerString.length - 1 ; i >= 0 ; i--){
    reversedString += lowerString[i];
  }
  return lowerString === reversedString;
};


// eslint-disable-next-line no-unused-vars
const returnNumber = (string) => {
  let result = '';
  for(let i = 0; i < string.length; i ++){
    if(!Number.isNaN(parseInt(string[i],10))){
      result += string[i];
    }
  }
  return parseInt(result,10);
};

// eslint-disable-next-line no-unused-vars
const padStrig = (string,minLength,addition) => {
  const freePlace = minLength - string.length;

  if(freePlace <= 0){
    return string;
  }
  return addition.slice(0 , freePlace % addition.length) + addition.repeat(freePlace / addition.length) + string;
};
