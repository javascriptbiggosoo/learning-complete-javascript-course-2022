'use strict';
// // Constructor Functions and the new Operator
// // Constructor Functions and the new Operator
// // Constructor Functions and the new Operator

// // 여태 객체 리터럴만 이용했는데
// // 이제 배울 constructor functions를 이용해서 Objects를 만들 수 있습니다.

// // constructor functions는 작성 시에 다른 함수와 하등 다를 것이 없고
// // 다만 호출 시 new operator를 붙여줘야하는 점은 있습니다.
// // 함수명은 대문자로 시작하는게 컨벤션
// const Person = function (firstName, birthYear) {
//   console.log(this); // Person {}

//   // Instance properties
//   this.firstName = firstName;
//   // parameters와 properties name 일치시키는게 컨벤션
//   this.birthYear = birthYear;

//   // 메소드는 절대 생성자 함수에 쓰지 마세요(노션에서 이부분은 다음 강의에 적자)
//   // this.calcAge = function () {
//   //   console.log(2037 - this.birthYear);
//   // };

//   // 우리가 수백개의 객체를 저 생성자 함수로 만들면서 그때마다 저렇게 함수가 만들어지는 것은.. 너무 낭비 아니겠소 그건 성능을 조져놓습니다.
//   // 다음에 배울 프로토 타입과 프로토 타입 상속으로 메소드를 써봅시다.
// };

// const jonas = new Person('Jonas', 1991);
// // new operator와 function call을 하면 일어나는 비하인드 더 씬
// // 1. 새 객체{}가 만들어진다.
// // 2. 호출된 함수의 this는 이 때 만들어진 새 객체{}이다.
// // 위 콘솔로그 보면 생성자 함수의 이름과 함께, 생성자 함수가 만들어낸 객체가 콘솔에 보이지요?
// // 3. 그 객체{}가 Prototype과 link된다.(좀따 설명)
// // 4. 1.~3. 이 끝난 이 객체{}를 return한다.

// console.log(jonas); // Person {firstName: 'Jonas', birthYear: 1991}
// // 빈 객체(this)에 프로퍼티를 박았는데, 그 객체가 리턴되면서 jonas 변수로 넘어가고 결국 출력하면 이렇게 짜잔

// // 이렇게 Person 생성자 함수로 여러 Object를 찍어댈 수 있다.
// const winter = new Person('Winter', 2001);
// const karina = new Person('Karina', 2000);

// console.log(winter, karina);
// // Person {firstName: 'Winter', birthYear: 2001}
// // Person {firstName: 'Karina', birthYear: 2000}

// console.log(jonas instanceof Person); // true
// // jonas, winter, karina는 모두 Person의 instance다

// // js에서 classic OOP가 쓰이진 않지만 어쨋든 이렇게 생성자함수로 object를 만들어보았다
// // 생성자함수는 js의 정식 기능이라고 할 수 없듬 개발자들끼리 자주 통용되는 개발 패턴이라고 하는게 맞을듯

// // Prototypes
// // Prototypes
// // Prototypes

// // js에서 모든 함수는 만들어지는 순간부터 prototype이라는 프로퍼티를 갖게 됩니다.
// // Person 생성자 함수로 만든 모든 object는 Person.prototype 또한 상속받을 것이며, 프로토타입 프로퍼티에서 정의된 메소드와 프로퍼티들에도 접근할 수 있을 것이다.

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// }; // 절대하지말라고 주석달아놓은 코드를 이렇게 만들면 됩니다

// console.log(Person.prototype); // {calcAge: ƒ, constructor: ƒ}

// console.log(jonas); // Person {firstName: 'Jonas', birthYear: 1991}
// // jonas Object에는 calcAge가 없다

// jonas.calcAge(); // 46
// // 근데 사용은 된다. 왜? 프로토타입 상속으로 접근해서!
// winter.calcAge(); // 36
// // 생성자 함수에 메소드 적었으면 사본마다 카피가 됐을텐데 이제 딱 한번만 적어두면 그걸로 모두가 다 쓸 수 있게 된다.

