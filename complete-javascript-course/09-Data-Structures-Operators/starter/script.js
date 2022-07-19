'use strict';

// 124 String Methods Practice
// 124 String Methods Practice
// 124 String Methods Practice
// 까먹을 쯤에 이걸로 복습을 해보자
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
// 이렇게 변환
// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

// 0. 4조각내기
// 1. 조각별 작업을 위해 for of 이용
// 2. 다시 조각마다 ; 기준으로 쪼갠후 디스트럭터링으로 조각별 처리

// 111. Enhanced Object Literals
// 111. Enhanced Object Literals
// 111. Enhanced Object Literals

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [`wed`]: {
    open: 12,
    close: 22,
  },
  [weekdays[3]]: {
    // 강의 순서상 세번째 Enhanced Object Literals, property name을 compute할 수 있다. []를 이용하면 expression을 써서 이름을 지정할 수 있단다.
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};
// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // 111. Enhanced Object Literals
  // openingHours: openingHours,
  openingHours, // ES6의 킹갓 object enhancement 첫번째;; 갖다쓸거 이름을 어차피 property name으로 쓰는 경우가 많은데 두번쓰기 귀찮단다; 프로그래머들 성격 개같은거 알아줘야한다. 근데 내가봐도 편해보임 ㅋㅋ

  // order: function (starterIndex, mainIndex) {
  //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  // },
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  }, // 이게 두번째 오우 쓋 아ㅋㅋㅋㅋㅋㅋㅋ 메소드를 이렇게 편하게 씀ㅋㅋㅋ 헷갈리면 옛날방식으로 쓰라는듯

  // // Destruncturing Objects
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    // 파라미터를 obj 덩어리로 지정했다면 개별 프로퍼티를 obj.time과 같은 형식으로 뽑아야했을 텐데
    // 위처럼 구조분해할당을 하면 바로 time을 뽑을 수 있다능;
    console.log(
      `Order received: ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your declicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },
  orderPizza(mainIngredient, ...otherIngredients) {
    console.log('mainIngredient: ' + mainIngredient);
    console.log('otherIngredients: ' + otherIngredients);
  },
};

// Coding Challenge #4
// Coding Challenge #4
// Coding Challenge #4
// jonas는 훨씬 깔끔하게 작성했다. 나중에 리팩토링을 시도해보고, 다시 jonas랑 비교해보자
// hint: destructuring, entries() 사용
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const TEXTAREA = document.querySelector('textarea');
const BUTTON = document.querySelector('button');

const convertor = function (e) {
  console.log(TEXTAREA.value);
  const INPUT = TEXTAREA.value;
  const TARGET = INPUT.split('\n');
  let done = [];
  let cnt = 0;
  for (const i of TARGET) {
    let notYet = i.trim().split('_');
    let UP = notYet[0][0].toLowerCase();
    let LOW = notYet[0].slice(1).toLowerCase();

    done.push(UP);
    done.push(LOW);
    for (let j = 1; j < notYet.length; j++) {
      let up = notYet[j][0].toUpperCase();
      let low = notYet[j].slice(1).toLowerCase();
      done.push(up);
      done.push(low);
    }
    cnt++;
    console.log(
      `${done.join('')}${' '.repeat(20 - done.join('').length)}${'✅'.repeat(
        cnt
      )}`
    );
    done = [];
  }
};

BUTTON.addEventListener('click', convertor);
// Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

// // The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

// THIS TEST DATA (pasted to textarea)
// underscore_case
//  first_name
// Some_Variable
// calculate_AGE
// delayed_departure

// SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
// underscoreCase      ✅
// firstName           ✅✅
// someVariable        ✅✅✅
// calculateAge        ✅✅✅✅
// delayedDeparture    ✅✅✅✅✅

// HINT 1: Remember which character defines a new line in the textarea 😉
// // HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
// // HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
// // HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

// Afterwards, test with your own test data!

// GOOD LUCK 😀

// // 120. Working With Strings - Part 1
// // 120. Working With Strings - Part 1
// // 120. Working With Strings - Part 1
// const airline = 'TAP Air Portugal';
// const plane = 'A320';
// // 인덱스 이용
// console.log(plane[2]); // 2
// console.log('B737'[0]); // B
// // 길이 구하기
// console.log(airline.length); // 16
// console.log('B737'.length); // 4
// // 인덱스 찾기
// console.log(airline.indexOf('r')); // 6
// console.log(airline.lastIndexOf('r')); // 10
// console.log(airline.indexOf('John Cena')); // -1
// // 쳐내기
// console.log(airline.slice(4)); // Air Portugal
// console.log(airline.slice(4, 7)); // Air
// console.log(airline.slice(-2)); // al
// console.log(airline.slice(1, -1)); // AP Air Portuga
// console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // Portugal

// const checkMiddleSeat = function (seat) {
//   // B and E are middle seats
//   const s = seat.slice(-1);
//   if (s === 'B' || s === 'E') console.log('You got the middle seat 😬');
//   else console.log('You got lucky 😎');
// };

// checkMiddleSeat('11B');
// checkMiddleSeat('23C');
// checkMiddleSeat('3E');

// console.log(new String('jonas')); // [String: 'jonas']
// console.log(typeof new String('jonas')); // object
// console.log(typeof new String('jonas').slice(1)); // string
// // 121. Working With Strings - Part 2
// // 121. Working With Strings - Part 2
// // 121. Working With Strings - Part 2

// const airline = 'TAP Air Portugal';

// console.log(airline.toLowerCase()); // tap air portugal
// console.log(airline.toUpperCase()); // TAP AIR PORTUGAL

// // Fix capitalization in name
// const passenger = 'jOnAS';

// const passengerLower = passenger.toLowerCase();
// const passengerCorrect =
//   passengerLower[0].toUpperCase() + passengerLower.slice(1);
// console.log(passengerCorrect); // Jonas

// // Comparing emails
// const email = 'hello@jonas.io';
// const loginEmail = '  Hello@Jonas.Io \n';

// const normalizedEmail = loginEmail.toLowerCase().trim();
// console.log(normalizedEmail); // hello@jonas.io
// console.log(email === normalizedEmail); // true

// // replacing
// const announcement =
//   'All passengers come to boarding door 23. Boarding door 23!';

// console.log(announcement.replace('door', 'gate')); // All passengers come to boarding gate 23. Boarding door 23!
// console.log(announcement.replaceAll('door', 'gate')); // All passengers come to boarding gate 23. Boarding gate 23!

// // Booleans
// const plane = 'Airbus A320neo';

// console.log(plane.includes('A320')); // true
// console.log(plane.includes('Boeing')); // false
// console.log(plane.startsWith('Airb')); // true

// // Practice exercise
// const checkBaggage = function (items) {
//   const baggage = items.toLowerCase();

//   if (baggage.includes('knife') || baggage.includes('gun')) {
//     console.log('You are NOT allowed on board');
//   } else {
//     console.log('Welcome aboard!');
//   }
// };

// checkBaggage('I have a laptop, some Food and a pocket Knife');
// checkBaggage('Socks and camera');
// checkBaggage('Got some snacks and a gun for protection');

// // 122. Working With Strings - Part 3
// // 122. Working With Strings - Part 3
// // 122. Working With Strings - Part 3

// // Split and join
// console.log('a+very+nice+string'.split('+'));
// console.log('Jonas Schmedtmann'.split(' '));

// const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');

// const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
// console.log(newName);

// const capitalizeName = function (name) {
//   const names = name.split(' ');
//   const namesUpper = [];

//   for (const n of names) {
//     // namesUpper.push(n[0].toUpperCase() + n.slice(1));
//     namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
//   }
//   console.log(namesUpper.join(' '));
// };

// capitalizeName('jessica ann smith davis');
// capitalizeName('jonas schmedtmann');

// // Padding
// const message = 'Go to gate 23!';
// console.log(message.padStart(20, '+').padEnd(30, '+'));
// console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));

// const maskCreditCard = function (number) {
//   const str = number + '';
//   const last = str.slice(-4);
//   return last.padStart(str.length, '*');
// };

// console.log(maskCreditCard(64637836));
// console.log(maskCreditCard(43378463864647384));
// console.log(maskCreditCard('334859493847755774747'));

// // Repeat
// const message2 = 'Bad waether... All Departues Delayed... ';
// console.log(message2.repeat(5));

// const planesInLine = function (n) {
//   console.log(`There are ${n} planes in line ${'🛩'.repeat(n)}`);
// };
// planesInLine(5);
// planesInLine(3);
// planesInLine(12);

// 116. Maps: Fundamentals
// 116. Maps: Fundamentals
// 116. Maps: Fundamentals
// map은 es6에서 새로나온 자료구조입니다. object처럼 키 밸류 쌍으로 이루어져 있지요.
// 차이는 map의 경우 string 뿐만 아니라 아무 타입이나 키로 쓸 수 있다는 것,
const rest = new Map();
rest.set('name', 'Classico Italiano'); // `.set()` 메소드로 추가 가능
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbonm, Portugal')); // Map { 'name' => 'Classico Italiano', 1 => 'Firenze, Italy', 2 => 'Lisbonm, Portugal' }
// `.set()`은 리턴하기도 한다.

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :('); // .set()은 체이닝도 가능하다. 순서대로 추가되는 방식으로

// .get()으로 해당 키의 value를 조회할 수 있다
console.log(rest.get('name')); // Classico Italiano
console.log(rest.get(true)); // We are open :D
console.log(rest.get(1)); // Firenze, Italy

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close'))); // 이런 것도 가능하다. 하지만 강의 설명하기에 좋은 예시지만 읽기 용이한 코드는 아니므로, 실전 코딩에서는 추천하지 않는다고

console.log(rest.has('categories')); // 해당 키가 포함되는지 여부를 조회
rest.delete(2); // 이건 감이오죠? 키 2인거 지움
// rest.clear() // 이건 rest에 여태 넣은걸 싹 다 비워버림
rest.set(document.querySelector('h1'), 'heading'); // 이게 진짜 유용하단다 실제로 콘솔에서 이 h1 키 눌러보면 브라우저에서 h1 선택되는게 보임
console.log(rest);
console.log(rest.size); // length 같은 역할. 키밸류쌍의 갯수를 써줌
rest.set([1, 2], 'Test');
console.log(rest.get([1, 2])); // undefined가 나온다. 챕8 마지막 강의에서 봤다. 위의 [1,2]랑 여기 [1,2]는 서로 다르다. 뭐가 다르냐? 메모리 위치가 다르다.
const arr = [1, 2];
rest.set(arr, 'Test');
console.log(rest.get(arr)); // primitive가 아닌건 이렇게 변수를 씁시다.
// // 114. Coding Challenge #2
// // 114. Coding Challenge #2
// // 114. Coding Challenge #2
// // Let's continue with our football betting app! Keep using the 'game' variable from before;
// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };
// // Your tasks:
// // 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
// let cnt = 1;
// for (const iterator of game.scored) {
//   console.log(`Goal ${cnt}: `, iterator);
//   cnt++;
// }
// // Jonas는 sored array에 `.entries()`를 써서 cnt같은건 안썼다.

// // 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
// let oddsSum = 0;
// let oddsNum = 0;
// for (const iterator of Object.values(game.odds)) {
//   oddsSum += iterator;
//   oddsNum++;
// }
// console.log(oddsSum / oddsNum);
// // 이것도 조나스는 oddsNum를 `.length()`로 처리했다.

// // 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
// //       Odd of victory Bayern Munich: 1.33
// //       Odd of draw: 3.25
// //       Odd of victory Borrussia Dortmund: 6.5
// // Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉
// for (const [team, odd] of Object.entries(game.odds)) {
//   console.log(
//     `Odd of ${game?.[team] ? `victory ${game[team]}:` : `draw`} ${odd}`
//   );
// }
// // 리터럴에 다 때려박지말고 삼항연산자 부분은 따로 변수를 만들면 더 나았을듯

// // BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
// //       {
// //         Gnarby: 1,
// //         Hummels: 1,
// //         Lewandowski: 2
// //       }
// const scorers = {};
// for (const iterator of game.scored) {
//   if (scorers[iterator]) {
//     scorers[iterator]++;
//   } else {
//     scorers[iterator] = 1;
//   }
// }
// console.log(scorers);
// // GOOD LUCK 😀

// // 113. Looping Objects: Object Keys, Values, and Entries
// // 113. Looping Objects: Object Keys, Values, and Entries
// // 113. Looping Objects: Object Keys, Values, and Entries

// // 이터러블이 아닌 object도 순회할 수 있다.

// // Property NAMES
// const properties = Object.keys(openingHours);
// console.log(properties);

// let openStr = `We are open on ${properties.length} days: `;
// for (const day of properties) {
//   openStr += `${day}, `;
// }
// console.log(openStr);

// // Property VALUES
// const values = Object.values(openingHours);
// console.log(values);

// // Entire object
// const entries = Object.entries(openingHours);
// console.log(entries); // 2중 array 모양으로 받고, 안쪽 array는 프로퍼티네임, 밸류를 가짐

// // [key, value]
// for (const [day, { open, close }] of entries) {
//   console.log(`On ${day} we open at ${open} and close at ${close}`);
// }

// // 112. Optional Chaining (?.)
// // 112. Optional Chaining (?.)
// // 112. Optional Chaining (?.)
// // 오브젝트말고 array에도 새로 생긴 기능이 있는데 그게 옵셔널체이닝
// // 가령 웹api를 쓸 때 우리는 그 api에서 각 식당이 월요일 영업 여부를 잘 모르죠?
// // 근데 월요일 영업 시작 시간을 찾으려고하면 애초에 월요일 자체가 없어서 에러가 날거임
// // 그래서 우리는 에러 방지를 위해서 그 항목이 있는지부터 확인을 해야함(다른 예를들어보자면 식당오픈시간을 보여주는 api인데 스시이로까는 여기에 없다면 작동이 안되겠지)
// // 기존 방식, 그 여부를 if 문을 이용해서 에러를 막음
// if (restaurant.openingHours && restaurant.openingHours.mon)
//   console.log(restaurant.openingHours.mon.open);

// // ES6 킹 신기술 optional chaining
// console.log(restaurant.openingHours.mon?.open); // 이 물음표가 그놈임
// // 옵셔널 체이닝에선 없으면 바로 undefined를 리턴해버림당
// console.log(restaurant.openingHours?.mon?.open); // 먼데이 이전에 오프닝아우어 자체까지 없을 가능성이 있다면 요로케

// // 활용
// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// for (const day of days) {
//   const open = restaurant.openingHours[day]?.open ?? 'closed'; // [] 주의, 실제 프로퍼티 네임이 아니고 변수명을 갖다쓴거라 [] notation 따라줘야해
//   // + 단축평가로 undefined 배제 + 0 falsy 되는거 nullish coalescing으로 배제
//   console.log(`On ${day}, we open at ${open}`);
// }

// // method 유무도 확인 가능, '.' 있는거 유의합시다.
// console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
// console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// // array
// // const users = [{name:"Jinyoung", email:'tbs01215@gmail.com' }]
// const users = [];

// console.log(users[0]?.name ?? 'User array empty'); // 같은

// if (users.length > 0) console.log(users[0].name);
// else console.log('user array empty'); // 동작
// // 110. Looping Arrays: The for-of Loop
// // 110. Looping Arrays: The for-of Loop
// // 110. Looping Arrays: The for-of Loop

// // es6에서 iterable한 녀석들(Array, Map, Set, String, TypedArray, arguments 객체 등을 포함)을 looping하는 새로운 방법을 출시했어용
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// // 파이썬 for in 과 비슷한듯, 근데 for문에선 let으로 해놓고 여긴 왜 const인지는 잘 모르겠군
// for (const item of menu) console.log(item);
// // 컨티뉴, 브레이크 사용 가능

// for (const item of menu.entries()) {
//   console.log(`${item[0] + 1}: ${item[1]}`); // for of 구식으로 쓰기
// }
// for (const [i, el] of menu.entries()) {
//   console.log(`${i + 1}: ${el}`); // for of를 지금 배운 이유, 디스트럭터링
// }

// console.log(menu.entries()); // Array Iterator {}
// // 이게 뭔데;; 나중에 배운대
// console.log([...menu.entries()]); // 미리보기
// // Coding Challenge #1
// // Coding Challenge #1
// // Coding Challenge #1

// // We're building a football betting app (soccer for my American friends 😅)!

// // Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:
// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };
// // 1. Create one player array for each team (variables 'players1' and 'players2')
// const players1 = [...game.players[0]];
// const players2 = [...game.players[1]];
// console.log(players1, players2);
// // 2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
// const [gk, ...filedPlayers] = players1;
// console.log(gk, ...filedPlayers);
// // 3. Create an array 'allPlayers' containing all players of both teams (22 players)
// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);
// // 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
// const players1Final = ['Thiage', 'Coutinho', 'Perisic', ...players1];
// console.log(players1Final);
// // 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
// const {
//   odds: { team1, x: draw, team2 },
// } = game;
// console.log(team1, draw, team2);
// // 6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
// const printGoals = function (...playerNames) {
//   for (let i = 0; i <= playerNames.length; i++) console.log(playerNames[i]);
// };
// printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
// // 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

// // TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

// // GOOD LUCK 😀

// // 108. The Nullish Coalescing Operator (??)
// // 108. The Nullish Coalescing Operator (??)
// // 108. The Nullish Coalescing Operator (??)

// // 0과 같은 falsy가  의미있을 경우를 대비해서 나온 연산자다. falsy중에서 nulish인 것들, null과 undefined만 틀린걸로 취급한다. 그 외에는 `||`와 같이 동작한다.
// let numGuests = 0;

// const guests = numGuests || 10;
// console.log(guests);

// const guestCorrect = numGuests ?? 10;
// console.log(guestCorrect);

// Logical Assignment Operators
// Logical Assignment Operators
// Logical Assignment Operators

const rest1 = {
  name: 'Capri',
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giorno Giovanna',
};

// OR assignment operator
// rest1.numGuests = rest1.numGuests || 10;
// rest1.numGuests ||= 10;
// rest2.numGuests = rest2.numGuests || 10;
// rest2.numGuests ||= 10;

// nullish assignment operator (null or undefined)
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// AND assignment operator
// rest1.owner = rest1.owner && '<ANONYMOUS>';
// console.log(rest1); // { name: 'Capri', numGuests: 0, owner: undefined }
// rest2.owner = rest2.owner && '<ANONYMOUS>';
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';

console.log(rest1); // { name: 'Capri', numGuests: 0}
console.log(rest2); // { name: 'La Piazza', owner: '<ANONYMOUS>' , numGuests: 10 }

// // 107. Short Circuiting (&& and ||)
// // 107. Short Circuiting (&& and ||)
// // 107. Short Circuiting (&& and ||)

// // Use ANY data type, return ANY data type, short-circuiting
// // ||나 && 연산자가 turthy falsy를 판별을 마치면 해당 판별차례의 값을 return한다
// // or 연산에서 첫 비굣값만 참이어도 참이 확정이다 그래서 3이 return된다.
// console.log(3 || 'Jonas'); // 3
// console.log('' || 'Jonas'); // Jonas
// console.log(true || 0); // true
// console.log(undefined || null); // null
// // 다시, 확정되는 순간 그 value를 return!! true나 false같은 불리언으로 바꿔 뱉지 않는다.

// console.log(undefined || 0 || '' || 'Hello' || 23 || null); // 첫 truthy에서 return

// // 이런 활용도 가능. 아래 두 게스트는 같다.
// let numGuests;
// // numGuests = 23;
// const guests1 = numGuests ? numGuests : 10; // 디폴트를 10으로 준 경우
// console.log(guests1);
// const guests2 = numGuests || 10;
// console.log(guests2);

// console.log('---- AND ----'); // 얘는 틀릴 때 단축평가
// console.log(0 && 'Jonas');

// // 얘도 마찬가지로 활용할 수 있다.
// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mushrooms', 'spinach');
// }

// restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

// // Rest Pattern and Parameters
// // Rest Pattern and Parameters
// // Rest Pattern and Parameters

// // 1) destruncturing
// // spread랑 모양은 같은데 기능은 반대
// // spread임 왜냐면 = 오른쪽임
// const arr = [1, 2, ...[3, 4]];
// // rest임 왜냐면 = 왼쪽
// // 기본적으로 덩어리를 만들거나 덩어리를 해체한다. expression 특성상 오른쪽은 항상 value이고 왼쪽은 항상 vatiables다. 그 점을 기억하면 따라서 상기할 수 있을듯
// const [a, b, ...others] = [1, 2, 3, 4, 5]; // 디스트럭팅에 rest를 써서 나머지 요소를 다 합한 덩어리 전체를 받았다.
// console.log(a, b, others); // 1 2 (3) [3, 4, 5]
// // rest라는 명명의 이유는 안쓴 나머지 요소를 다 끌어오기 때문임
// const [pizza, , risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ]; // *주의* rest pattern은 남은걸 탈탈 끌어오는거죠? 그렇기 때문에 그 뒤에 콤마붙이고 다른걸 빼오는 짓은 할 수 없습니다. rest pattern이(여기선 otherFood) 무조건 끝이어야함
// console.log(pizza, risotto, otherFood);

// // objects
// const { sat, ...weekdays } = restaurant.openingHours;
// console.log(weekdays); // {thu: {…}, fri: {…}}

// // 2) functions
// // spread operator를 argument로 써먹은 것처럼, rest pattern은 parameter로 쓸 수 있다!
// // 언제? 받아올 arguments 갯수가 정해지지 않았을 때
// const add = function (...numbers) {
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) sum += numbers[i];
//   console.log(sum);
// };

// add(2, 3);
// add(5, 3, 7, 2);
// add(8, 2, 5, 3, 2, 1, 4);

// // recap spread and rest
// const x = [23, 5, 7];
// add(...x); // unpack, and pack again(...numbers)

// restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
// restaurant.orderPizza('mushrooms');

// // The Spread Operator (...)
// // The Spread Operator (...)
// // The Spread Operator (...)

// // This is Spread Operator motherfxxxers
// const arr = [7, 8, 9];

// const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArr);

// const newArr = [1, 2, ...arr];
// console.log(newArr);

// console.log(...newArr);
// console.log(1, 2, 7, 8, 9);

// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

// // 복사, 근데 이제 얕은
// const mainMenuCopy = [...restaurant.mainMenu];
// console.log(mainMenuCopy);

// // Join 2 arrays
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(menu);

// // array에 국한되지않고 iterable하다면 뭐든 된다. strings, maps, sets.. 당연히 iterable이 아닌 objects는 빼고~
// const str = 'Jinyoung';
// const letters = [...str, ' ', 'S.'];
// console.log(letters);
// console.log(...str);

// // 단, 이건 안됨 spread는 한뭉치를 주는게 아니고 여러개를 던져주는 놈임
// // console.log(`Kim ${...str}`);
// // 다수의 value는 어레이에 갖다박거나 함수 argument로나 쓰이지 템플릿 리터럴에 글자가 합쳐져서 하나로 나오는 그런 마법은 기대하는게 아니예요
// const ingredients = [
//   prompt(`Let's make pasta! Ingredient1?`),
//   prompt(`and Ingredient2?`),
//   prompt(`and Ingredient3?`),
// ];
// console.log(ingredients);

// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
// restaurant.orderPasta(...ingredients); // 쌤쌤

// // 사실 objects도 es2018부터 지원한다능;;
// const newRestaurant = { foundation: 1998, ...restaurant, founder: 'Guiseppe' };
// console.log(newRestaurant);
// // 얕은 복사
// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'Ristorante Roma';
// console.log(restaurantCopy.name);
// console.log(restaurant.name);
/////////////////////////////////////////////////////

// // Destruncturing Objects
// // Destruncturing Objects
// // Destruncturing Objects

// // -1. 이게 강의상으로는 마지막 순서
// // 구조분해할당 활용법.
// restaurant.orderDelivery({
//   time: '22:30',
//   address: 'Via del sole, 21',
//   mainIndex: 2,
//   starterIndex: 2,
// });

// // 0. 어레이 구조분해는 []였다면 오브젝트는 {}를 이용한다는 차이가 있다.

// const { name, openingHours, categories } = restaurant;
// // 어레이 구조분해할당은 one, , three 이런식으로 했는데 이건 그냥 프로퍼티 이름만 써주면 되넹
// console.log(name, openingHours, categories); // Classico Italiano {thu: {…}, fri: {…}, sat: {…}} (4) ["Italian", "Pizzeria", "Vegetarian", "Organic"]

// // array의 경우 애초에 변수명이 없었으니 일일이 지정을 해줬지만 object는 properties 명을 받아올 수 있다.
// // 만약 그 프로퍼티 명이 마음에 들지 않는다면 아래처럼 바꾸라
// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;

// console.log(restaurantName, hours, tags); // Classico Italiano {thu: {…}, fri: {…}, sat: {…}} (4) ["Italian", "Pizzeria", "Vegetarian", "Organic"]
// // 똑같이 나오는걸 확인할 수 있다.

// // 빼오려는 프로퍼티가 없을 수 있다.
// // 그런 경우 디폴트 값을 줘야할 필요가 있는데(에러 방지 외에도 다른 이유가 있을 수 있다.) '='로 디폴트값을 줄 수 있어용 ㅎㅎ
// const { menu = {}, starterMenu: starters = {} } = restaurant;
// console.log(menu, starters);

// // 기존에 잘 쓰고있던 변수명을 갈아끼우는(mutating) 경우가 있을 수 있겠지요?
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };
// ({ a, b } = obj); // 다짜고짜 바로 {}가 나오면 js는 코드블럭이라고 인식하기 때문에.. 이 동작을 수행하려면 ()를 덧씌워야한답니다.
// console.log(a, b);

