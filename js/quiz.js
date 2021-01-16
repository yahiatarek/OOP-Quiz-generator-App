export class Quiz {
  constructor(numberofQuestionValue, results) {
    this.results = results;
    this.question = document.getElementById("question");
    this.currentQuestionSpan = document.getElementById("current");
    this.checkedAnswers = document.getElementsByName("answer");
    this.rowAnswer = document.getElementById("rowAnswer");
    this.amountOfQuestions = numberofQuestionValue;
    this.totalAmount = document.getElementById("totalAmount");
    this.correct = false;
    this.submitBtn = document.getElementById("next");
    this.scoreElement = document.getElementById("score");
    this.score = 0;
    this.currentQuestionNo = 0;
    this.submitBtn.addEventListener("click", this.GoTonextQuestion.bind(this));
    this.tryBtn = document.getElementById("tryBtn");
    this.tryBtn.addEventListener("click", this.startAgain.bind(this));
    this.showQuestions();
  }

  showQuestions() {
    this.totalAmount.innerHTML = this.amountOfQuestions;
    this.question.innerHTML = this.results[this.currentQuestionNo].question;
    this.currentQuestionSpan.innerHTML = this.currentQuestionNo + 1;
    let answers = this.getAnswer(this.results[this.currentQuestionNo]);
    this.showAnswers(answers);
  }
  getAnswer(currentQuestionNo) {
    let array = [
      currentQuestionNo.correct_answer,
      ...currentQuestionNo.incorrect_answers,
    ];
    let ranNums = [];
    let i = array.length;
    let j = 0;
    while (i--) {
      j = Math.floor(Math.random() * (i + 1));
      ranNums.push(array[j]);
      array.splice(j, 1);
    }
    return ranNums;
  }
  showAnswers(answersArray) {
    let temp = ``;
    for (let i = 0; i < answersArray.length; i++) {
      temp += `
      <div class="form-check">
                  <label class="form-check-label">
                      <input type="radio" class="form-check-input" name="answer" id="q${i}" value="${answersArray[i]}">
                      ${answersArray[i]}
                  </label>
              </div>
      `;
    }
    this.rowAnswer.innerHTML = temp;
  }
  GoTonextQuestion() {
    let checkedElement = [...this.checkedAnswers].filter((el) => el.checked);
    if (checkedElement.length == 0) {
      $(".alert").fadeIn(500);
    } else {
      $(".alert").fadeOut(500);
      this.correct = this.myCheckedAnswers(checkedElement[0].value);
      if (this.correct) {
        $("#Correct").fadeIn(500, () => {
          this.show();
        });
      } else {
        $("#inCorrect").fadeIn(500, () => {
          this.show();
        });
      }
    }
  }
  show() {
    $("#inCorrect").fadeOut(200);
    $("#Correct").fadeOut(200);
    this.currentQuestionNo++;
    this.currentQuestionNo < this.amountOfQuestions
      ? this.showQuestions()
      : this.finish();
  }
  myCheckedAnswers(checkedElement) {
    let QuestionNO = this.currentQuestionNo;
    if (this.results[QuestionNO].correct_answer == checkedElement) {
      this.score++;
      return true;
    } else {
      return false;
    }
  }
  finish() {
    this.scoreElement.innerHTML = this.score;
    $("#quiz").fadeOut(500, () => {
      $("#finish").fadeIn(500);
    });
  }
  startAgain() {
    $("#finish").fadeOut(500, () => {
      $("#setting").fadeIn(500);
    });
  }
}
