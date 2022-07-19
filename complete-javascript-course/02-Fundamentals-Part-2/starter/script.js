// // 32. Activating Strict Mode
// // 32. Activating Strict Mode
// // 32. Activating Strict Mode
"use strict";
// // strict mode 는 우리가 무언갈 하는 것을 금지하고, 에   러를 명시적으로 보여준다
// //
// let hasDriversLicense = false;
// const passTest = true;

// if (passTest) hasDriversLicense = true;
// if (hasDriversLicense) console.log("I cna drive :D");

// // 어떤 것들은 변수명으로 이용할 수 없게한다. 미래에 내장 클래스명이 될 만한 것이라든가..
// // const interface = "Audio";
// // const private = 534;

// // 33. Functions
// // 33. Functions
// // 33. Functions

// function logger() {
//   console.log("My name is JINYOUNG");
// }

// logger();
// logger();
// logger();

// function fruitProcessor(apples, oranges) {
//   console.log(apples, oranges);
//   const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
//   return juice;
// }

// const appleJuice = fruitProcessor(5, 0);
// console.log(appleJuice);
// const appleOrangeJuice = fruitProcessor(2, 4);
// console.log(appleOrangeJuice);
// // console.log()또한 함수이다. 빌트 인 함수.
// // Number() 또한..

// // 34. Function Declarations vs Expressions
// // 34. Function Declarations vs Expressions
// // 34. Function Declarations vs Expressions

// // declarations는 함수를 정의하기전에 호출할 수 있다. expressions는 안됨.(호이스팅에서 다시 배우자)
// const age1 = calcAge1(1994);
// function calcAge1(birthYear) {
//   return 2021 - birthYear;
// }
// console.log(age1);

// // calcAge2의 = 뒷부분은 익명함수인데, 논리적 순서는 1. 익명함수를 만든다 2. 그것의 이름을 calcAge2로 정한다
// // 모든 익명함수 부분은 기본적으로 expressions 이다.
// const calcAge2 = function (birthYear) {
//   return 2021 - birthYear;
// };
// // 이제와 설명하는 것인데, 사실 function이라는 덩어라 자체는 그저 value일 뿐이다. 그렇기 때문에 변수에다가 함수를 넣을 수 있는 것이겠지요? 나중에 깊게 팔 때에 이걸 알고 있는게 도움이 된다고 하는데 지금은 그러려니하라네
// const age2 = calcAge2(1994);
// console.log(age1, age2);

// // 결론. declarations 와 expressions는 취향차이로 알아서 쓰면 되는데 조나스는 순서를 못뒤집게하는 expressions를 쓰는게 코드유지보수에 좋다고 한다. declarations를 옹호하는 사람도 많다니까 절대적으로 이쪽이 코드 컨벤션에 압도적이다 그런건 아닌듯

// // 35. Arrow Functions
// // 35. Arrow Functions
// // 35. Arrow Functions

// //arrow function 은 function expression의 스페셜 폼이다(더 짧음) 함수 선언vs 함수표현, 화살표함
// const calcAge3 = (birthYear) => 2021 - birthYear;
// const age3 = calcAge3(1994);
// console.log(age3);
// // arrow function에서 여러줄을 입력해야한다면 기존의 함수와 같이 {}를 이용해야한다. 한줄의 경우에만 없어도 되도록 특혜를 준 것이다. ㅗㅜㅗㅜ

// const yearUntilRerirement = (birthYear, firstName) => {
//   const age = 2021 - birthYear;
//   const retirement = 65 - age;
//   return `${firstName} retires in ${retirement} years`;
// };

// console.log(yearUntilRerirement(1994, `Jinyoung`));
// console.log(yearUntilRerirement(1999, `Sohye`));

// // 36. Functions Calling Other Functions
// // 36. Functions Calling Other Functions
// // 36. Functions Calling Other Functions

// function cutFruitPieces(fruit) {
//   return fruit * 4;
// }

// function fruitProcessor(apples, oranges) {
//   const applePieces = cutFruitPieces(apples);
//   const orangePieces = cutFruitPieces(oranges);

//   const juice = `Juice with ${applePieces} pieces of apples and ${orangePieces} pieces of oranges.`;
//   return juice;
// }

// console.log(fruitProcessor(2, 3));

// // 37. Reviewing Functions
// // 37. Reviewing Functions
// // 37. Reviewing Functions

// // 너무 잘 알겠어서 스킵함 ㅎㅎ;

// // 39. Introduction to Arrays
// // 39. Introduction to Arrays
// // 39. Introduction to Arrays
// const friend1 = "Michael";
// const friend2 = "Steven";
// const friend3 = "Peter";

// const friends = ["Michael", "Steven", "Peter"];
// console.log(friends);

// const y = new Array(1991, 1984, 2008, 2020); // Array 함수를 통해 array를 만드는 법이 있는데 new가 없으면 작동안함
// // literal syntax라는데 나중에 배울듯 그냥 괄호로 만드는 것보다 유용하다네

