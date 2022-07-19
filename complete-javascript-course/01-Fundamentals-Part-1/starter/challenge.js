// // Coding Challenge #1

// // Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula: BMI = mass / height ** 2 = mass / (height * height). (mass in kg and height in meter).
// // 1. Store Mark's and John's mass and height in variables
// // 2. Calculate both their BMIs using the formula (you can even implement both versions)
// // 3. Create a boolean variable 'markHigherBMI' containing information about whether Mark has a higher BMI than John.
// // TEST DATA 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
// // TEST DATA 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall.
// const massMark = 78;
// const heightMark = 1.69;
// const massJohn = 92;
// const heightJohn = 1.95;

// const bmiMark = massMark / heightMark ** 2;
// const bmiJohn = massJohn / heightJohn ** 2;
// const markHigherBMI = bmiMark > bmiJohn;

// console.log(bmiJohn, bmiMark, markHigherBMI);

// // Coding Challenge #2

// // Use the BMI example from Challenge #1, and the code you already wrote, and improve it:
// // 1. Print a nice output to the console, saying who has the higher BMI. The message can be either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
// // 2. Use a template literal to include the BMI values in the outputs. Example: "Mark's BMI (28.3) is higher than John's (23.9)!"
// // HINT: Use an if/else statement 😉
// if (markHigherBMI) {
//   console.log(
//     `Mark's BMI(${bmiMark}) is ${
//       bmiMark - bmiJohn
//     } higher than John's(${bmiJohn})!`
//   );
// } else {
//   console.log(`John's BMI(${bmiJohn}) is higher than Mark's(${bmiMark})`);
// }

// // Coding Challenge #3

// // There are two gymnastics teams, Dolphins and Koalas. They compete against each other 3 times. The winner with the highest average score wins a trophy!
// // Your tasks:
// // 1. Calculate the average score for each team, using the test data below
// // 2. Compare the team's average scores to determine the winner of the competition, and print it to the console. Don't forget that there can be a draw, so test for that as well (draw means they have the same average score)
// // 3. Bonus 1: Include a requirement for a minimum score of 100. With this rule, a team only wins if it has a higher score than the other team, and the same time a score of at least 100 points. Hint: Use a logical operator to test for minimum score, as well as multiple else-if blocks 😀
// // 4. Bonus 2: Minimum score also applies to a draw! So a draw only happens when both teams have the same score and both have a score greater or equal 100 points. Otherwise, no team wins the trophy
// // Test data:
// // § Data 1: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
// // § Data Bonus 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
// // § Data Bonus 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106
// // GOOD LUCK 😀
// function CalculatorD(first, second, third) {
//   return (first + second + third) / 3;
// }
// function CalculatorK(first, second, third) {
//   return (first + second + third) / 3;
// }

// const averageScoreD = CalculatorD(97, 112, 101);
// console.log(averageScoreD);
// const averageScoreK = CalculatorK(109, 95, 106);
// console.log(averageScoreK);
// if (averageScoreD > averageScoreK && averageScoreD >= 100) {
//   console.log(`Dolphins wins the trophy!`);
// } else if (averageScoreD < averageScoreK && averageScoreK >= 100) {
//   console.log(`Koalas wins the trophy!`);
// } else if (averageScoreD === averageScoreK && averageScoreK >= 100) {
//   console.log(`Draw! Both teams win trophies!`);
// } else {
//   console.log("Draw! Neither team gets a trophy.");
// }

// Coding Challenge #4
// Steven wants to build a very simple tip calculator for whenever he goes eating in a restaurant. In his country, it's usual to tip 15% if the bill value is between 50 and 300. If the value is different, the tip is 20%.
// Your tasks:
// 1. Calculate the tip, depending on the bill value. Create a variable called 'tip' for this. It's not allowed to use an if/else statement 😀 (If it's easier for you, you can start with an if/else statement, and then try to convert it to a ternary operator!)
// 2. Print a string to the console containing the bill value, the tip, and the final value (bill + tip). Example: “The bill was 275, the tip was 41.25, and the total value 316.25”
// Test data:
// § Data 1: Test for bill values 275, 40 and 430
// Hints:
// § To calculate 20% of a value, simply multiply it by 20/100 = 0.2
// § Value X is between 50 and 300, if it's >= 50 && <= 300 😀
// GOOD LUCK 😀

const bill = 275;

const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

console.log(
  `The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`
);
