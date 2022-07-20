import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  // Fetch questions on render and update state
  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(res => res.json())
    .then(questions => setQuestions(questions))
  }, [])

  // update state with new question
  function handleNewQuestion(newQuestion){
    setQuestions([...questions, newQuestion])
  }

  // update state without deleted question
  function handleDeleteQuestion(deletedQuestion){
    const updatedQuestions = questions.filter(question => {
      return question.id !== deletedQuestion.id
    })

    setQuestions(updatedQuestions)
  }

  function handleUpdateQuestion(updatedQuestion){
    const updatedQuestions = questions.filter(question => {
      if (question.id === updatedQuestion.id) return updatedQuestion

      return question
    })

    setQuestions(updatedQuestions)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onNewQuestion={handleNewQuestion}/> : <QuestionList questions={questions} onDeleteQuestion={handleDeleteQuestion} onUpdateQuestion={handleUpdateQuestion}/>}
    </main>
  );
}

export default App;