// console.log(jonas.__proto__); // __proto__: 객체의 Prototype, 이 경우 Person.prototype을 출력함
// console.log(jonas.__proto__ === Person.prototype); // 참트루

// // Person.prototype은 Person 생성자함수로 만들어진 애들의 Prototype.
// // Person.prototype / Person.__proto__ 네이밍 개별루 ㅇㅈ?
// // Person.prototype 은 .prototypeOfLinkedObjects 라고 지었어야해..
// // 위에서 좀따 설명한다던 3. 부분이 이제 이해가 가실듯

// console.log(Person.prototype.isPrototypeOf(jonas)); // 참트루
// console.log(Person.prototype.isPrototypeOf(winter)); // 쌉트루
// console.log(Person.prototype.isPrototypeOf(Person)); // false

// Person.prototype.species = 'Homo Sapiens';
// console.log(jonas.species, karina.species); // Homo Sapiens Homo Sapiens
// console.log(jonas.hasOwnProperty('firstName')); // true
// console.log(jonas.hasOwnProperty('species')); // false

// // Prototypal Inheritance on Built-In Objects
// // Prototypal Inheritance on Built-In Objects
// // Prototypal Inheritance on Built-In Objects

// console.log(jonas.__proto__); // {species: 'Homo Sapiens', calcAge: ƒ, constructor: ƒ}
// // 프로토 타입 체인을 이렇게 보나봄 ㅋㅋ 프로토.프로토
// console.log(jonas.__proto__.__proto__); // {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
// console.log(jonas.__proto__.__proto__.__proto__); // null

// // 생성자 함수 Person을 가르킨덩
// console.dir(Person.prototype.constructor); // ƒ Person(firstName, birthYear)

// const arr = [2, 5, 4, 6, 7];
// // 이친구의 프로토타입을 조회해보니 생성자가 Array()임
// console.log(arr.__proto__);
// // 우리가 여태 쓰던 메소드들이 많이 보인다
// // 리터럴로 만든 모든 어레이는 모두 Array()컨스트럭터 펑션으로 만들어진 것이다.
// // 즉, new Array === []
// console.log(arr.__proto__ === Array.prototype); // true

// // .prototype 프로퍼티 자체도 일단은 object라서 Object() 생성자 함수가 만든 것임
// console.log(arr.__proto__.__proto__);
// // prototype 프로퍼티 자체도 일단은 object라서 Object() 생성자 함수가 만든 것임

// // 빌트인 prototype에 메소드를 추가하는게 좋지않은 이유
// // 1. 다음버전 ES에 그 이름과 겹치는 메소드가 실제로 나온다면? 오우오우;
// // 2. you are teamplayer 동료 개발자들이 서로 기능이 같은 메소드를 각자 개발해서 사용한다면?? 오우오우;

// const h1 = document.querySelector('h1');
// console.dir(h1); // h1 object 이친구도 프로토 타입이 있군요 HTMLHeadingElement
// console.dir(HTMLHeadingElement); // HTMLHeadingElement도 프로토 타입이 있군요 HTMLElment
// console.dir(HTMLElement); // HTMLElment도 프로토 타입이 있군요 Element
// console.dir(Element); // Element도 프로토 타입이 있군요 Node
// console.dir(Node); // Node도 프로토 타입이 있군요 EventTarget
// console.dir(EventTarget); // Object
// // 이래서 DOM element간에 서로 공유하는 method들이 있었던 것

// console.dir(x => x + 1);
// // function도 object라는 사실은 누누이 말했고 그 프로토타입을 들여다보니 bind call 같은 우리가 써온 method들이 나열돼있다

// // Coding Challenge #1
// // Coding Challenge #1
// // Coding Challenge #1

