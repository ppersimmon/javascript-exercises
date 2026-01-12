# JavaScript Lessons
This repository contains my JavaScript homework assignments.

## Lessons Overview

<details>
<summary><strong>Lesson 1: JavaScript Basics – Types, Arrays, and Loops</strong></summary> 

**Task 1**  
Write a program that prints the numbers from 1 to 10, using for and while loops. 

**Task 2**  
Create an array consisting of elements of different types (primitives) (number, string, boolean variable) with a length of 10 elements. Output their type using typeof to the console. Output by iterating over the array in various ways: forEach method, loops for, while and do while. 

**Task 3**  
Create an array of objects (example object {name: '', age: xx, pets: [cat, dog]}) and use the filter method to output everyone who is over 20 years old.

**Task 4**  
Use map to iterate over the array from the task above and add a pet to each one. Print the result to the console.

**Task 5**  
Create an array of 10 elements and fill it with the number 42 using the appropriate method. Using splice, insert the word "answer" into the 5th position. Using "find", find this word and output it to the console.

**Task 6**  
Create an object with multiple keys of your choice. Give examples of using keys, hasOwn, values.
</details>

<details>
<summary><strong>Lesson 2: JavaScript Basics – Functions, Recursion, and Classes</strong></summary> 

**Task 1**  
Create a function that accepts an object (e.g., {access-token: 'qwerty'}) upon initialization and adds it to every data structure passed to the returned function. Additionally, a count field must be added to the object. This field should increment by 1 on every call. 

**Task 2**  
You have an object. Call it in such a way that the name and age are specified (the specific values do not matter). Then, create a function that will do this permanently whenever it is called.

**Task 3** 
You have an object. Your task is to traverse the object recursively, find all the files, and return their names as an array.

**Task 4** 
Create a base Person object with name and phone properties and an introduce method. Then, create Student and Teacher objects that inherit properties and methods from Person. For the Student, add a course property and a study method; for the Teacher, add a subject property and a teach method. Implement this inheritance so that instances of Student and Teacher can access the introduce method from Person as well as their own specific methods, providing the solution in both ES5 (function constructors/prototypes) and ES6 (classes) formats.
</details>

<details>
<summary><strong>Lesson 3: Patterns, DOM</strong></summary> 

**Task 1**  
Implement a simple "Factory" design pattern that creates objects of different types (for example, Car and Bike).
These objects have ride() and stop() methods, the base class should be called Transport.

**Task 2**  
Write an application that implements displaying a list of characters from the Rick & Morty API and makes simple pagination. Get the list using fetch at: https://rickandmortyapi.com/api/character. Pagination is implemented with two buttons: Next and Prev. If you reach the first or last record, the corresponding button is blocked: addMessageButton.disabled = true; // Block button

The current page number is displayed in the middle. It is calculated from the value of the data.info.next field. If this field is undefined, display data.info.pages (this is the last page). While loading, display the first page. While waiting for the loading, write "Loading..." on the screen.
</details>

## Practice Overview
<details>
<summary><strong>Practice 1: Counter</strong></summary> 
Create a counter that changes color when the number is either negative or positive.