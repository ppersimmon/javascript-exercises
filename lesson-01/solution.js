// Task 1

// for
for (let i = 1; i <= 10; i++) {
  console.log(i);
}

// while
let counter = 1;
while (counter <= 10) {
  console.log(counter);
  counter++;
}


// Task 2
const mixedArray = [
  10,
  "text",
  true,
  false,
  42n,
  Symbol("id"),
  1.5,
  "100",
  null,
  undefined
];

// for
for (let i = 0; i < mixedArray.length; i++) {
  console.log(typeof mixedArray[i]);
}

// while
let i = 0;
while (i < mixedArray.length) {
  console.log(typeof mixedArray[i]);
  i++;
}

// do while
let j = 0;
do {
  console.log(typeof mixedArray[j]);
  j++;
} while (j < mixedArray.length);

// forEach method
mixedArray.forEach(element => {
  console.log(typeof element);
});


// Task 3
const people = [
  { name: "Sam", age: 25, pets: ["cat"] },
  { name: "Bob", age: 17, pets: ["dog"] },
  { name: "Tom", age: 30, pets: ["parrot"] },
  { name: "Max", age: 21, pets: [] }
];

const peopleOver20 = people.filter(person => person.age > 20);
console.log(peopleOver20);


// Task 4
const updatedPeople = people.map(person => {
  return {
    ...person,
    pets: [...person.pets, "goldfish"]
  };
});

console.log(updatedPeople);


// Task 5
const filledArray = new Array(10).fill(42);

filledArray.splice(4, 0, "answer");
console.log(filledArray);

const foundWord = filledArray.find(item => item === "answer");
console.log(foundWord);


// Task 6
const book = {
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    year: 1890,
    genre: "Gothic Novel",
    isAvailable: true
};

// keys
console.log(Object.keys(book));

// values
console.log(Object.values(book));

// hasOwn
console.log(Object.hasOwn(book, "author"));
console.log(Object.hasOwn(book, "publisher"));