// // 이중 오브젝트
// const {
//   fri: { open: o, close: c },
// } = openingHours;
// // 여기서 잠시 체크, =는 디폴트, :는 이름변경! 꼭기억!
// console.log(o, c);

/////////////////////////////////////////////
// // Destructuring Arrays
// // Destructuring Arrays
// // Destructuring Arrays

// // 의문 1. 만약 array가 1억개 있는데 그중에 우리가 원하는데 5000번 인덱스면 콤마를 5000개 찍어야하나? 이런 경우는 당연히 다른 방식을 쓰는건가? 아니다 구조분해가 어떨 때에 유리한 방법인지를 알아야겠구나

// // 구조분해할당은 es6의 기능이예여
// // 어레이나 오브젝트의 요소들을 하나하나 seperate 해줍니당
// const arr = [2, 3, 4];
// const [x, y, z] = arr; // 2 3 4
// // [x, y, z]라는 모양으로 arr를 디스트럭팅 했네요~~
// // 사용법은 어레이 생성을 뒤집는다고 생각해봅니다.
// // 여기 x, y, z에는 2,3,4가 대입됩니당
// // 모양이 기존에 배운 array와 똑~같지요?
// // [x, y, z] 이걸 구조분해할당이라고 부르기로 했어요
// console.log(x, y, z);
// console.log(arr); // (3) [2, 3, 4]
// //말이 약간 부순다는 뉘앙스가 있지만 원본은 그대로입니다?

// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary); // Italian Pizzeria
// // = 연산자 오른쪽에 놓여진 array의 인덱스 0번부터 하나씩 순서대로 넘겨 받습니다.
// // 띄어넘기고 받을 생각이라면 스킵할 인덱스만큼 콤마를 찍읍시다.

// // swap하고 싶을 때 쓸 수 있다.(파이썬은 걍되는뎅 ㅋㄷ a,b = b,a)
// // es6 이전, js에서 스왑하는방식:
// // const temp = main;
// // main = secondary;
// // secondary = temp;
// // console.log(main, secondary);

// // es6가 js를 뒤집어 놓으셨다
// [main, secondary] = [secondary, main]; // 일회용 어레이 만들고 거따가 구조분해할당
// console.log(main, secondary);

// // 함수에서 여러 value를 받고싶다면 array를 return 한 후 디스트럭팅으로 받을 수 있다~~
// const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);

// // 이중리스트에서 뽑아오기
// const nested = [2, 4, [5, 6]];
// const [i, , [j, k]] = nested;
// console.log(i, j, k);

// // 구조분해로 뽑아오려고 셋팅한 변수의 갯수보다 타겟 array의 길이가 짧다면 아예 에러가나서 셧다운이 될 수도 있겠고 의도하지않은 에러가 날겁니다. 디폴트 설정법을 배워봅시다.
// const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r);
