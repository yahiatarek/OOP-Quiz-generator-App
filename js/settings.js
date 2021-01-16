import { Quiz } from "./quiz.js";
export class Setting {
  constructor() {
    this.categoryElement = document.getElementById("category");
    this.difficultyElement = Array.from(
      document.getElementsByName("difficulty")
    );
    this.numberofQuestion = document.getElementById("Number");
    this.startBtn = document.getElementById("startBtn");
    this.startBtn.addEventListener("click", this.startQuiz.bind(this));
  }

  async startQuiz() {
    let numberofQuestionValue = this.numberofQuestion.value;
    let categoryValue = this.categoryElement.value;
    let difficultValue = this.difficultyElement.filter((el) => el.checked);
    let url = `https://opentdb.com/api.php?amount=${numberofQuestionValue}&category=${categoryValue}&difficulty=${difficultValue[0].value}`;
    await this.fetchFunction(url, numberofQuestionValue);
  }
  async fetchFunction(url, numberofQuestionValue) {
    let response = await fetch(url);
    let data = await response.json();
    let results = data.results;
    if (results.length > 0) {
      $("#setting").fadeOut(500, () => {
        $("#quiz").fadeIn(500);
      });
      new Quiz(numberofQuestionValue, results);
    }
  }
}