// console.log(friends[0]);
// console.log(friends[2]);

// console.log(friends.length);
// console.log(friends[friends.length - 1]);

// friends[2] = "Jay";
// console.log(friends);
// // friends = ['Bob', 'Alice']

// const firstName = "Jonas";
// const jonas = [firstName, "Schmedtmann", 2037 - 1991, "teacher", friends];
// console.log(jonas);
// console.log(jonas.length);

// // Exercise
// const calcAge = function (birthYeah) {
//   return 2037 - birthYeah;
// };
// const years = [1990, 1967, 2002, 2010, 2018];

// const age1 = calcAge(years[0]);
// const age2 = calcAge(years[1]);
// const age3 = calcAge(years[years.length - 1]);
// console.log(age1, age2, age3);

// const ages = [
//   calcAge(years[0]),
//   calcAge(years[1]),
//   calcAge(years[years.length - 1]),
// ];
// console.log(ages);

// // 40. Basic Array Operations(Methods)
// // 40. Basic Array Operations(Methods)
// // 40. Basic Array Operations(Methods)
// const friends = ["Michael", "Steven", "Peter"];
// const newLength = friends.push("Jay"); // 이거만으로 friends 원본에 추가됨
// console.log(friends);
// console.log(newLength);

// friends.unshift("John");
// console.log(friends);

// // argument가 필요 없다. 왜냐하면 필요없으니까.
// // 마지막거 뽑아내는거 확정인 함수
// friends.pop(); // bye "Jay"
// const popped = friends.pop(); // bye too "Peter"
// console.log(popped); // Peter
// console.log(friends); // (3) ["John", "Michael", "Steven"]

// // .pop이랑 다르게 처음꺼 뽑음
// friends.shift();
// const shifted = friends.shift();
// console.log(shifted);
// console.log(friends);

// // element의 index 혹은, 존재여부를 알려줌.(없는 element를 찾을 때엔 -1 return)
// console.log(friends.indexOf("Steven"));
// console.log(friends.indexOf("Bob"));

// friends.push(23);
// console.log(friends.includes("Steven"));
// console.log(friends.includes("Bob"));
// console.log(friends.includes(23));

// if (friends.includes("Steven")) {
//   console.log("You have a friend called Steven");
// }

// // 42. Introduction to Objects
// // 42. Introduction to Objects
// // 42. Introduction to Objects

// const jinyoung = {
//   firstName: "Jinyoung",
//   lastName: "Kim",
//   age: 2021 - 1994,
//   job: "",
//   friends: ["Yeri", "Sohye", "Winter"],
// }; // properties and values

// // 43. Dot vs. Bracket Notation
// // 43. Dot vs. Bracket Notation
// // 43. Dot vs. Bracket Notation
// const jinyoung = {
//   firstName: "Jinyoung",
//   lastName: "Kim",
//   age: 2021 - 1994,
//   job: "",
//   friends: ["Yeri", "Sohye", "Winter"],
// };
// console.log(jinyoung);

// console.log(jinyoung.lastName); // .notation
// console.log(jinyoung["lastName"]); // []notation

// // [] notation으로 할 수 있는 것. 괄호 안에 아무 expression이든 넣어도 된다. notation은 어림도없음 프로퍼티 네임 그대로 적어야댐
// // 당연히 .을 많이 씀 간단하고 뭐 특별한 경우는 특별한 경우다. 잘 없음
// const nameKey = "Name";
// console.log(jinyoung["first" + nameKey]);
// console.log(jinyoung["last" + nameKey]);

// const interestedIn = prompt(
//   "What do you want to know about Jinyoung? Choose between firstName, lastName, age, job, and friends."
// );

// if (jinyoung[interestedIn]) {
//   console.log(jinyoung[interestedIn]);
// } else {
//   console.log(`Wrong request. Choose right thing.`);
// }

// jinyoung.location = "Daegu";
// jinyoung["instagram"] = `@GeneYoung`;
// console.log(jinyoung);

// // 44. Object Methods
// // 44. Object Methods
// // 44. Object Methods
// const jinyoung = {
//   firstName: "Jinyoung",
//   lastName: "Kim",
//   birthYear: 1994,
//   job: "",
//   friends: ["Yeri", "Sohye", "Winter"],
//   hasDriversLicense: true,
//   // calcAge: function () {
//   //   console.log(this); // method가 자신이 속한 object의 property를 argument로서 갖다쓰는법: this
//   //   // 여기서 this란 jinyoung object를 가르키는 것이다.
//   //   return 2021 - this.birthYear;
//   // }, // object properties에 function 끼우기
//   // // 이걸 우리는 method라고 부르기로 했어요.

//   calcAge: function () {
//     this.age = 2021 - this.birthYear; // this를 통해 새로운 property를 만들 수도 있습니당.
//     return this.age;
//   },
// };

