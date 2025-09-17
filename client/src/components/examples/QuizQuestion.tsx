import QuizQuestion from '../QuizQuestion';

export default function QuizQuestionExample() {
  // todo: remove mock functionality
  const mockQuestion = {
    id: "q1",
    text: "Which programming language is known for its use in web development and has a syntax similar to C++?",
    options: [
      { id: "a1", text: "Python" },
      { id: "a2", text: "JavaScript" },
      { id: "a3", text: "Java" },
      { id: "a4", text: "Ruby" }
    ]
  };

  return (
    <div className="p-4">
      <QuizQuestion
        question={mockQuestion}
        questionNumber={1}
        totalQuestions={10}
        onAnswerSelect={(questionId, answerId) => 
          console.log(`Question ${questionId}: Answer ${answerId} selected`)
        }
      />
    </div>
  );
}