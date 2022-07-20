import React, {useState} from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  // make the form stateful
  const [correctAnswerIndex, setCorrectIndex] = useState(correctIndex)

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteClick(e){
    const questionId = question.id
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "DELETE"
    })
    .then(() => onDeleteQuestion(question))
  }

  function handleCorrectAnswerChange(e){
    setCorrectIndex(e.target.value)
    console.log(correctAnswerIndex)
    const questionId = question.id
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "correctIndex": correctAnswerIndex
      })
    })
    .then(res => res.json())
    .then(question => onUpdateQuestion(question))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctAnswerIndex} onChange={handleCorrectAnswerChange}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