// console.log(jinyoung.calcAge()); // dot notation으로 method 갖다쓰기
// console.log(jinyoung["calcAge"]()); // bracket notation으로 method 갖다쓰기
// console.log(jinyoung.age);

// // 개인 심화학습
// const hahahoho = {
//   apple: "fruit",
//   hohohaha: {
//     apple: "computer",
//     whatIsApple: function () {
//       console.log(this.apple);
//     },
//   },
// };
// hahahoho.hohohaha.whatIsApple();

// // 46. Iteration: The for Loop
// // 46. Iteration: The for Loop
// // 46. Iteration: The for Loop

// // console.log(`Lifting weights repetition 1🏋️‍♂️`);
// // console.log(`Lifting weights repetition 2🏋️‍♂️`);
// // console.log(`Lifting weights repetition 3🏋️‍♂️`);
// // console.log(`Lifting weights repetition 4🏋️‍♂️`);
// // console.log(`Lifting weights repetition 5🏋️‍♂️`);
// // console.log(`Lifting weights repetition 6🏋️‍♂️`);
// // console.log(`Lifting weights repetition 7🏋️‍♂️`);
// // console.log(`Lifting weights repetition 8🏋️‍♂️`);
// // console.log(`Lifting weights repetition 9🏋️‍♂️`);
// // console.log(`Lifting weights repetition 10🏋️‍♂️`);
// // console.log(`fuck`);

// // 반복문에는 세가지가 필요하다
// // 1. 반복의 시작값
// // 반복문을 제어하는 부분을 rep이라고 하자
// // 이번엔 아예 변수명을 rep으로 만들고 let으로 선언한다(값이 바뀔 것이니까 const는 안된다)

// // 2. logical condition
// // 이 부분이 참이라면 반복문은 계속된다

// // 3. 돌아가게 하는 구간. 카운터를 키워서 logical condition의 끝을 향해가도록 하자

// for (let rep = 1; rep <= 10; rep++) {
//   console.log(`Lifting weights repetition ${rep}🏋️‍♂️`);
// }

// // 47. Looping Arrays, Breaking and Continuing
// // 47. Looping Arrays, Breaking and Continuing
// // 47. Looping Arrays, Breaking and Continuing
// const jonas = [
//   "Jonas",
//   "Schmedtmann",
//   2037 - 1991,
//   "teacher",
//   ["Michael", "Peter", "Steven"],
//   true,
// ];
// const types = [];

// // console.log(jonas[0])
// // console.log(jonas[1])
// // ...
// // console.log(jonas[4])
// // jonas[5] does NOT exist

// for (let i = 0; i < jonas.length; i++) {
//   // Reading from jonas array
//   console.log(jonas[i], typeof jonas[i]);

//   // Filling types array
//   // types[i] = typeof jonas[i];
//   types.push(typeof jonas[i]);
// }

// console.log(types);

// const years = [1991, 2007, 1969, 2020];
// const ages = [];

// for (let i = 0; i < years.length; i++) {
//   ages.push(2037 - years[i]);
// }
// console.log(ages);

// // continue and break
// console.log("--- ONLY STRINGS ---");
// for (let i = 0; i < jonas.length; i++) {
//   if (typeof jonas[i] !== "string") continue;

//   console.log(jonas[i], typeof jonas[i]);
// }

// console.log("--- BREAK WITH NUMBER ---");
// for (let i = 0; i < jonas.length; i++) {
//   if (typeof jonas[i] === "number") break;

//   console.log(jonas[i], typeof jonas[i]);
// }

// // 48. Looping Backwards and Loops in Loops
// // 48. Looping Backwards and Loops in Loops
// // 48. Looping Backwards and Loops in Loops
// const jonas = [
//   "Jonas",
//   "Schmedtmann",
//   2037 - 1991,
//   "teacher",
//   ["Michael", "Peter", "Steven"],
//   true,
// ];

// // 0, 1, ..., 4
// // 4, 3, ..., 0

// for (let i = jonas.length - 1; i >= 0; i--) {
//   console.log(i, jonas[i]);
// }

// for (let exercise = 1; exercise < 4; exercise++) {
//   console.log(`-------- Starting exercise ${exercise}`);

//   for (let rep = 1; rep < 6; rep++) {
//     console.log(`Exercise ${exercise}: Lifting weight repetition ${rep} 🏋️‍♀️`);
//   }
// }

// // 49. The while Loop
// // 49. The while Loop
// // 49. The while Loop

// for (let rep = 1; rep <= 10; rep++) {
//   console.log(`Lifting weights repetition ${rep}🏋️‍♂️`);
// }

// let rep = 1;
// while (rep <= 10) {
//   console.log(`Lifting weights repetition ${rep}🏋️‍♂️`);
//   rep++;
// }

// // let dice = Math.trunc(Math.random() * 6) + 1;

// // while (dice !== 6) {
// //   console.log(`You rolled a ${dice}`);
// //   dice = Math.trunc(Math.random() * 6) + 1;
// //   if (dice === 6) console.log('Loop is about to end...');
// // }
