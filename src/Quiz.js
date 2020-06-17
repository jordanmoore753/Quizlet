import React, { Component } from 'react';

class Quiz extends Component {
  state = {
    questions: [{
      id: 0,
      text: "What is 2 + 3?",
      answers: [1, 3, 7, 5],
      correctAnswer: 3,
      selectedAnswer: 0,
      status: ''
    }, {
      id: 1,
      text: "What is 2 + 4?",
      answers: [11, -3, 6, 5],
      correctAnswer: 2,
      selectedAnswer: 0,
      status: ''
    }, {
      id: 2,
      text: "What is 4 times 3?",
      answers: [13, 12, 7, 15],
      correctAnswer: 1,
      selectedAnswer: 0,
      status: ''
    }]
  };

  handleCheckChange = (questionData) => {
    let updatedQuestion = Object.assign({}, this.state.questions[questionData["questionID"]]);
    updatedQuestion.selectedAnswer = questionData.value;

    let updatedQuestions = this.state.questions.map(function(question) {
      if (question.id === updatedQuestion.id) {
        return updatedQuestion;
      } else {
        return question;
      }
    });

    this.setState({
      questions: updatedQuestions
    });
  };

  render() {
    return (
      <form>
        <ol className="question">
        {this.state.questions.map(function(question, i) {
          return (
              <li key={i} className="item">
                <Question 
                  id={question.id}
                  text={question.text}
                  answers={question.answers}
                  selectedAnswer={question.selectedAnswer}
                  status={question.status}
                  onSelectChange={this.handleCheckChange}
                />
              </li>
          );
        }, this)}
        </ol>
      </form>
    );
  }
}

class Question extends Component {
  render() {
    return (
      <div>
        <p>{this.props.text}</p>
        <div className="ui">
          {this.props.answers.map(function(answer, i) {
            return <Answer 
              key={i}
              index={i}
              text={answer}
              questionID={this.props.id}
              selected={this.props.selectedAnswer === i}
              onSelectChange={this.props.onSelectChange}
              className="answer"
            />
          }, this)}
        </div>
      </div>
    );
  }
}

class Answer extends Component {
  onCheckChange = (e) => {
    let data = {
      questionID: Number(e.target.name),
      value: Number(e.target.dataset.index)
    };

    this.props.onSelectChange(data);
  };

  render() {
    return (
      <div className="ui radio checkbox">
        <input 
          type="radio" 
          data-index={this.props.index}
          name={this.props.questionID}
          value={this.props.text}
          checked={!!this.props.selected}
          onChange={this.onCheckChange}
        />
        <label className="answer-label">{this.props.text}</label>
      </div>
    );
  }
}

export default Quiz;