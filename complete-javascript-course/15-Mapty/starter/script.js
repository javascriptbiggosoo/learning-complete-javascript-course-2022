'use strict';
// 유저 인터페이스에서 받을 사이클링, 러닝 데이터를 다룰 클래스를 구현해봅시다
class Workout {
  // 이건 입력이 필요없다
  date = new Date();
  id = (Date.now() + '').slice(-10);

  // 그때그때 다르게 입력받을 데이터들을 설정
  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  // 여기엔 this.type이 없어서 각자에 메소드를 줘야하는지 헷갈릴 수 있겠다
  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  } // 다만 타입이 없으니 실행 자체는 child의 constructor에서 해야함
}

class Running extends Workout {
  type = `running`;
  constructor(coords, distance, duration, cardence) {
    super(coords, distance, duration);
    this.cadence = cardence;

    this.calcPace();

    this._setDescription();
  }
  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = `cycling`;
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;

    this.calcSpeed();

    this._setDescription();
  }

  calcSpeed() {
    // km/h
    this.speed = (this.distance / this.duration) * 60;
    return this.speed;
  }
}

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// 지도 렌더할때 초기값줄건데 이벤트 리스너에서도 필요해서 미리 글로벌 변수로 선언
// let map, mapEvent;

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
// 로토의 경우 타겟을 주고 어디서나 쓸 수 있는 앱을 만들었는데 이 앱은 여기서만 작동하는걸로 설계함
// 그래서 위 친구들은 계속 this.어쩌구 하는게 별로라 field에 넣지않는다고

// APPLICATION ARCHITECTURE
class App {
  // 글로벌 변수 -> 프라이빗 클래스 필드로
  // 클래스 기반으로 코딩하기로 하면서 이 안에서 일어나는 모든 것은 온전히 앱이 소유하는 자원으로 처리하게끔 하는것
  #map;
  #mapEvent;
  #mapZoomLevel = 13;
  #workouts = [];

