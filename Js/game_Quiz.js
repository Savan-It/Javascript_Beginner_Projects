`use strict`
let h5 = document.getElementById('h5')
let image = document.getElementById('image');
let body = document.getElementById('main')
let timer = document.getElementById('timer')


let itemsPerPage = 1;
let currentPage = 1;
let globalVariable = {};

let userAnswers = [];


let startQuiz = document.getElementById('startQuiz');
startQuiz.addEventListener('click', displaydata)

globalVariable.point = 0;


function displaydata() {
  Add.addData();
  let fiveMinutes = 60 * 5;
  Add.startTimer(fiveMinutes, timer);
}

class Display {
  addData() {
    h5.style.display = "none";
    image.style.display = "none";
    startQuiz.style.display = "none";
    timer.style.visibility = "visible";


    fetch("example_2.json").then((response) => response.json())
      .then(function ptint(data) {
        let questions = data.questions;
        globalVariable.noOffQuestions = Object.keys(questions).length;
        let savan;
        let html = "";
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = questions.slice(startIndex, endIndex);

        let previousDisabled = "";
        let nextDisabled = "";
        if (currentPage === 1) {
          previousDisabled = "Disabled";
        }
        else if (currentPage === globalVariable.noOffQuestions) {
          nextDisabled = "d-none";

        }
        pageData.forEach(function (element) {

          globalVariable.currentAnswer = element.correctIndex;
          html += ` <div class="question-container mx-md-4 mx-1">
                      <div class="question-header  text-start ">
                      <h5>Q${currentPage}. ${element.question}</h5>
                      </div>
                      <div class=" question-body">
                        <div class="row text-start ">
                          <div class="option">
                            <input type="radio" id="${currentPage}option1" name="${currentPage}answer" value="${element.answers[0]}">
                            <label for="${currentPage}option1">${element.answers[0]}</label>
                          </div>
                          <div class="option">
                            <input type="radio" id="${currentPage}option2" name="${currentPage}answer" value="${element.answers[1]}">
                            <label for="${currentPage}option2">${element.answers[1]}</label>
                          </div>
                          <div class="option">
                            <input type="radio" id="${currentPage}option3" name="${currentPage}answer" value="${element.answers[2]}">
                            <label for="${currentPage}option3">${element.answers[2]}</label>
                          </div>
                          <div class="option">
                            <input type="radio" id="${currentPage}option4" name="${currentPage}answer" value="${element.answers[3]}">
                            <label for="${currentPage}option4">${element.answers[3]}</label>
                          </div>
                        </div>
                      </div>
                      <div id="note"></div>
                      <div class="question-footer mt-md-3 mt-1 ">
                        <div class="row justify-content-between">
                          <div class="col-auto ">
                            <div class="row">
                              <div class="col-auto">
                                <button class="btn btn-outline-primary btn-sm" onclick="Add.previous()" id="previous" ${previousDisabled}>< Previous</button>
                              </div>
                              <div class="col-auto">
                                <button class="btn btn-outline-primary btn-sm ${nextDisabled}" onclick="Add.next()" id="next" >Next ></button>
                              </div>
                            </div>
                          </div>
                          <div class="col-auto ">
                            <button class="btn btn-success" onclick="Add.submitQuizBtn()" id="submit">Submit Quiz</button>
                          </div>
                        </div>
                      </div>
                    </div>`;
        });
        savan = html
        body.innerHTML = savan;
      })

  }
  showError() {
    let note = document.getElementById('note')
    note.innerHTML = `<div class="alert alert-danger alert-dismissible fade show h-50" role="alert">
                                <strong>Please!!</strong> Select a option for next question
                                
                            </div>`;

    setTimeout(function () {
      note.innerHTML = "";
    }, 2500);
  }

  startTimer(duration, display) {
    var timer = duration, minutes, seconds;

    globalVariable.stop = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < -1) {
        alert("Time's up 🙌")
        clearInterval(globalVariable.stop);
        Add.submitpage();
        display.textContent = " ";
      }
    }, 1000);
  }

  previous() {

    // Add.pointCalculation();
    let index = currentPage;
    if (globalVariable.currentAnswer[index] == globalVariable.checkedValue[index]) {
      globalVariable.point--;
      console.log(globalVariable.point);
    }
    currentPage--;
    Add.addData();

  }



  next() {
    let checked = document.querySelector(`input[name="${currentPage}answer"]:checked`)
    globalVariable.checkedValue = (checked) ? checked.value : null;
    if (checked) {
      // userAnswers[currentPage - 1] = globalVariable.checkedValue;
      // if (globalVariable.checkedValue == globalVariable.currentAnswer) {
      //   globalVariable.point++;
      // }
      // console.log("next function data : "+globalVariable.point);
      currentPage++;
      Add.addData();
    } else {
      Add.showError();
    }
    Add.pointCalculation();

  }

  submitQuizBtn() {
    if (confirm("you want to submit") == true) {
      Add.submitpage();
    }
  }

  submitpage() {
    clearInterval(globalVariable.stop);
    let checked = document.querySelector(`input[name="${currentPage}answer"]:checked`)
    globalVariable.checkedValue = (checked) ? checked.value : null;
    Add.pointCalculation();
    body.innerHTML = `<h3> You got ${globalVariable.point}/${globalVariable.noOffQuestions} Correct answer<br> Thank you!!</h3><button onclick="location.reload()" class="btn btn-outline-success ">Play again</button>`;
    timer.style.visibility = "hidden";
  }

  pointCalculation() {
    if (globalVariable.currentAnswer == globalVariable.checkedValue) {
      globalVariable.point++;
      console.log(globalVariable.point);
    }

  }

}
let Add = new Display();

