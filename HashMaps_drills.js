const HashMap = require('./hashMap');

function main() {
  const lotr = new HashMap();
  lotr.MAX_LOAD_RATIO = .5;
  lotr.SIZE_RATIO = 3;
  
  lotr.set("Hobbit", "Bilbo");
  lotr.set("Hobbit", "Frodo");
  lotr.set("Wizard", "Gandalf");
  lotr.set("Human", "Aragorn");
  lotr.set("Elf", "Legolas");
  lotr.set("Maiar", "The Necromancer");
  lotr.set("Maiar", "Sauron");
  lotr.set("RingBearer", "Gollum");
  lotr.set("LadyOfLight", "Galadriel");
  lotr.set("HalfElven", "Arwen");
  lotr.set("Ent", "Treebeard");

  console.log('LOTR', lotr)//length is 9, there are collisions under Hobbit and Maiar
  console.log(lotr.get('Maiar')) // Sauron nothing to resolve collisions
  console.log(lotr.get('Hobbit')) // Frodo nothing to resolve collisions
  console.log(lotr._capacity); // 24, since we exceed the initial length of 8 we must multiply by size ratio to accomodate, 8 x 3. 
}

//intentially makes a collision and will overwrite previous data values on any duplicate keys the function finds.
const WhatDoesThisDo = function(){
  let str1 = 'Hello World.'; 
  let str2 = 'Hello World.';
  let map1 = new HashMap(); 
  map1.set(str1,10); // -> key: 'Hello World.', value: 10
  map1.set(str2,20); // -> (keys are the same) value: 20 
  let map2 = new HashMap();
  let str3 = str1; 
  let str4 = str2; 
  map2.set(str3,20); // key: 'Hello World.', value: 20
  map2.set(str4,10); // value: 10

  console.log(map1.get(str1));
  console.log(map2.get(str3));
}

WhatDoesThisDo();
main();

// Hash Map Understanding
/* PROBLEM 1 (INSERT KEYS W/ LENGTH 11, OPEN ADDRESSING): [10, 22, 31, NULL, NULL, 4, 15, 27, 17, 88, 59] => COLLISIONS WILL GO TO EMPTY SLOT */
/* PROBLEM 2 (INSERT KEYS W/ LENGTH 9, SEPARATE CHAINING):  [null, [28, 19, 10], 20, 12, null, 5, [15, 33], null, 17] => COLLISIONS IN LINKED LIST */

//Remove Duplicates
function removeDuplicates(string) {
  // create a new map class to hold key/value pairs
  const map = new Map();

  // declare new var for string output 
  let newString = "";

  /* split string parameter by indiv. character, loop through each character in string in map. if map already has letter, skip.
  if map does not, add it to the map and as part of the newString output variable. */
  string.split("").forEach(letter => {
      if (!map.has(letter)) {
          map.set(letter, "");
          newString += letter;
      }
  });
  return newString;
}

console.log(removeDuplicates("moogles are very cute when they wear goggles."));
console.log(removeDuplicates("milk and cookies are for mice."));
console.log(removeDuplicates("the quick brown fox jumps over the fence."));

//Palindrome Permutation
function palindromes(string) {
  // init hash map 
  const palinMap = new HashMap();

  let total = 0;

  // loop through each character in the string. get each duplicate character, add a value for how many times they appear. 
  // otherwise, get the character and attribute a value of "1".
  for (let i = 0; i < string.length; i++) {
      let character = string[i];

      try {
          let value = palinMap.get(character);
          value++;
          palinMap.set(character,value);
      }
      catch(error) {
          palinMap.set(character, 1);
      }
  }

  // loop through to check for palindromes, return true/false based on condition.
  for (let i = 0; i < string.length; i++) {
      let checker = palinMap.get(string[i]);

      if (checker === 1) {
          total++
      }
  }

  if (total > 1) {
      return false;
  }
  return true;
}

console.log(palindromes("acecarr"));
console.log(palindromes('north'));

//Anagram Grouping
function anagram(array) {
 // make new map
 let words = new Map();

 // loop through array. split array by character, sort them, and then join them to get all anagrams. 
 // if hash map does not have any of the current anagrams, set the key value pair. otherwise, get the words and push into array.
 for (let i = 0; i < array.length; i++) {
     let current = array[i].split('').sort().join('');

     if (!words.has(current)) {
         words.set(current, [array[i]]);
     }
     else {
         words.get(current).push(array[i]);
     }
 }

 // get all values from words map, return them as an array with the data.
 const values = words.values();
 return Array.from(values);
}

console.log(anagram(['east','cars', 'acre', 'arcs', 'teas', 'eats', 'race']));

HashMapChain.MAX_LOAD_RATIO = 0.5;
HashMapChain.SIZE_RATIO = 3; 

//Separate Chaining
function separateChain() {
  const lotr = new HashMapChain;

  const middleEarth = [
      { 'Hobbit': 'Bilbo' }, 
      { 'Hobbit': 'Frodo' },
      { 'Wizard': 'Gandolf' }, 
      { 'Human': 'Aragon' }, 
      { 'Elf': 'Legolas' }, 
      { 'Maiar': 'The Necromancer' },
      { 'Maiar': 'Sauron' }, 
      { 'RingBearer': 'Gollum' }, 
      { 'LadyOfLight': 'Galadriel' }, 
      { 'HalfElven': 'Arwen' },
      { 'Ent': 'Treebeard' }
  ];

  middleEarth.forEach(obj => {
      const key = Object.keys(obj)[0];
      lotr.set(key, obj[key]);
  });

  console.log("LOTR", lotr); // structure is displaying correct, but specific data valeus not showing
}

separateChain();