// // Your tasks:
// // 1. Use a constructor function to implement a 'Car'. A car has a 'make' and a 'speed' property. The 'speed' property is the current speed of the car in km/h
// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };
// // 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console
// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.speed}km/h`);
// };
// // 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console
// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.speed}km/h`);
// };
// // 4. Create 2 'Car' objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them
// // Test data:
// // § Data car 1: 'BMW' going at 120 km/h
// const BMW = new Car('BMW', 120);
// BMW.accelerate();
// BMW.brake();
// // § Data car 2: 'Mercedes' going at 95 km/h
// const Mercedes = new Car('Mercedes', 95);
// Mercedes.accelerate();
// Mercedes.brake();
// // GOOD LUCK �

// // ES6 Classes
// // ES6 Classes
// // ES6 Classes

// // 작동원리를 알기 위해 생성자 함수를 공부한 것은 여전히 좋은 일이다. 필수라고 말할 수도 있다.
// // 다만 모던한 syntax인 ES6 Classes를 알아두는 것도 '나쁘지 않다'. 배워보도록 하자.

// // ES6 classes가 등장하면서 다른 언어를 쓰던 개발자들이 유입하기 쉬워졌다.
// // 물론 실질적으론 뒤에서 생성자 함수가 돌아가고있다. 기본 작동 방식은 변하지 않았다.

// // class는 내부적으로는 함수로서 동작한다. argument 넣는 곳은 없지만 암튼 그렇다능. 그래서 expression, declaration 둘 다 거능
// // 몇가지 이유로 조나스는 디클라레이션을 선호한다고함

// // class expression
// // const PersonCl = class {};

// // declaration
// class PersonCl {
//   // 가장 먼저 해야하는건 생성자 함수, constructor 메소드를 만들기
//   // new 오퍼레이터로 PesronCl을 부르면 이 컨스트럭터가 자동으로 호출됩니다.
//   constructor(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   }
//   // 여기에 메소드를 바로 쓰면 된다능
//   // Methods will be added to .ptorotype property
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   } // 자동으로 프로토타입에 이 함수가 들어갔다는걸 볼 수 있다.
//   greet() {
//     console.log(`Hello, I'm ${this.firstName}`);
//   }
// }

// const jessica = new PersonCl('Jessica', 1996);
// console.log(jessica); // PersonCl {firstName: 'Jessica', birthYear: 1996}
// jessica.calcAge(); // 41

// console.log(jessica.__proto__ === PersonCl.prototype); // true

// // *클래스는 호이스팅되지않아
// // *클래스도 함수처럼 1급 시민이다. 함수 인자로도 들어가고 리턴으로 나올수도있다. 왜냐? JS class는 말만 클래스지 사실 뒤에선 함수로서 돌아가니깐! 함수는 당연 1급 시민이니깐!
// // *클래스는 그냥 써도 엄격모드로 실행된다.

// // 이전에 배운 생성자 함수가 ES6클래스에 비해 낡거나 안쓰이는 코딩방식이 아니다
// // 생성자 함수만 쓰셔도 된다
// // 오히려 ES6클래스만 쓴다고 원리를 몰라도 되냐고 한다면, 그건 안된다. 작동방식을 알아야해
// // 원리를 알기위해 생성자함수를 알고, 편하게 코딩하기 위해 ES6 classes를 쓴다면 정말정말 JS 전문가라고 할 수 있겠지
// // 어쩃든 원리를 안다면, 둘 중 뭘 선호하든 상관 없다!

// // Setters and Getters
// // Setters and Getters
// // Setters and Getters

// const account = {
//   owner: 'jessica',
//   movments: [200, -100, -300],
//   get latest() {
//     return this.movments[this.movments.length - 1];
//   }, // 게터로 만드려면, 별거없다 함수 앞에 get을 붙여주믄댐
//   set latest(mov) {
//     this.movments.push(mov);
//   }, // 세터로 만드려면 함수 앞에 set을 붙여주고, 파라미터 하나가 들어간다
//   // 게터가 있을 때 꼭 세터를 지정할 필요는 없습니다. just a getter or just a setter would be enough.
// };
// // 메소드를 호출하는 것이 아니라 프로퍼티처럼 써야댐
// console.log(account.latest); // -300

