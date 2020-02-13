# What the Hex!? (Or... How to generate random hexidecimal color codes in JavaScript) 

For my most recent [Flatiron School project](https://thecodepixi.github.io/Quote-Machine/), I wanted to be able to programmatically change the background color of one of the elements on the page, at random. What I needed was a reusable function that I could call `onclick` of various elements on the page. Here are two ways I found to make this happen: 

First, I knew I didn't want to have to store a bunch of set colors anywhere. It would be tedious to maintain an array or object filled with set color codes, *and* I wanted the color selection to be truly random. I decided on using hexidecimal color codes because they are relatively short, and the data needed to comprise them (numbers 0-9, and letters a-f) wouldn't take up too much space. This is how I came up with my initial (somewhat "lazy") solution. 

First, we create an array of all possible hexidecimal digits: 
``` js 
const digits = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']
```

Then, we need to setup our base hex code string: 
```js
let hexCode = "#" 
```
We set up a string with the hash/octothorp ready to go, so we can just append the digits to the string. 

Then, we need to choose a hexidecimal digit from the array, at random. To do that we use `Math.round()`, and `Math.random()` to get a randomly selected index of the array. Once we have that digit, we append it onto our hexCode string until the string is 7 characters long (6 digits + the hash/octothorp), since hex color codes are 6 digits long:
```js
while( hexCode.length < 7 ){
  hexCode += digits[ Math.round( Math.random() * digits.length ) ]
}
```
We multiply `Math.random()` by `digits.length` (or the number of items in the `digits` array) because the `Math.random()` function returns a float between 0 and 1. By multiplying that number by the number of items in `digits`, we ensure that we'll always get a float that is anywhere between 0 and the total number of items in the array. We wrap this function in `Math.round()` to round the returned float to the nearest whole number, which makes the total number inclusive of 0 and the total length of the array. We then use this random whole number as the index to select in the `digits` array. 

Once we've done this, we just need to `return hexCode`, and our final function looks like this: 
```js 
function generateRandomHexCode(){
  const digits = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']

  let hexCode = "#" 

  while( hexCode.length < 7 ){
    hexCode += digits[ Math.round( Math.random() * digits.length ) ]
  }

  return hexCode 
}
```
Here are some sample outputs of this function: 
```js
> generateRandomHexCode()
'#fd88d4'
> generateRandomHexCode()
'#349cba'
> generateRandomHexCode()
'#43a29e'
> generateRandomHexCode()
'#1a1d94'
```

This works exactly as we need! But after coming up with this solution, I still wondered if there was a more **programmatic** way to generate a hexidecimal digit, and it turns out **there is**! 

First, let's talk about how **hexidecimal** (or *base 16*) digits work. A hexidecimal digit includes decimal numbers 0-9, and the letters a-f. These correspond to the **decimal** (or *base 10*) digits 0-15. Here's a quick chart: 
| Decimal (Base 10) | Hexidecimal (Base 16) |
|-------------------|-----------------------|
| 0 | 0 |
| 1 | 1 |
| 2 | 2 |
| 3 | 3 |
| 4 | 4 |
| 5 | 5 |
| 6 | 6 |
| 7 | 7 |
| 8 | 8 |
| 9 | 9 |
| 10 | a |
| 11 | b |
| 12 | c |
| 13 | d |
| 14 | e |
| 15 | f |

So, if we can find a way to convert a decimal to another number base, all we need to do is generate a random number from 0-15 and convert it to base 16. In JavaScript, we can quickly and easily convert a number to another number base using the `.toString()` method, and passing in the base digit.  

For example, we can convert numbers to binary using `.toString(2)`
```js
  > (10).toString(2)
  '1010'

  // if you do not pass the number to `.toString()` inside of parantheses you will get a syntax error 
```

Let's see what happens when we try this with a few decimal numbers, converted to base 16: 
```js
> (0).toString(16)
  '0'
  > (11).toString(16)
  'b'
  > (5).toString(16)
  '5'
  > (15).toString(16)
  'f'
```

**Perfect!** That's exactly what we expected, and what we need! 

Using this knowledge we can convert our hex code randomizing function as follows: 
```js 
  function generateRandomHexCode() {
    let hexCode = "#" 

    while ( hexCode.length < 7 ) {
      hexCode += (Math.round(Math.random() * 15)).toString(16) 
    }

    return hexCode 
  }
```

And here are a few of the resulting hex codes: 
```js 
  > generateRandomHexCode()
  '#d5758c'
  > generateRandomHexCode()
  '#26711b'
  > generateRandomHexCode()
  '#8deca6'
  > generateRandomHexCode()
  '#3df62c'
  > generateRandomHexCode()
  '#1a293a'
```

Excellent! 

You can see this code in action in the CodePen below (and on the aforementioned [project](https://thecodepixi.github.io/Quote-Machine/) )...  

CODEPEN

Let me know if there are *other* hex code generating methods you know of, and **definitely** let me know if you try this out in your own projects! 

xx Emily/@TheCodePixi 
