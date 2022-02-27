/*
    구현해야 할 기능 목록
    1. 사용자가 입력 버튼을 눌렀을 때, 새로운 키보드 창 생성
    2. 입력한 값을 답안과 비교하여 키보드 색상 변경
    3. 정답을 맞췄을 때의 이벤트, 맞추지 못했을 때의 이벤트
        3.1. 정답을 맞추면 새로운 문제로 새로고침
        3.2. 정답을 못맞추면 재시도 버튼 or 새로운 문제로 새로고침
*/
var answer = "abcde";
var tryCount = 0;
var endGame = false;

// 알파벳 한 글자만 입력 가능하도록
var inputComponents = document.querySelectorAll("input");
inputComponents.forEach((val, key) => {
  val.addEventListener("keyup", (e) => {
    e.target.value = e.target.value.replace(/[^A-Za-z]/gi, "");
    if (e.keyCode == 13) {
      tryCount += 1;
      console.log(tryCount);
    }
  });
});

var mc = document.querySelector("#modal-container");
mc.addEventListener("click", () => {
  mc.classList.add("out");
  document.body.classList.remove("modal-active");
});

var bt = document.querySelector(".button");
bt.addEventListener("click", (e) => {
  var userInput = document.querySelectorAll(".input");

  for (let i = 0; i < 5; i++) {
    // 글자와 위치가 모두 맞으면 초록색
    if (userInput[i].value == answer[i]) {
      userInput[i].style.background = "#538d4e";
    }
    // 글자만 맞고 위치는 다르면 노란색
    else if (answer.includes(userInput[i].value)) {
      userInput[i].style.background = "#c9b458";
    }
    // 글자와 위치 모두 안맞으면 회색
    else {
      userInput[i].style.background = "#3a3a3c";
    }

    // 클래스 중복 제거
    userInput[i].classList.remove("input");
  }

  tryCount += 1;

  if (!endGame) {
    if (tryCount > 4) {
      endGame = true;
      var buttonId = e.target.id;
      mc.removeAttribute("class");
      mc.classList.add(buttonId);
      document.body.classList.add("modal-active");
    } else {
      var template = `<div>
        <input class="input" maxlength="1">
        <input class="input" maxlength="1">
        <input class="input" maxlength="1">
        <input class="input" maxlength="1">
        <input class="input" maxlength="1">
    </div>`;
      document
        .querySelector(".content")
        .insertAdjacentHTML("beforeend", template);
    }
  }
});