// // 먼가 이상하지만 이것도 프로퍼티처럼 써야댐
// account.latest = 1000;
// console.log(account.latest); // 1000
// // 간단히 말해서, 이것이 게터들과 세터들이 object에서 일하는 방식입니다.
// // 근데 클래스도 게터들과 세터들이 있습니다.

// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName; // setter
//     this.birthYear = birthYear;
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   } // 다른 메소드들 처럼 프로토타입으로

//   // Set a property that already exists
//   set fullName(name) {
//     console.log(name);
//     // if (name.includes(' ')) this.fullName = name;
//     if (name.includes(' ')) this._fullName = name;
//     else alert('Please enter your "full" name');
//   }
//   get fullName() {
//     return this._fullName;
//   }
// }

// const sohye = new PersonCl('김 소혜', 1999);

// // 1. 인스턴스를 생성한 후 프로퍼티를 설정하는 경우
// console.log(sohye.age); // 38
// console.log(sohye); // PersonCl { fullName: '김 소혜', birthYear: 1999 }

// // 2. 인스턴스를 생성하면서 프로퍼티를 설정하는 경우
// // 세터, 게터는 데이터 검증시 유용하게 쓰일 수 있습니다.
// // we can create a setter for the fullName property
// // which will check if this is actually a full name.(띄어 쓰기 있어야 풀네임으로 쳐주기로함)
// console.log(sohye.fullName); // "김 소혜"
// console.log(sohye._fullName); // "김 소혜"

// // Static Methods
// // Static Methods
// // Static Methods
// console.log(Array.from(new Set([1, 2, 3]))); // [1, 2, 3]

// // 아래는 Uncaught TypeError: [1,2,3].from is not a function 에러가 뜸
// // console.log([1, 2, 3].from(new Set([1, 2, 3])));

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// const jonas = new Person('Jonas', 1991);

// // 이렇게하면 static 메소드를 쓸 수 있다.
// Person.hey = function () {
//   console.log('Hey there 👋');
//   console.log(this);
//   /*
//   ƒ (firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   }
//   */
// };

// Person.hey();
// // 아래는 안댐 Uncaught TypeError: jonas.hey is not a function
// // jonas.hey();

// // 클래스에서는 스태틱을 붙여주면 끝이다
// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }
//   // Instance methods
//   // Methods will be added to .prototype property
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }
//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not a full name!`);
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   // Static method
//   static hey() {
//     console.log('Hey there 👋');
//     console.log(this);
//     /*
//     class PersonCl {
//       constructor(fullName, birthYear) {
//         this.fullName = fullName;
//         this.birthYear = birthYear;
//       }
//       // Instance methods
//       // Methods will be added to .prototype property
//       calc…
//     */
//   }
// }

// PersonCl.hey();

// // Object.create
// // Object.create
// // Object.create

// // 프로토타입 프로퍼티와 컨스터럭터, new 연산자가 없다??

// // 프로토타입으로 쓰일 object를 만들어 놓고 인스턴스에 박아넣을 것
// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },
// };

// const steven = Object.create(PersonProto);
// // 이제 스티븐은 PersonProto와 link된다
// console.log(steven);
// console.log(steven.__proto__ === PersonProto); // true

// // Object.create에 property 박기

// const PersonProto2 = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },
//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
//   // 이거 constructor function 모양으로 작성했지만 new 따윈 필요없다는!
//   // 일단 당연히 constructor function은 아니니까 그렇다
// };
// const sarah = Object.create(PersonProto2);
// sarah.init('Sarah', 1979);
// sarah.calcAge(); // 58
// console.log(sarah.__proto__ === PersonProto2); // true

// // 정리: 단순히 우리가 여태 알던 기본적인 object 다루기로 class나 다름없이 기능하는 것을 구현한것이 object.create()방식임 클래스 만드는 방식이 정해져있는데 그걸 안사용하고 클래스를 만들어버린거임 ㄷㄷ

// // Inheritance Between "Classes": Constructor Functions
// // Inheritance Between "Classes": Constructor Functions
// // Inheritance Between "Classes": Constructor Functions

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// const Student = function (firstName, birthYear, major) {
//   Person.call(this, firstName, birthYear);
//   this.major = major;
// };

