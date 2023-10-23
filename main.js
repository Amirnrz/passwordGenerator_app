// IMPORTS
import { passwordStrength } from 'check-password-strength'



// SELECTORS
const password = document.querySelector("#Password")
const strength = document.querySelector("#strength")
const passwordLength = document.querySelector("#length")
const lengthText = document.querySelector("#lengthText")

const includeSymbols = document.querySelector("#includeSymbols")
const includeNumbers = document.querySelector("#includeNumbers")
const generateBtn = document.querySelector("#generate")



// ARRAYS
const numbers = ['1','2','3','4','5','6','7','8','9','0']

const sybmols = ['!','@','#','$','%','^','&','*','(',')','_','-','{','}','[',']','?','/',]

const englishCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];



// UTILS OBJECT & METHODS
const utils = {
  generateRandomNum: (min,max) => Math.floor(Math.random() * (max - min + 1) + min),
  getCharsFromArr: (array,num) => {
    let chars = ''
    for(let i = 0; i < num; i++) {
      const randNumber = utils.generateRandomNum(0,array.length - 1)
      randNumber % 2 === 0 ? chars += array[randNumber] : chars += array[randNumber].toUpperCase()
    }
    return chars
  }
}



// FUNCTIONS

// Function: generate password!
function generatePass() {

  const isSymbolsIncluded = includeSymbols.checked;
  const isNumbersIncluded = includeNumbers.checked;
  const characterLengthWanted = passwordLength.value;

  let pass = ''

  if(isNumbersIncluded) {
    pass += utils.getCharsFromArr(numbers, utils.generateRandomNum(3, characterLengthWanted/3))
  }

  if(isSymbolsIncluded) {
    pass += utils.getCharsFromArr(sybmols, utils.generateRandomNum(3, characterLengthWanted/3))
  }

  pass += utils.getCharsFromArr(englishCharacters,characterLengthWanted - pass.length)

  password.value = pass.split('').sort(() => Math.random() - .5).join("")

  const passQuality = passwordStrength(pass,[
    {
      id: 0,
      value: "Too weak",
      minDiversity: 0,
      minLength: 8
    },
    {
      id: 1,
      value: "Weak",
      minDiversity: 2,
      minLength: 8
    },
    {
      id: 2,
      value: "Medium",
      minDiversity: 4,
      minLength: 12
    },
    {
      id: 3,
      value: "Strong",
      minDiversity: 4,
      minLength: 16
    }
  ])

  switch(passQuality.value) {
    case 'Too weak':
      strength.value = utils.generateRandomNum(0,10);
      break;
    case 'Weak':
      strength.value = utils.generateRandomNum(10,30);
      break;
    case 'Medium':
      strength.value = utils.generateRandomNum(30,74);
      break;
    case 'Strong':
      strength.value = utils.generateRandomNum(75,100);
      break;
  }

}

// Function: handle copy
function handleCopy(e) {
  if(e.currentTarget.value === '') return;
  const psToCopy = password.value
  navigator.clipboard.writeText(psToCopy)
  password.value = 'Copied!'
  setTimeout(() => {
    password.value = psToCopy
  },2000)
}



// EVENTS

// Event: password length change
passwordLength.addEventListener( "change", (e) => {
  const charactarLength = e.currentTarget.value
  lengthText.textContent = charactarLength
})

// Event: generatePassword
generateBtn.addEventListener("click", generatePass)

// Event: copy to clipboard
password.addEventListener("click", handleCopy)