function generateHexCode(){
  let randomHexCode = "#" 
  while( randomHexCode.length < 7 ) { 
     randomHexCode += (Math.floor(Math.random() * 15).toString(16) )
  }
  return randomHexCode 
}

/* hex codes in decimal range from 0-15, 
so we generate a random integer from 0-15 (roughly), 
and then convert to base-16 using .toString(16)
we then append each individual hex digit to the randomHexCode string. 
Once the array reaches 6 digits, we return it. */ 

document.addEventListener("DOMContentLoaded", () =>  {
// Event listener on color-square 
  let square = document.querySelector("#color-square")
  let hexText = document.querySelector("#hex-name")
  square.addEventListener("click", () => {
    let hex = generateHexCode()
    square.style.backgroundColor = hex 
    hexText.textContent = hex 
  })
})