// // Linking prototype
// Student.prototype = Object.create(Person.prototype);

// Student.prototype.introduce = function () {
//   console.log(`Hi, I'm ${this.firstName}! and I'm majoring in ${this.major}`);
// };

// const mike = new Student('Mike', 1990, 'Computer Science');
// console.log(mike); // Student {firstName: 'Mike', birthYear: 1990, major: 'Computer Science'}
// console.log(mike.firstName);
// // 아래는 Uncaught TypeError: mike.calcAge is not a function
// mike.introduce(); // Hi, I'm Mike! and I'm majoring in Computer Science
// mike.calcAge();
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// console.log(mike.__proto__); // Person {introduce: ƒ}
// // 음음 인트로듀스가 있군..
// // 근데 오잉 왠 펄슨? 스튜던트여야하는게 아닌가?
// // 근데 또 오잉인건 콘솔에다가 직접 mike 쳐보면 Student라고 나옴 ㅡㅡ
// // 근데 또 오잉인건 그 스튜던트의 prototype(__proto__아님)을 보면 Person이라고 나옴 ㅡㅡ 말이 안되자너~~

// console.log(mike.__proto__.__proto__); // {calcAge: ƒ, constructor: ƒ}
// // 얘도 봐 얘는 또 펄슨 아니래

// console.dir(Student.prototype.constructor); // ƒ Person(firstName, birthYear)
// // 이거 이렇게 펄슨으로 나오는 이유는
// // 스튜던트.prototype을 오브젝트.create로 해놨기 때문이다

// // constructor 프로퍼티는 자주 쓰이기 때문에 우리가 바라는 이상적인 모습으로 만들어놓자.
// Student.prototype.constructor = Student;
// console.dir(Student.prototype.constructor); // ƒ Student(firstName, birthYear, major)
// //고쳐짐 ㅎㅎ

// console.log(mike.__proto__); // 뭐 여전히 얘는 펄슨이라고 나온다 ㅎㅎ 그래도 constructor 까지만 제대로 해놓아도 확실히 낫긴하니까~ 만족하자구

// // Inheritance Between "Classes": ES6 Classes
// // Inheritance Between "Classes": ES6 Classes
// // Inheritance Between "Classes": ES6 Classes

// // ES6 class는 extends keyword와 super function만 기억하면 됨

// // 상속 자체는 extends keyword만 하면 됨
// // 만약 새 프로퍼티 추가 안할거면 컨스트럭터메소드 쓸 필요 없음
// class StudentCl extends PersonCl {}
// const martha = new StudentCl('Martha Tokki', 1984);
// console.log(martha); // StudentCl {_fullName: 'Martha Tokki', birthYear: 1984}

// class StudentCl2 extends PersonCl {
//   // 만약 새 프로퍼티를 넣고싶다면 constructor를 써야겠지요? 아래의 super는 부모클래스의 것들을 따른다.
//   constructor(fullName, birthYear, major) {
//     // Always needs to happen first!
//     super(fullName, birthYear); // call의 역할을 super가 대신한다
//     // this 키워드 쓰기전에 super를 먼저 쓰지 않으면 역으로 덮어쓰기가 될거다
//     this.major = major;
//   }
//   introduce = function () {
//     console.log(`Hi, I'm ${this.fullName}! and I'm majoring in ${this.major}`);
//   };
//   calcAge = function () {
//     console.log(
//       `I am ${
//         2037 - this.birthYear
//       } years old, but as a student, I feel more like ${
//         2037 - this.birthYear + 10
//       } years old`
//     );
//   };
// }
// const martha2 = new StudentCl2('Martha Tokki', 1984, 'Architecture');
// martha2.introduce(); // Hi, I'm Martha Tokki! and I'm majoring in Architecture
// // 프로토타입 체인에서 제일 먼저뜨는건 펄슨이 아니라 우리가 스튜던트2에 새로적은 칼ㅋ에이지라서 이렇게 되잖아~~
// martha2.calcAge(); // I am 53 years old, but as a student, I feel more like 63 years old