  constructor() {
    // 앱 인스턴스 생성 스크립트가 읽히면 실행, 즉 페이지 로드가 완료되면 알아서 실행
    // Get user's position
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    // Attach event listeners
    // 이벤트리스너 또한 자동 생성을 원하기때문에 컨스트럭터에 놔둠
    // 그리고 콜백은 역시 따로 분리하자
    form.addEventListener('submit', this._newWorkout.bind(this));
    // 걷는건지 자전건지에 따라 입력받을 창에 변화를 줍시다
    inputType.addEventListener('change', this._toggleElevationField);
    // 사이드바에 처음엔 workouts가 없기때문에 event delegation을 사용하여 이벤트를 처리하도록 함
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  _getPosition() {
    // navigator.geolocation API는 Timer, Camera, Vibration 등과 같은 브라우저 api 입니다
    // 브라우저가 ie같은거라면 api를 지원하지 않을수도 있어서 체크
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // 잘 받아온 경우의 콜백함수(첫 argument로 위치 정보를 받음)
        this._loadMap.bind(this),
        // 받아오는데 애로사항이 꽃핀 경우의 콜백함수
        function () {
          alert('위치 못받아옴 힝');
        }
      );
    }
  }

  _loadMap(position) {
    // GeolocationPosition {coords: GeolocationCoordinates, timestamp: 1635497040534}
    // console.log(position);
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    // 브라우저가 성공적으로 좌표를 얻은 경우 그 좌표를 갖다 리플렛에 써먹으면 되죵 오버뷰 복붙 ㄱ
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel); // ‘map’ id를 가진 div의 [51.505, -0.09] 좌표에 #mapZoomLevel 줌레벨을 가진 지도를 만들것
    // 디폴트 런던이죠 이제 우리 좌표 찍어봅세

    // console.log(map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map); // 우리에게 보여질 지도이미지

    // handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    // Load workouts from local storage
    this.#workouts.forEach(work => {
      this._renderWorkout(work);
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden'); // 클릭후 폼 띄우기
    inputDistance.focus(); // ui적으로 좋은 포커스 구현
  }

  _hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    // 이부분은 깊게 파지않고 넘어가도 된다.
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => {
      form.style.display = 'grid';
    }, 1000);
  }

  _toggleElevationField(e) {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();
    const validInputs = (...input) => input.every(inp => Number.isFinite(inp));
    const allPositive = (...input) => input.every(inp => inp > 0);
    // Get data from form
    const type = inputType.value; // select 태그에선 option 밸류중 하나를 갖는다
    const distance = +inputDistance.value; // 입력받으면 string으로 들어온다 숫자로 바꿔조
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If actibity runging, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Check if data is valid
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert(`Inputs have to be positive numbers`);

      workout = new Running([lat, lng], distance, duration, cadence);
    }
    // If activity cycling, create cycling object
    // 모던 자바스크립트는 if-else는 잘 안쓰고 그냥 if를 두개 만드는 것을 선호합니다 훨씬 알아보기 쉽거든요
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration, elevation)
      )
        return alert(`Inputs have to be positive numbers`);

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);
    // console.log(workout);

    // Render workout on map as marker
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkout(workout);

    // 이전 인풋 클리어는 해놨고 + Hide form
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    // console.log(mapEvent);
    // 지도에 마커박고, 팝업 문구 설정하고, 팝업 띄우는 콤비네이션
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 500,
          minWidth: 80,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`, // 조나스가 미리 적어둔 css
        }).setContent(
          `${workout.type == 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
        )
      ) // 팝업 문구 이걸로 조정 가능 걍 스트링주면 해당 문구가 뜬다. 간단한 것 외에도 옵션을 복잡하게 부여할 수 있는데 doc에서 더 알아보자
      .openPopup(); // pinned
  }
  _renderWorkout(workout) {
    // 조나쓰가 만들어 놨따
    let html = `<li class="workout workout--${workout.type}" data-id="${
      workout.id
    }">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type == 'running' ? '🏃‍♂️' : '🚴‍♀️'
          }</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
        `;
    if (workout.type === 'running') {
      html += `
            <div class="workout__details">
              <span class="workout__icon">⚡️</span>
              <span class="workout__value">${workout.pace.toFixed(1)}</span>
              <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">🦶🏼</span>
              <span class="workout__value">${workout.cadence}</span>
              <span class="workout__unit">spm</span>
            </div>
          </li>`;
    }
    if (workout.type === 'cycling') {
      html += `<div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>`;
    }
    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    // 복습: 그냥 target으로 하면 span클릭할 때 그곳을 가리킴
    const workoutEl = e.target.closest('.workout');
    // console.log(workoutEl);

    // guard clause: if no workout element found, return
    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    // console.log(workout);

    // 리플렛 문서를 봅시다. ㅎㅎ.... 나혼자 찾아야했다면 한참 찾아 헤멜것 같다.. 이게 진짜 어려운 일이네
    // 라고 하고보니 공식문서에서 찾긴 어려운데 'how to move leaflet' 키워드로 검색해보니 스택오버플로에서 바로 찾을 수 있었다!
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: { duration: 1 },
    });
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = localStorage.getItem('workouts');
    if (!data) return;
    this.#workouts = JSON.parse(data);

    // 여기다 쓰면 안되는 이유: 맵이 로드되기전에 마커를 불러올 수 없음
    // this.#workouts.forEach(work => {
    //   this._renderWorkout(work);
    //   this._renderWorkoutMarker(work);
    // });
  }

  // 퍼블릭 인터페이스, 콘솔에서 실행해보아요~
  reset() {
    localStorage.removeItem('workouts');
    // location is a big object that contains a lot of methods  and properties in the browser
    lacation.reload();
  }
}

const app = new App();

const run1 = new Running([37.55, 126.98], 5, 24, 178);
const cycling1 = new Cycling([37.55, 126.98], 20, 90, 500);
// console.log(run1, cycling1);
