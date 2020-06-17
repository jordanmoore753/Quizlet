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
    }, {
      id: 3,
      text: "What is 3 - (-8)?",
      answers: [11, -3, -1, 5],
      correctAnswer: 0,
      selectedAnswer: 0,
      status: ''
    },],

    score: null,
    title: "1st Grade Math Quiz"
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

  handleSubmit = (e) => {
    e.preventDefault();

    const res = window.confirm('Are you sure you want to submit?');

    if (!res) {
      return;
    }

    let totalCorrect = 0;

    let updatedQuestions = this.state.questions.map(function(question) {
      if (question.correctAnswer === question.selectedAnswer) {
        let updatedQuestion = Object.assign({}, question, {
          status: 'correct'
        });

        totalCorrect += 1;
        return updatedQuestion;
      } else {
        let updatedQuestion = Object.assign({}, question, {
          status: 'incorrect'
        });

        return updatedQuestion;        
      }
    }, this);

    let updatedScore = Math.ceil((totalCorrect / this.state.questions.length) * 100);

    this.setState({ 
      score: updatedScore,
      questions: updatedQuestions
    });
  };

  handleReset = (e) => {
    e.preventDefault();

    let updatedQuestions = this.state.questions.map(function(question) {
      let updatedQuestion = Object.assign({}, question, {
        selectedAnswer: 0,
        status: ''
      });

      return updatedQuestion;
    });

    this.setState({
      questions: updatedQuestions,
      score: null
    });
  };

  render() {
    return (
      <div className="content">
        <h1 className="is-large">{this.state.title}</h1>
        <Score score={this.state.score} />
        <hr className="quiz-separator" />
          <ol className="question">
          {this.state.questions.map(function(question, i) {
            return (
                <li key={i} className="is-size-5">
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
        <button 
          type="submit"
          onClick={this.handleSubmit}
          className="button is-success is-medium first-button is-rounded"
        >Submit Quiz
        </button>
        <button
          type="click"
          onClick={this.handleReset}
          className="button is-light is-medium is-rounded"
        >Reset
        </button>
      </div>
    );
  }
}

class Question extends Component {
  render() {
    return (
      <div>
        <p className="is-size-5">
          <Status 
            status={this.props.status}
          />
        {this.props.text}
        </p>
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
      <div className="control">
        <label className="radio is-size-5">
          <input 
            type="radio" 
            data-index={this.props.index}
            name={this.props.questionID}
            value={this.props.text}
            checked={!!this.props.selected}
            onChange={this.onCheckChange}
          />
          {this.props.text}
        </label>
      </div>
    );
  }
}

class Score extends Component {
  render() {
    if (this.props.score === null) {
      return (
        <p className="is-size-5">Quiz Score: unsubmitted.</p>
      );
    } else {
      return (
        <p className="is-size-5">Quiz Score: {this.props.score}</p>
      );
    }

  }
}

class Status extends Component {
  render() {
    if (this.props.status === '') {
      return (
        <span></span>
      );
    } else if (this.props.status === 'correct') {
      return (
        <span className="status-icon">
          <i className="check circle icon"></i>
        </span>
      );
    } else {
      return (
        <span className="status-icon">
          <i className="times circle icon"></i>
        </span>
      );      
    }
  }
}

export default Quiz;