// console.log(martha2); // StudentCl2 {_fullName: 'Martha Tokki', birthYear: 1984, major: 'Architecture'}
// console.log(martha2.__proto__); // PersonCl {introduce: ƒ, calcAge: ƒ, constructor: ƒ}

// // Another Class Example
// // Encapsulation: Protected Properties and Methods
// // Another Class Example
// // Encapsulation: Protected Properties and Methods
// // Another Class Example
// // Encapsulation: Protected Properties and Methods

// class Account {
//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     this._pin = pin;
//     this._movements = [];
//     this.locale = navigator.language;

//     console.log(`계좌를 만들어줘서 넘넘 고마워여 ${this.owner}`);
//   }
//   getMovments() {
//     return this._movements;
//   }
//   deposit(amount) {
//     this._movements.push(amount);
//   }
//   withdraw(amount) {
//     this.deposit(-amount);
//   }
//   _approveLoan(amount) {
//     return true; // 아무튼 승인되는 코드
//   }
//   requestLoan(amount) {
//     if (this._approveLoan(amount)) {
//       this.deposit(amount);
//       console.log(`Loan approved!`);
//     }
//   }
// }
// const acc1 = new Account('John', 'USD', 1234);
// console.log(acc1);

// acc1.deposit(250);
// acc1.withdraw(140);
// console.log(acc1); // movements: (2) [250, -140]

// console.log(acc1.pin); // 1234
// acc1.requestLoan(10000);
// acc1._approveLoan(10000); // 이런 작동은 못하도록 하고싶다.

// Encapsulation: Private Class Fields and Methods
// Encapsulation: Private Class Fields and Methods
// Encapsulation: Private Class Fields and Methods

class Account {
  // 1) Public fields (instances)
  locale = navigator.language;

  // 2) Private fields (instances)
  #movements = [];

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;

    this._pin = pin;

    // this.locale = navigator.language;

    // this._movements = [];

    console.log(`계좌를 만들어줘서 넘넘 고마워여 ${this.owner}`);
  }

  // 3) Public methods
  // Public interface
  getMovments() {
    return this.#movements;
  }
  deposit(amount) {
    this.#movements.push(amount);
  }
  withdraw(amount) {
    this.deposit(-amount);
  }
  requestLoan(amount) {
    // if (this.#approveLoan(amount)) {
    if (this._approveLoan(amount)) {
      this.deposit(amount);
      console.log(`Loan approved!`);
    }
  }

  // 4) Private methods
  // #approveLoan(amount) {
  _approveLoan(amount) {
    return true;
  }
}
const acc1 = new Account('John', 'USD', 1234);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(10000);
console.log(acc1);

// Uncaught SyntaxError: Private field '#movements' must be declared in an enclosing class
// console.log(acc1.#movements);
console.log(acc1.getMovments);

// Uncaught SyntaxError: Private field '#pin' must be declared in an enclosing class
// console.log(acc1.#pin);

// Uncaught SyntaxError: Private field '#approveLoan' must be declared in an enclosing class
// acc1.#approveLoan(10000);

// // summary
// // summary
// // summary

// class Student extends Person {
//   university = 'University of California, Los Angeles';
//   #studyHours = 0;
//   #major;
//   static numSubjects = 10;

//   constructor(fullName, birthYear, startYear, major) {
//     super(fullName, birthYear);

//     this.startYear = startYear;

//     this.#major = major;
//   }

//   introduced() {
//     console.log(`I study ${this.#major} at ${this.university}`);
//   }

//   study(h) {
//     this.#makeCoffe();
//     this.#studyHours += h;
//   }

//   #makeCoffe() {
//     return 'Here is a coffe for you😋';
//   }

//   get testScore() {
//     return this._testScore;
//   }

//   set testScore(score) {
//     this._testScore = score <= 20 ? score : 0;
//   }

//   static printCurriculum() {
//     console.log(`There are ${this.numSubjects} subjects`);
//   }
// }
// const student = new Student('Jonas', 2020, 2037, 'Medicine');
